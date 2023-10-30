package com.looklook.demo.dto;

// 사용자 정보 수정 전 pw 인증 dto

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequestDto {
    private String password;
}
