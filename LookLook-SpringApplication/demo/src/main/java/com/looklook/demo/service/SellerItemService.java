package com.looklook.demo.service;

import com.looklook.demo.domain.Item;
import com.looklook.demo.domain.LookLookUser;
import com.looklook.demo.dto.ItemRegRequestDto;
import com.looklook.demo.repository.ItemImgRepository;
import com.looklook.demo.repository.ItemRepository;
import com.looklook.demo.repository.UserRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SellerItemService {
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final ItemImgRepository itemImgRepository;

    // 상품 등록 (일단 상품 등록 요청이 아니라 바로 상품 등록되도록)
    // 이미지 없는 버전
    public void addNewItem(ItemRegRequestDto dto){
        // uid를 사용하여 연관 엔티티 (예: User)를 찾아옴
        Long uid = dto.getUid();
        System.out.println("request uid: "+uid);

        Optional<LookLookUser> user = userRepository.findById(uid);



        // dto를 받아서 item Entity로 변환하고 save
        if (user.isPresent()) {
            System.out.println("통과?");
            Item item = dto.toEntity(dto);

            // Item 엔티티 생성 및 설정
            item.setUser(user.get()); // 연관 엔티티 설정

            // 중복 저장되면 예외처리 아직 구현 X
            itemRepository.save(item);
        }
    }

    // 상품 정보 조회

    // 상품 정보 수정

    // 상품 정보 삭제

}
