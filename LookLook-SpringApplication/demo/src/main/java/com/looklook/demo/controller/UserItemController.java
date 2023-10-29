package com.looklook.demo.controller;

import com.looklook.demo.dto.ItemDto;
import com.looklook.demo.service.UserItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserItemController {
    private final UserItemService userItemService;
    // 카테고리 별 상품 조회
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ItemDto>> showItemsByCategory(@PathVariable String category){
        try{
            List<ItemDto> itemDtos = userItemService.getItemsByCategory(category);
            return ResponseEntity.ok(itemDtos);
        } catch (RuntimeException e){
            System.out.println("에러는 캐치");
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/product/{pid}")
    public ResponseEntity<ItemDto> showItemsByPid(@PathVariable String pid) {
        ItemDto itemDto = userItemService.getItemByPid(Long.valueOf(pid));
        return ResponseEntity.ok(itemDto);
    }
}