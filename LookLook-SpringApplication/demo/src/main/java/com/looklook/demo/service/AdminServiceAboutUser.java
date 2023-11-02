package com.looklook.demo.service;

import com.looklook.demo.dto.UserResponseDto;
import com.looklook.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServiceAboutUser {
    private UserRepository userRepository;

    public AdminServiceAboutUser(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 관리자에서 사용자 정보 모두 조회
    @Transactional
    public List<UserResponseDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> user.toUserResponseDto(user)) // Assuming UserDto has a constructor that accepts a User object
                .collect(Collectors.toList());
    }

    @Transactional
    public UserResponseDto findUserInfoById(Long uid) {
        return userRepository.findById(uid)
                .map(user -> user.toUserResponseDto(user))
                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));
    }
    // 관리자의 사용자 정보 수정과 삭제는 UserService에 있는 함수 이용, 컨트롤러에만 해당 내용 구현
}
