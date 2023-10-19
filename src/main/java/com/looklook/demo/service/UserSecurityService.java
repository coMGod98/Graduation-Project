//package com.looklook.demo.service;
//
//import com.looklook.demo.domain.LookLookUser;
//import com.looklook.demo.domain.UserRole;
//import com.looklook.demo.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//@RequiredArgsConstructor
//public class UserSecurityService implements UserDetailsService {
//    @Autowired
//    UserRepository userRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
//        Optional<LookLookUser> _user = this.userRepository.findByUserId(userId);
//        if(_user.isEmpty()){
//            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다");
//        }
//        LookLookUser user = _user.get();
//        List<GrantedAuthority> authorities = new ArrayList<>();
//
//        if ("admin".equals(userId)) {
//            authorities.add(new SimpleGrantedAuthority(UserRole.ADMIN.getValue()));
//        } else{
//            authorities.add(new SimpleGrantedAuthority(UserRole.USER.getValue()));
//        }
//
//
//        return new User(user.getUserId(), user.getPassword(), authorities);
//    }
//}