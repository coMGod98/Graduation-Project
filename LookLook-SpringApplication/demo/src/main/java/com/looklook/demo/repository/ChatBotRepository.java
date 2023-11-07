package com.looklook.demo.repository;

import com.looklook.demo.domain.ChatBot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatBotRepository extends JpaRepository<ChatBot, Long> {
}