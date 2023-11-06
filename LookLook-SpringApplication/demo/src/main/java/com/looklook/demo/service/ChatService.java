package com.looklook.demo.service;

import com.looklook.demo.domain.ChatBot;
import com.looklook.demo.repository.ChatBotRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Service
public class ChatService {

    @Autowired
    private ChatBotRepository chatBotRepository;

    @Value("${openai.apiKey}")
    private String apiKey;

    public ResponseEntity<String> askOpenAI(String userRequest) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        RestTemplate restTemplate = new RestTemplate();

        JSONObject requestBody = new JSONObject();
        JSONArray messages = new JSONArray();


        // 사용자의 메시지 추가
        JSONObject userMessage = new JSONObject();
        userMessage.put("role", "user");
        userMessage.put("content", userRequest);
        messages.put(userMessage);

        requestBody.put("messages", messages);

        // 시스템 메시지 추가
        JSONObject systemMessage = new JSONObject();
        systemMessage.put("role", "system");
        systemMessage.put("content", "당신은 룩룩 온라인 쇼핑몰의 고객상담원입니다. 룩룩 온라인 쇼핑몰은 의류만 판매합니다. 룩룩 온라인 쇼핑몰의 고객상담원은 상품 정보와 관련된 질문에 대해서 답변하지 않습니다. 그리고 룩룩 온라인 쇼핑몰에서 제공하는 기능에 대해서만 답변합니다.");
        messages.put(systemMessage);

        requestBody.put("messages", messages);

        // 미세 조정한 모델 ID 설정
        requestBody.put("model", "ft:gpt-3.5-turbo-0613:personal::8E1So7jh");

        HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);

        String apiUrl = "https://api.openai.com/v1/chat/completions";

        //'content' 추출
        String userQuestion = userMessage.getString("content");

        //로깅: 사용자 질문 확인
        System.out.println("User Question: " + userQuestion);

        //사용자 질문을 데이터베이스에 저장
        ChatBot chatBot = new ChatBot();
        chatBot.setQuestion(userQuestion);
        chatBot.setLocalDate(LocalDateTime.now());
        chatBotRepository.save(chatBot);

        return restTemplate.postForEntity(apiUrl, entity, String.class);
    }
}