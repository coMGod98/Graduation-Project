package com.looklook.demo.service;

import com.looklook.demo.domain.Item;
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
                .map(item -> item.of(item))
                .collect(Collectors.toList());
    }

    // 상품 아이디로 상품 조회
    @Transactional
    public ItemDto getItemByPid(Long id) {
        Optional<Item> optionalItem = itemRepository.findById(id);

        if (optionalItem.isPresent()){
            Item item = optionalItem.get();
            return item.of(item);
        }
        else {
            throw new RuntimeException("상품 정보 없습니다.");
        }
    }
}