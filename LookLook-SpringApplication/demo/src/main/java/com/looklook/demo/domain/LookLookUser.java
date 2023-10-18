package com.looklook.demo.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

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
    @Column(name = "USERID")
    private String userId;
    @Column(name = "USERPW")
    private String password;
//    private List<Order> orders = new ArrayList<>();
}