package com.looklook.demo.controller;

import com.looklook.demo.dto.ItemRegRequestDto;
import com.looklook.demo.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class SellerItemController {
    private final ItemService itemService;

    // 나름 상품 조회
    @GetMapping("/seller/items")
    public ResponseEntity<SellerItemDto> showAllItems() {
        return ResponseEntity.ok();
    }

    // 상품 등록 요청
    @PostMapping("/seller/items/new")
    public ResponseEntity<ItemRegRequestDto> requestItemRegistration(@RequestBody ItemRegRequestDto itemRegRequestDto) {

        return ResponseEntity.ok();
    }
}
