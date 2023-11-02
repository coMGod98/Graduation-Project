package com.looklook.demo.dto;

import com.looklook.demo.domain.LookLookUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Optional;

@Getter
@AllArgsConstructor
@Setter
public class UserResponseDto {
    private Long uid;
    private String userId;
    private String userName;
    private String phoneNumber;
    private String address;
    private String email;

    public UserResponseDto() {
// 일단 userId 뺐는데 괜찮은건지 모르겠음
        this.uid = null;
        this.userName = null;
        this.phoneNumber = null;
        this.address = null;
        this.email = null;
    }


    // 도메인 객체를 Dto로 바꾸기 위한 함수, UserService의 findMemberInfoByUserId()에서 사용
    public static UserResponseDto of(LookLookUser user) {
        UserResponseDto dto = new UserResponseDto();
        dto.setUid(user.getId());
        dto.setUserId(user.getUserId());
        if (user.getUserName() != null) {
            dto.userName = user.getUserName();
        }
        if (user.getPhoneNumber() != null) {
            dto.phoneNumber = user.getPhoneNumber();
        }
        if (user.getAddress() != null) {
            dto.address = user.getAddress();
        }
        if (user.getEmail() != null) {
            dto.email = user.getEmail();
        }
        return dto;
    }
}
