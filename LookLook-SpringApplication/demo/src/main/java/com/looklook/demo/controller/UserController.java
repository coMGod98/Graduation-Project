
package com.looklook.demo.controller;

import com.looklook.demo.dto.UserForm;
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
    @GetMapping(value =  {"/"})
    public String forward() {
        return "forward:/index.html";
    }

//    @GetMapping("/")
//    public String hi() {
//        return "main";
//    }
//    @GetMapping("/login")
//    public String login() {
//        return "login_form";
//    }
//
//    @GetMapping("/signup")
//    public String signup(Model model) {
//        model.addAttribute("userDto", new UserForm());
//        return "signup";
//    }
//
//    @Secured("ROLE_ADMIN")
//    @GetMapping("/admin")
//    public String admin(){
//        return "admin";
//    }
}

//package com.looklook.demo.controller;
//
//import com.looklook.demo.dto.UserForm;
//import com.looklook.demo.dto.UserForm;
//import com.looklook.demo.service.UserService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.validation.BindingResult;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//
//import javax.validation.Valid;
//
//@Controller
//@RequiredArgsConstructor
//public class UserController {
//
//    private final UserService userService;
//
//    @GetMapping("/")
//    public String hi() {
//        return "main";
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
//    public String signup(@Valid UserForm userForm, BindingResult bindingResult) {
//        if (bindingResult.hasErrors()) {
//            return "sign-up";
//        }
//        if (!userForm.getPassword().equals(userForm.getPasswordChk())) {
//            bindingResult.rejectValue("passwordChk", "passwordInCorrect",
//                    "2개의 패스워드가 일치하지 않습니다.");
//            return "sign-up";
//        }
//
//        userService.join(userForm);
//        return "redirect:/login";
//    }
//}

