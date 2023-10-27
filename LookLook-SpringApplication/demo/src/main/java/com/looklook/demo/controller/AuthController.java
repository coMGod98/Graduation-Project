package com.looklook.demo.controller;

import com.looklook.demo.dto.*;
import com.looklook.demo.jwt.JwtFilter;
import com.looklook.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.net.URI;
import java.util.Collection;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<UserResponseDto> signup(@RequestBody @Valid UserForm userDto) {
        System.out.println("UserDto: "+ userDto.toString());

        UserResponseDto responseDto = userService.signup(userDto);
        System.out.println("회원가입 완료: "+ responseDto.toString());

        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody UserRequestDto userRequestDto) {
        TokenDto tokenDto = userService.login(userRequestDto);
        return ResponseEntity.ok(tokenDto);
    }

    @GetMapping("/admin_chk")
    public ResponseEntity<Object> adminChk(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        for (GrantedAuthority authority : authorities) {
            if (authority.getAuthority().equals("ROLE_ADMIN")){
                return ResponseEntity.ok(Map.of("admin_chk", true));
            }
        }
        return ResponseEntity.ok(Map.of("admin_chk", false));
    }

    //    @PostMapping("/logout")
//    public ResponseEntity<?> logout(@AuthenticationPrincipal CustomUserDetailsService userDetails) {
//        if (userDetails != null) {
//            // 사용자 정보를 기반으로 토큰을 무효화
//            tokenProvider.invalidateToken(userDetails.getUsername());
//            return ResponseEntity.ok("Logged out successfully");
//        }
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//    }
    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(TokenRequestDto tokenRequestDto) {
        return ResponseEntity.ok(userService.reissue(tokenRequestDto));
    }

}