package com.looklook.demo.service;

import com.looklook.demo.dto.UserResponseDto;
import com.looklook.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServiceAboutUser {
    private UserRepository userRepository;

    public AdminServiceAboutUser(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 관리자에서 사용자 정보 모두 조회
    @Transactional
    public List<UserResponseDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> user.toUserResponseDto(user)) // Assuming UserDto has a constructor that accepts a User object
                .collect(Collectors.toList());
    }

    @Transactional
    public UserResponseDto findUserInfoById(Long uid) {
        return userRepository.findById(uid)
                .map(user -> user.toUserResponseDto(user))
                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));
    }

    // 관리자에서 사용자 정보 수정
//    @Transactional
//    public  update(Long id, CommentDto dto) {
//        // 댓글 조회 및 예외 발생
//        Comment target = commentRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("댓글 수정 실패! 대상 댓글이 없습니다."));
//        // 댓글 수정
//        target.patch(dto);
//        // DB로 갱신
//        Comment updated = commentRepository.save(target);
//        // 댓글 엔티티를 DTO로 변환 및 반환
//        return CommentDto.createCommentDto(updated);
//    }

    // 관리자에서 사용자 정보 삭제
//    @Transactional
//    public CommentDto delete(Long id) {
//        // 댓글 조회(및 예외 발생)
//        Comment target = commentRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("댓글 삭제 실패! 대상이 없습니다."));
//        // 댓글 삭제
//        commentRepository.delete(target);
//        // 삭제 댓글을 DTO로 반환
//        return CommentDto.createCommentDto(target);
//    }
//}
}
