package com.looklook.demo.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

@Getter
@Setter
public class UserForm {
    private String userId;
    private String userName;
    private String password;
    private String sex;
    private String phoneNumber;
    private String address;
    private String email;
}
