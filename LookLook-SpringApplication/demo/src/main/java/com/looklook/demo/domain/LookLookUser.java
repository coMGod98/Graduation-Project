package com.looklook.demo.domain;

import lombok.*;

import javax.persistence.*;

// Spring Security에 User 객체가 있기 때문에 이 엔티티 명만 LookLookUser로 함
@Entity
@Getter
@Setter
@Table(name="USERS")
@NoArgsConstructor

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

    @Column(name = "SEX")
    private String sex;

    @Column(name = "PNUMBER")
    private String phoneNumber;
    @Column(name = "ADDRESS")
    private String address;

    @Column(name = "EMAIL")
    private String email;

    //    private List<Order> orders = new ArrayList<>();
    @Builder
    public LookLookUser(String userName, String userId, String password, String sex, String phoneNumber, String address, String email) {
        this.userName = userName;
        this.userId = userId;
        this.password = password;
        this.sex = sex;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.email = email;
    }
}