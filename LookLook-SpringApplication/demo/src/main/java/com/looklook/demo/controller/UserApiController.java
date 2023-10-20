package com.looklook.demo.controller;

import com.looklook.demo.dto.UserForm;
import com.looklook.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserApiController {
//    private final UserService userService;
//
//    @GetMapping("/")
//    public String hi() {
//        return "hi";
//    }
//    @GetMapping("/login")
//    public String login() {
//        return "login_form";
//    }
//
//    @GetMapping("/sign-up")
//    public String signup(Model model) {
//        model.addAttribute("userForm", new UserForm());
//        return "sign-up";
//    }
//
//    @PostMapping("/sign-up")
//    public String signup(UserForm userForm) {
//        userService.join(userForm.getUserName(),userForm.getUserId(),userForm.getPassword());
//        return "redirect:/login";
//    }
}
