package com.looklook.demo.service;

import com.looklook.demo.domain.LookLookUser;
import com.looklook.demo.repository.UserRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public Long join(String userName, String userId, String password) {
        LookLookUser user = new LookLookUser();
        user.setUserName(userName);
        user.setUserId(userId);
        user.setPassword(passwordEncoder.encode(password));
        validateDuplicateUser(user);
        this.userRepository.save(user);
        return user.getId();
    }

    private void validateDuplicateUser(LookLookUser user) {
        Optional<LookLookUser> findUsers = userRepository.findByUserId(user.getUserId());
        if (!findUsers.isEmpty()) {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }
}