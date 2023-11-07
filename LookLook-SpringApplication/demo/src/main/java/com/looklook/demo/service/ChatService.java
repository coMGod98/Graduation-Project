package com.looklook.demo.service;

import com.looklook.demo.domain.ChatBot;
import com.looklook.demo.domain.LookLookUser;
import com.looklook.demo.repository.ChatBotRepository;
import com.looklook.demo.repository.UserRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private ChatBotRepository chatBotRepository;

    @Autowired
    private UserRepository userRepository;

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
        userMessage.put("content", userRequest); // 사용자의 메시지 내용 설정
        messages.put(userMessage);

        // 시스템 메시지 추가
        JSONObject systemMessage = new JSONObject();
        systemMessage.put("role", "system");
        systemMessage.put("content", "당신은 룩룩 온라인 쇼핑몰의 고객상담원입니다. 룩룩 온라인 쇼핑몰은 의류만 판매합니다. 룩룩 온라인 쇼핑몰의 고객상담원은 상품 정보와 관련된 질문에 대해서 답변하지 않습니다. 그리고 룩룩 온라인 쇼핑몰에서 제공하는 기능에 대해서만 답변합니다.");
        messages.put(systemMessage);

        requestBody.put("messages", messages);
        requestBody.put("model", "ft:gpt-3.5-turbo-0613:personal::8E1So7jh");

        HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);

        String apiUrl = "https://api.openai.com/v1/chat/completions";


        // 'content' 추출
        String userQuestion = userMessage.getString("content");

        // 로깅: 사용자 질문 확인
        System.out.println("User Question: " + userQuestion);

        // 데이터베이스에 저장
        ChatBot chatBot = new ChatBot();
        chatBot.setQuestion(userRequest);
        chatBot.setChatTime(LocalDateTime.now());

        //사용자 정보 가져오기
        String userUid = getUserUid();
        Optional<LookLookUser> userOptional = userRepository.findById(Long.valueOf(userUid));

        if(userOptional.isPresent()) {
            LookLookUser user = userOptional.get();
            chatBot.setUser(user);
        }

        chatBotRepository.save(chatBot);

        return restTemplate.postForEntity(apiUrl, entity, String.class);
    }
    private String getUserUid() {
        // 현재 사용자 인증 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            // 사용자 UID를 UserDetails 객체에서 가져오기
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return userDetails.getUsername();
        }

        // 사용자를 식별할 수 없는 경우 기본값 설정
        return "0";
    }
}