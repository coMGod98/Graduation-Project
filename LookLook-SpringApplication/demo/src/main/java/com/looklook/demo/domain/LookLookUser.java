package com.looklook.demo.domain;

<<<<<<< HEAD
import com.looklook.demo.dto.UserDto;
import com.looklook.demo.dto.UserResponseDto;
=======
import com.looklook.demo.dto.UserForm;
>>>>>>> Back-End-2
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;

// Spring Security에 User 객체가 있기 때문에 이 엔티티 명만 LookLookUser로 함
@Entity
@Getter
@Setter
<<<<<<< HEAD
@Table(name="USERS")
@NoArgsConstructor
=======
>>>>>>> Back-End-2
@ToString
public class LookLookUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UID")
    private Long id;
    @Column(name = "USERNAME")
    private String userName;
    @Column(name = "USERID", unique = true)
    private String userId;
    @Column(name = "USERPW")
    private String password;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Column(name = "SEX")
    private String sex;
    @Column(name = "PNUMBER")
    private String phoneNumber;
    @Column(name = "ADDRESS")
    private String address;
    @Column(name = "EMAIL")
    private String email;

    @Builder
<<<<<<< HEAD
    public LookLookUser(String userName, String userId, String password, Authority authority, String sex, String phoneNumber, String address, String email) {
=======
    public LookLookUser() {
>>>>>>> Back-End-2
        this.userName = userName;
        this.userId = userId;
        this.password = password;
        this.authority = authority;
        this.sex = sex;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.email = email;
    }

<<<<<<< HEAD
    public UserResponseDto toUserResponseDto(LookLookUser user) {
        UserResponseDto dto = new UserResponseDto();
        System.out.println("domain: "+user.getId());
        dto.setUid(user.getId());
        System.out.println("dto: "+dto.getUid());

        dto.setUserId(user.getUserId());
        dto.setUserName(user.getUserName());
        dto.setEmail(user.getEmail());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setAddress(user.getAddress());
        return dto;
=======
    public static LookLookUser createUser(UserForm userForm,
                                            PasswordEncoder passwordEncoder) {
        LookLookUser user = new LookLookUser();

        user.setUserId(userForm.getUserId());
        user.setUserName(userForm.getUserName());
        user.setEmail(userForm.getEmail());
        user.setAddress(userForm.getAddress());
        user.setSex(userForm.getSex());
        user.setPhoneNumber(userForm.getPhoneNumber());
        String password = passwordEncoder.encode(userForm.getPassword());
        user.setPassword(password);

        return user;
>>>>>>> Back-End-2
    }
}