package com.looklook.demo.service;

import com.looklook.demo.domain.Item;
import com.looklook.demo.domain.LookLookUser;
import com.looklook.demo.dto.ItemDto;
import com.looklook.demo.dto.ItemRegRequestDto;
import com.looklook.demo.dto.SellerItemDto;
import com.looklook.demo.repository.ItemImgRepository;
import com.looklook.demo.repository.ItemRepository;
import com.looklook.demo.repository.UserRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SellerItemService {
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final ItemImgRepository itemImgRepository;

    // 상품 등록 (일단 상품 등록 요청이 아니라 바로 상품 등록되도록)
    // 이미지 없는 버전
    @Transactional
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
    @Transactional
    public List<SellerItemDto> showItemList(Long uid) {
        Optional<LookLookUser> user = userRepository.findById(uid);
        if (user.isPresent()) {
            List<Item> items = itemRepository.findByUserId(uid);

            // toItemDto() 사용시 size와 color는 List<String>으로 바꿔서 매개변수로 같이 넘겨줘야 함
            List<String> sizes = items.stream()
                    .map(item -> item.getSizes().toString())
                    .collect(Collectors.toList());

            System.out.println("sizes: "+ sizes);

            List<String> colors = items.stream()
                    .map(item -> item.getColors().toString())
                    .collect(Collectors.toList());

            System.out.println("colors: "+ colors);

            List<SellerItemDto> dtos = items.stream()
                    .map(item -> item.toSellerItemDto(item, sizes, colors))
                    .collect(Collectors.toList());

            return dtos;
        } else{
            throw new RuntimeException("등록된 상품이 없습니다.");
        }

    }
    // 상품 정보 수정
//    @Transactional
//    public void updateItem(ItemRegRequestDto dto, Long pid){
//        Optional<Item> optionalItem = itemRepository.findById(pid);
//
//        if (optionalItem.isPresent()) {
//            Item item = optionalItem.get();
//            if (!dto.getItemName().isEmpty()){  // 상품명 수정
//                item.setItemName(dto.getItemName());
//            }
//            if (dto.getPrice() != null){ // 상품 가격 수정
//                item.setPrice(dto.getPrice());
//            }
//            if (dto.getPrice() != null){ // 상품 가격 수정
//                item.setPrice(dto.getPrice());
//            }
//
//        }
//        // dto를 받아서 item Entity로 변환하고 save
//        if (user.isPresent()) {
//            System.out.println("통과?");
//            Item item = dto.toEntity(dto);
//
//            // Item 엔티티 생성 및 설정
//            item.setUser(user.get()); // 연관 엔티티 설정
//
//            // 중복 저장되면 예외처리 아직 구현 X
//            itemRepository.save(item);
//        }
//    }

    // 상품 정보 삭제

}
