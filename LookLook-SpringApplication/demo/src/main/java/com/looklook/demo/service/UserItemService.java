package com.looklook.demo.service;

import com.looklook.demo.domain.Item;
import com.looklook.demo.domain.ItemColor;
import com.looklook.demo.domain.ItemSize;
import com.looklook.demo.dto.ItemDto;
import com.looklook.demo.repository.ItemRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserItemService {
    private final ItemRepository itemRepository;

    // 카테고리별 아이템 조회
    // 101(여자 셔츠/블라우스)로 조회하면 해당 카테고리의 아이템 리스트를 dto 리스트로 반환
    @Transactional
    public List<ItemDto> getItemsByCategory(String category) {
        Optional<List<Item>> optionalItems = itemRepository.findByCategory(category);

        List<Item> items = optionalItems.orElseThrow(() -> new RuntimeException("해당 카테고리에 상품이 없습니다."));

        return items.stream()
                .map(item -> item.toItemDto(item, null, null))
                .collect(Collectors.toList());
    }

    // 상품 아이디로 상품 조회
    @Transactional
    public ItemDto getItemByPid(Long id) {
        Optional<Item> optionalItem = itemRepository.findById(id);

        if (optionalItem.isPresent()){
            //Optional 벗기기
            Item item = optionalItem.get();

            // 해당 id의 상품이 비어있지 않으면, 어떤 사이즈를 가지고 있는지 조회
            List<ItemSize> sizes = item.getSizes();

            List<String> sizeResult = sizes.stream()
                    .map(ItemSize::getSizeName)
                    .collect(Collectors.toList());

            // 해당 id의 상품이 비어있지 않으면, 어떤 색상을 가지고 있는지 조회
            List<ItemColor> colors = item.getColors();

            List<String> colorResult = colors.stream()
                    .map(ItemColor::getColor) // ItemSize 엔티티의 사이즈 이름 필드
                    .collect(Collectors.toList());


            return item.toItemDto(item, sizeResult, colorResult);
        }
        else {
            throw new RuntimeException("상품 정보 없습니다.");
        }
    }

    // 상품별 보유 사이즈 조회
    public Optional<Item> getItemSizesByPid(Long pid) {
        return itemRepository.findById(pid);
    }

    // 상품별 보유 색상 조회
    public Optional<Item> getItemColorsByPid(Long pid){
        return itemRepository.findById(pid);
    }
}