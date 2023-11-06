package com.looklook.demo.domain;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class ChatBot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String question;
    private LocalDateTime localDate;

//    @ManyToOne
//    @JoinColumn(name="UID", insertable = false, updatable = false)
//    private LookLookUser lookLookUser;


}