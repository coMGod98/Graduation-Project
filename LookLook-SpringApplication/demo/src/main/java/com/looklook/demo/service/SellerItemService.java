package com.looklook.demo.service;

import com.looklook.demo.domain.*;
import com.looklook.demo.dto.ItemDto;
import com.looklook.demo.dto.ItemRegRequestDto;
import com.looklook.demo.dto.SellerItemDto;
import com.looklook.demo.repository.ItemImgRepository;
import com.looklook.demo.repository.ItemRepository;
import com.looklook.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SellerItemService {
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final FileHandler fileHandler;
    private final ItemImgRepository itemImgRepository;

    // 상품 등록 (일단 상품 등록 요청이 아니라 바로 상품 등록되도록)
    // 이미지 없는 버전
    @Transactional
    public void addNewItem(ItemRegRequestDto dto, MultipartFile main, MultipartFile detailed) throws Exception {
        // uid를 사용하여 연관 엔티티 (예: User)를 찾아옴
        Long uid = dto.getUid();
        Optional<LookLookUser> user = userRepository.findById(uid);

        // dto를 받아서 item Entity로 변환하고 save
        if (user.isPresent()) {
            Item item = dto.toEntity(dto);

            // Item 엔티티 생성 및 설정
            item.setUser(user.get()); // 연관 엔티티 설정

            // 중복 저장되면 예외처리 아직 구현 X
            Long pid = itemRepository.save(item).getId();

            // 사진 처리
            List<ItemImg> imgList = fileHandler.parseImgInfo(main, detailed, pid);

            if(!imgList.isEmpty()) {
                for(ItemImg img : imgList) {
                    // 파일을 DB에 저장
                    item.addItemImg(itemImgRepository.save(img));
                }
            }
        }
    }

    // 상품 정보 조회
    @Transactional
    public List<SellerItemDto> showItemList(Long uid) {
        Optional<LookLookUser> user = userRepository.findById(uid);
        if (user.isPresent()) {
            List<Item> items = itemRepository.findByUserId(uid);

            List<SellerItemDto> dtos = new ArrayList<>();

            for (Item item : items) {
                // size 꺼내기
                List<ItemSize> sizesTests = item.getSizes();

                List<String> size = sizesTests.stream()
                        .map(test -> test.getSizeName())
                        .collect(Collectors.toList());

                // color 꺼내기
                List<ItemColor> colorsTests = item.getColors();

                List<String> color = colorsTests.stream()
                        .map(test -> test.getColor())
                        .collect(Collectors.toList());

                dtos.add(item.toSellerItemDto(item, size, color));
//                System.out.println("result: "+ result);
            }
            return dtos;
        } else{
            throw new RuntimeException("등록된 상품이 없습니다.");
        }

    }


    // 상품 정보 수정
    @Transactional
    public String updateItem(ItemRegRequestDto dto, Long pid){
        Optional<Item> optionalItem = itemRepository.findById(pid);

        if (optionalItem.isPresent()) {
            Item item = optionalItem.get();
            // 상품명은 수정 불가
            if (dto.getPrice() != null){ // 상품 가격 수정
                item.setPrice(dto.getPrice());
            }
            if (dto.getPgender() != null){  // 상품 성별 수정
                item.setPgender(dto.getPgender());
            }
            if (dto.getItemDetail() != null){  // 상품 설명 수정
                item.setItemDetail(dto.getItemDetail());
            }
            if (dto.getCategory() != null){  // 상품 카테고리 수정
                item.setCategory(dto.getCategory());
            }

            // 문제: ItemRegRequestDto와 코드 중복
            if (dto.getSize() != null){  // 상품 사이즈 수정]
                /*
                * list를 바꾸고 싶으면 새 list를 만들어서 set하지 말고, 내용(content)을 지우고 새로 넣자.
                    holder.getNames().clear();
                    holder.getNames().addAll(names);
                * */

                item.getSizes().clear();
                List<String> sizeStrings = dto.getSize();
                List<ItemSize> sizeResult = new ArrayList<>();

                for (String sizeString : sizeStrings) {
                    ItemSize itemSize = new ItemSize();
                    itemSize.setSizeName(sizeString);
                    sizeResult.add(itemSize);
                }
                item.getSizes().addAll(sizeResult);
            }
            if (dto.getColor() != null) {  // 상품 색상 수정
                item.getColors().clear();
                List<String> colorStrings = dto.getColor();
                List<ItemColor> colorResult = new ArrayList<>();

                for (String colorString : colorStrings) {
                    ItemColor itemColor = new ItemColor();
                    itemColor.setColor(colorString);
                    colorResult.add(itemColor);
                }
                item.getColors().addAll(colorResult);
            }
            itemRepository.save(item);
        }
        return "상품이 수정되었습니다.";
    }

    @Transactional
    public String deleteItem(Long pid) {
        Optional<Item> item = itemRepository.findById(pid);
        if (item.isPresent()) {
            itemRepository.delete(item.get());
        }

        return "상품이 삭제되었습니다.";
    }
    // 상품 정보 삭제

}
