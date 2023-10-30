
package com.looklook.demo.controller;

import com.looklook.demo.dto.UserForm;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class UserController {

//    @GetMapping("/")
//    public String hi() {
//        return "main";
//    }
    @GetMapping("/login")
    public String login() {
        return "login_form";
    }

    @GetMapping("/signup")
    public String signup(Model model) {
        model.addAttribute("userDto", new UserForm());
        return "signup";
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/admin")
    public String admin(){
        return "admin";
    }
}


