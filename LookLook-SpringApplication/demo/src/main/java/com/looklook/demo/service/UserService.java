package com.looklook.demo.service;

import com.looklook.demo.domain.LookLookUser;
import com.looklook.demo.domain.RefreshToken;
import com.looklook.demo.dto.*;
import com.looklook.demo.jwt.TokenProvider;
import com.looklook.demo.repository.RefreshTokenRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import com.looklook.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Tuple;
import java.util.Collection;
import java.util.Objects;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;


    // 회원가입
    @Transactional
    public UserResponseDto signup(UserForm userDto) {
        if (userRepository.existsByUserId(userDto.getUserId())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }

        LookLookUser user = userDto.toUser(passwordEncoder);
        return UserResponseDto.of(userRepository.save(user));
    }

    // 로그인
    @Transactional
    public TokenDto login(UserRequestDto userRequestDto) {
        Optional<LookLookUser> user = userRepository.findByUserId(userRequestDto.getUserId());
        if (user.isPresent()) {
            // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
            UsernamePasswordAuthenticationToken authenticationToken = userRequestDto.toAuthentication();

            // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
            //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

            // 3. 인증 정보를 기반으로 JWT 토큰 생성
            TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

            // 4. RefreshToken 저장
            RefreshToken refreshToken = RefreshToken.builder()
                    .key(authentication.getName())
                    .value(tokenDto.getRefreshToken())
                    .build();

            refreshTokenRepository.save(refreshToken);

            // 5. 토큰 발급
            return tokenDto;

        } else {
            throw new RuntimeException("유저 정보를 찾을 수 없습니다.");
        }
    }

    // 토큰 재발급
    @Transactional
    public TokenDto reissue(TokenRequestDto tokenRequestDto) {
        // 1. Refresh Token 검증
        if (!tokenProvider.validateToken(tokenRequestDto.getRefreshToken())) {
            throw new RuntimeException("Refresh Token 이 유효하지 않습니다.");
        }

        // 2. Access Token 에서 Member ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDto.getAccessToken());

        // 3. 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져옴
        RefreshToken refreshToken = refreshTokenRepository.findByKey(authentication.getName())
                .orElseThrow(() -> new RuntimeException("로그아웃 된 사용자입니다."));

        // 4. Refresh Token 일치하는지 검사
        if (!refreshToken.getValue().equals(tokenRequestDto.getRefreshToken())) {
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 5. 새로운 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 6. 저장소 정보 업데이트
        RefreshToken newRefreshToken = refreshToken.updateValue(tokenDto.getRefreshToken());
        refreshTokenRepository.save(newRefreshToken);

        // 토큰 발급
        return tokenDto;
    }

    // 현재 로그인한 사용자의 정보를 조회
    public UserResponseDto findUserInfoById(Long uid) {
        return userRepository.findById(uid)
                .map(UserResponseDto::of)
                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));
    }
    public UserResponseDto findUserInfoByUserId(String userId){
        return userRepository.findByUserId(userId)
                .map(UserResponseDto::of)
                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));
    }

    // 사용자 정보 수정 (마이페이지-> 회원정보수정 시 비밀번호 인증 -> 이름, 주소, 이메일 변경 가능 )
    @Transactional
    public UserResponseDto updateUser(Long uid, UserRequestDto userRequestDto) {
        Optional<LookLookUser> user = userRepository.findById(uid);
        user.ifPresent(user1 -> {
            if (userRequestDto.getUserName() != null){
                user1.setUserName(userRequestDto.getUserName());
            }
            if (userRequestDto.getAddress() != null){
                user1.setAddress(userRequestDto.getAddress());
            }
            if (userRequestDto.getEmail() != null){
                user1.setEmail(userRequestDto.getEmail());
            }
            userRepository.save(user1);
        });
        user.orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));

        return user.map(UserResponseDto::of)
                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));
    }

    public Boolean pwChk(Long uid, AuthRequestDto dto) {
        Optional<LookLookUser> user = userRepository.findById(uid);
        if (user.isPresent()) {
            System.out.println("dto_pw: "+dto.getPassword());
            System.out.println("repo_pw: "+user.get().getPassword());
            if (passwordEncoder.matches(dto.getPassword(), user.get().getPassword())) {
                return true;
            }
        } else {
            throw new RuntimeException("유저 정보가 없습니다.");
        }
        return false;
    }

    // 회원 탈퇴
    @Transactional
    public void withdrawal(Long uid) {
        userRepository.deleteById(uid);
    }
}
