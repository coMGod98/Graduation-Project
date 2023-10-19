package com.looklook.demo.dto;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class JoinForm {


    @NotBlank(message = "아이디 필수 입력")
    private String userid;

    @NotBlank(message = "이메일 필수 입력")
    private String email;

    @NotBlank(message = "비밀번호 필수 입력")
    private String password;

    @NotBlank(message = "이름 필수 입력")
    private String name;

    @NotBlank(message = "성별 필수 입력")
    private String gender;

    @NotBlank(message = "생일 필수 입력")
    private String birthday;

    @NotBlank(message = "번호 필수 입력")
    private String pnumber;

    @NotBlank(message = "주소 필수 입력")
    private String address;
}
