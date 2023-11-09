package com.looklook.demo.service;

import com.looklook.demo.domain.Item;
import com.looklook.demo.dto.ItemDto;
import com.looklook.demo.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServiceAboutItem {
    private final ItemRepository itemRepository;

    @Autowired
    public AdminServiceAboutItem(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<ItemDto> getAllItems() {
        List<Item> items = itemRepository.findAll();

        // Item 엔티티를 ItemDto로 변환
        List<ItemDto> results = items.stream()
                .map(item -> {
                    ItemDto itemDto = item.toItemDto(item, null, null);
                    itemDto.setUserId(item.getUser().getUserId());
                    return itemDto;
                })
                .collect(Collectors.toList());
        return results;
    }

    // 이하 getSizesForItem 및 getColorsForItem 메서드도 구현해야 합니다.
}
