package com.looklook.demo.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.thymeleaf.util.StringUtils;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="user")
@ToString
@Getter
public class User {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true)
    private String userId;
    private String password;
    private String uname;
    private String gender;
    private LocalDate birthday;
    private String pnumber;

    private String email;
    private String address;

    public void encodingPassword(PasswordEncoder passwordEncoder){
        if (StringUtils.isEmpty(password)){
            return;
        }
        password=passwordEncoder.encode(password);
    }
}


