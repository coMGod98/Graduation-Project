package com.looklook.demo.service;

import com.looklook.demo.domain.LookLookUser;
import com.looklook.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    //회원 가입
    public Long join(String userName, String userId, String password) {
        LookLookUser user = new LookLookUser();
        user.setUserName(userName);
        user.setUserId(userId);
        user.setPassword(passwordEncoder.encode(password));
//        validateDuplicateUser(user);
        this.userRepository.save(user);
        return user.getId();
    }

    //회원 정보 수정

    //회원 삭제


//    private void validateDuplicateUser(LookLookUser user) {
//        LookLookUser findUsers = userRepository.findByUserId(user.getUserId());
//        if (!findUsers.isEmpty()) {
//            throw new IllegalStateException("이미 존재하는 회원입니다.");
//        }
//    }
}