package com.looklook.demo.service;

import com.looklook.demo.domain.LookLookUser;
<<<<<<< Updated upstream
import com.looklook.demo.dto.UserForm;
=======
import com.looklook.demo.domain.RefreshToken;
import com.looklook.demo.dto.*;
import com.looklook.demo.jwt.TokenProvider;
import com.looklook.demo.repository.RefreshTokenRepository;
>>>>>>> Stashed changes
import com.looklook.demo.repository.UserRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
<<<<<<< Updated upstream
import org.springframework.beans.factory.annotation.Autowired;
=======
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
>>>>>>> Stashed changes
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

<<<<<<< Updated upstream
import java.util.List;
=======
>>>>>>> Stashed changes
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public Long join(UserForm userForm) {
        LookLookUser user = new LookLookUser();
        user.setUserName(userForm.getUserName());
        user.setUserId(userForm.getUserId());
        user.setPassword(passwordEncoder.encode(userForm.getPassword()));
        user.setSex(userForm.getSex());
        user.setPhoneNumber(userForm.getPhoneNumber());
        user.setEmail(userForm.getEmail());
        user.setAddress(userForm.getAddress());
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
