package com.looklook.demo.controller;

import com.looklook.demo.dto.UserRequestDto;
import com.looklook.demo.dto.UserResponseDto;
import com.looklook.demo.service.AdminServiceAboutUser;
import com.looklook.demo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
public class AdminController {

    private final AdminServiceAboutUser adminServiceAboutUser;
    private final UserService userService;

    public AdminController(AdminServiceAboutUser adminServiceAboutUser, UserService userService) {
        this.adminServiceAboutUser = adminServiceAboutUser;
        this.userService = userService;
    }

    // 사용자 전체 조회
    @Secured("ROLE_ADMIN")
    @GetMapping("/admin/user-list")
    public ResponseEntity<List<UserResponseDto>> getUsers() {
        // 여기서 사용자 목록을 가져오는 로직을 구현하고 List<User>를 반환
        List<UserResponseDto> userList = adminServiceAboutUser.getAllUsers();

        // ResponseEntity를 사용하여 응답을 생성하고 HttpStatus 코드를 지정할 수 있음
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    // 사용자 수정 폼에서 기본 조회
    @Secured("ROLE_ADMIN")
    @GetMapping("/admin/user-update/{uid}")
    public ResponseEntity<UserResponseDto> getUser(@PathVariable String uid){
        // userDetails.getUsername은 uid를 의미하고, userService.findUserInfoById()를 사용해야함
        UserResponseDto userResponseDto = adminServiceAboutUser.findUserInfoById(Long.valueOf(uid));
        return ResponseEntity.ok(userResponseDto);
    }

    // 사용자 수정
    @Secured("ROLE_ADMIN")
    @PostMapping("/admin/user-update/{uid}")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable String uid, @RequestBody UserRequestDto userRequestDto){
        System.out.println("userRequestDto: "+ userRequestDto.toString());
        UserResponseDto userResponseDto = userService.updateUser(Long.valueOf(uid), userRequestDto);
        return ResponseEntity.ok(userResponseDto);
    }

    // 사용자 삭제
    @PostMapping("/admin/user-withdrawal")
    public ResponseEntity<String> deleteUserInfo(@RequestBody UserRequestDto dto) {
        
        userService.withdrawal(dto.getUid());

        return ResponseEntity.ok("탈퇴 완료");
    }
}
