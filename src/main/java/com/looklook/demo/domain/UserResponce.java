package com.looklook.demo.domain;

import java.time.LocalDate;

public class UserResponce {
    private Long id;
    private UserRole role;
    private String userId;
    private String password;
    private String uname;
    private String gender;
    private LocalDate birthday;
    private String pnumber;
    private String email;
    private String address;

    public void clearPassword() {
        this.password="";
    }
}
