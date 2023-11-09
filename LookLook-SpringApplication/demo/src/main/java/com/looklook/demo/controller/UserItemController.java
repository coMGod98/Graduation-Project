package com.looklook.demo.controller;

import com.looklook.demo.domain.Item;
import com.looklook.demo.domain.ItemColor;
import com.looklook.demo.domain.ItemSize;
import com.looklook.demo.dto.ItemDto;
import com.looklook.demo.dto.UserResponseDto;
import com.looklook.demo.repository.ItemRepository;
import com.looklook.demo.service.UserItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class UserItemController {
    private final UserItemService userItemService;

    @Autowired
    private ItemRepository itemRepository;
    // 카테고리 별 상품 조회
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ItemDto>> showItemsByCategory(@PathVariable String category){
        try{
            List<ItemDto> itemDtos = userItemService.getItemsByCategory(category);
            return ResponseEntity.ok(itemDtos);
        } catch (RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }

    // 상품 아이디로 상품 조회
    @GetMapping("/product/{pid}")
    public ResponseEntity<ItemDto> showItemsByPid(@PathVariable String pid) {
        ItemDto itemDto = userItemService.getItemByPid(Long.valueOf(pid));
        return ResponseEntity.ok(itemDto);
    }

    //상품 검색
    //한글자만 쳐도 해당 글자가 있는 상품명 나오게 변경
    @GetMapping("/product/search/{itemName}")
    public ResponseEntity<List<ItemDto>> searchProduct(@PathVariable String itemName) {
        List<ItemDto> dtos = userItemService.searchItem(itemName);
        return ResponseEntity.ok(dtos);
    }

    // 메인 페이지 인기 상품 조회
    @GetMapping("/recommended-products")
    public ResponseEntity<List<ItemDto>> recommendProducts() {
        List<ItemDto> dtos = userItemService.showRecommendedProducts();
        return ResponseEntity.ok(dtos);
    }

    // 메인 페이지 신상품 조회
    @GetMapping("/new-products")
    public ResponseEntity<List<ItemDto>> newProducts() {
        List<ItemDto> dtos = userItemService.showNewProducts();
        return ResponseEntity.ok(dtos);
    }
}