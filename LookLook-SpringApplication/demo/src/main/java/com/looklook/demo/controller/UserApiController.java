
package com.looklook.demo.controller;

import com.looklook.demo.dto.AuthRequestDto;
import com.looklook.demo.dto.UserRequestDto;
import com.looklook.demo.dto.UserResponseDto;
import com.looklook.demo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserApiController {

    private final UserService userService;

    public UserApiController(UserService userService) {
        this.userService = userService;
    }

    // 사용자 조회
    @GetMapping("/mypage")
    public ResponseEntity<UserResponseDto> getUserInfo(Authentication authentication){
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        // userDetails.getUsername은 uid를 의미하고, userService.findUserInfoById()를 사용해야함
        UserResponseDto userResponseDto = userService.findUserInfoById(Long.valueOf(userDetails.getUsername()));
        return ResponseEntity.ok(userResponseDto);
    }

    // 사용자 정보 수정 전 비밀번호 확인
    @PostMapping("/mypage/user/auth")
    public ResponseEntity<String> pwChkBeforeUpdateUserInfo(Authentication authentication, @RequestBody AuthRequestDto authRequestDto) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Boolean success = userService.pwChk(Long.valueOf(userDetails.getUsername()), authRequestDto);
        if (success){
            // return ResponseEntity.status(HttpStatus.FOUND).header("Location", "/new-path").build();
            return ResponseEntity.ok("인증 성공");
        } else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("사용자 인증 실패 메시지");
        }
    }

    // 사용자 정보 수정
    @PostMapping("/mypage/user/info")
    public ResponseEntity<UserResponseDto> updateUserInfo(@RequestBody UserRequestDto userRequestDto, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        UserResponseDto userResponseDto = userService.updateUser(Long.valueOf(userDetails.getUsername()), userRequestDto);
        return ResponseEntity.ok(userResponseDto);
    }

    // 회원 탈퇴
    @PostMapping("/mypage/user/withdrawal")
    public ResponseEntity<String> deleteUserInfo(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        userService.withdrawal(Long.valueOf(userDetails.getUsername()));
        return ResponseEntity.ok("탈퇴 완료");
    }

    // 판매자 페이지 이동 시 판매자 정보 반환
    @GetMapping("/seller")
    public ResponseEntity<UserResponseDto> sendSellerInfo(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        UserResponseDto userResponseDto = userService.findUserInfoById(Long.valueOf(userDetails.getUsername()));
        return ResponseEntity.ok(userResponseDto);
    }
}

