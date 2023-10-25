package com.looklook.demo.dto;

import com.looklook.demo.domain.Authority;
import com.looklook.demo.domain.LookLookUser;
import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@Getter
@ToString
@AllArgsConstructor
@Setter
public class UserRequestDto {
    // dto 필드명과 json 객채명을 통일시켜야 한다.
    private String userId;
    private String password;
    private String userName;
    private String phoneNumber;
    private String address;
    private String email;

    public UserRequestDto() {
// 일단 userId 뺐는데 괜찮은건지 모르겠음
        this.userName = null;
        this.phoneNumber = null;
        this.address = null;
        this.email = null;
    }
    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(userId, password);
    }

//    public UsernamePasswordAuthenticationToken toAuthentication() {
//        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userId, password);
//
//        // 아래 라인을 추가하여 토큰을 콘솔에 출력합니다.
//        System.out.println("Authentication Token: " + authenticationToken);
//
//        return authenticationToken;
//    }
}
