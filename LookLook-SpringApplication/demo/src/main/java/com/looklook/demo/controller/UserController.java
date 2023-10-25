package com.looklook.demo.controller;

import com.looklook.demo.dto.UserDto;
import com.looklook.demo.dto.UserResponseDto;
import com.looklook.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequiredArgsConstructor
public class UserController {

    @GetMapping("/")
    public String hi() {
        return "main";
    }
    @GetMapping("/login")
    public String login() {
        return "login_form";
    }

    @GetMapping("/signup")
    public String signup(Model model) {
        model.addAttribute("userDto", new UserDto());
        return "signup";
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/admin")
    public String admin(){
        return "admin";
    }
}