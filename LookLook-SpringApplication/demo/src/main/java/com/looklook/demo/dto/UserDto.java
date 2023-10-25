package com.looklook.demo.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.looklook.demo.domain.Authority;
import com.looklook.demo.domain.LookLookUser;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@AllArgsConstructor
@ToString
@NoArgsConstructor
<<<<<<< HEAD:LookLook-SpringApplication/demo/src/main/java/com/looklook/demo/dto/UserDto.java
public class UserDto {
    // 회원가입용
    @NotEmpty(message = "사용자ID는 필수항목입니다.")
=======
public class UserForm {
 @NotEmpty(message = "사용자ID는 필수항목입니다.")
>>>>>>> Back-End-2:LookLook-SpringApplication/demo/src/main/java/com/looklook/demo/dto/UserForm.java
    private String userId;
    @NotEmpty(message = "사용자 이름은 필수항목입니다.")
    private String userName;
    @NotEmpty(message = "비밀번호는 필수항목입니다.")
    private String password;
    @JsonIgnore
    @NotEmpty(message = "비밀번호 확인은 필수항목입니다.")
    private String passwordChk;
    @NotEmpty(message = "성별은 필수항목입니다.")
    private String sex;
    @Pattern(regexp = "^\\d{11}$", message = "10자리 숫자여야 합니다.")
    @NotEmpty(message = "전화번호는 필수항목입니다.")
    private String phoneNumber;
    @NotEmpty(message = "주소는 필수항목입니다.")
    private String address;
    @NotEmpty(message = "이메일은 필수항목입니다.")
    @Email
    private String email;
<<<<<<< HEAD:LookLook-SpringApplication/demo/src/main/java/com/looklook/demo/dto/UserDto.java

    public LookLookUser toUser(PasswordEncoder passwordEncoder) {
        String encodedPassword = passwordEncoder.encode(password);

        return LookLookUser.builder()
                .userId(userId)
                .password(encodedPassword)
                .userName(userName)
                .sex(sex)
                .phoneNumber(phoneNumber)
                .address(address)
                .email(email)
                .authority(Authority.ROLE_USER)
                .build();
    }

}
=======
}
>>>>>>> Back-End-2:LookLook-SpringApplication/demo/src/main/java/com/looklook/demo/dto/UserForm.java
