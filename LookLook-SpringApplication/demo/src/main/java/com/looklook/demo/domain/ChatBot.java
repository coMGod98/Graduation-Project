package com.looklook.demo.domain;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "chatbot")
public class ChatBot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chid")
    private Long id;
    @Column(name = "user_question")
    private String question;
    @Column(name = "chat_time")
    private LocalDateTime chatTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "UID")
    private LookLookUser user;


//    @ManyToOne
//    @JoinColumn(name="UID", insertable = false, updatable = false)
//    private LookLookUser lookLookUser;


}