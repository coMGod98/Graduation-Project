package com.looklook.demo.controller;

import com.looklook.demo.dto.ItemDto;
import com.looklook.demo.dto.ItemRegRequestDto;
import com.looklook.demo.dto.SellerItemDto;
//import com.looklook.demo.service.ItemService;
import com.looklook.demo.service.SellerItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class SellerItemController {
    private final SellerItemService sellerItemService;
    private final String imgUploadPath = "src/main/resources/img";

    // 나의 상품 조회
    @GetMapping("/seller/items")
    public ResponseEntity<List<SellerItemDto>> showAllItems(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        List<SellerItemDto> dtos = sellerItemService.showItemList(Long.valueOf(userDetails.getUsername()));

        return ResponseEntity.ok(dtos);
    }

    // 이미지 등록은 없는 버전, 나중에 삭제 예정
    @PostMapping(value = "/seller/items/new")
    public ResponseEntity<String> requestItemRegistration(
            @RequestBody ItemRegRequestDto itemRegRequestDto
    ) throws Exception {

        try {
            sellerItemService.addNewItem(itemRegRequestDto);
            return ResponseEntity.ok("상품 등록 요청이 완료되었습니다.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("해당 상품명으로 등록된 상품이 이미 존재합니다.");
        }

    }

    // 상품 등록 요청 (이미지까지 등록하는 버전)
//    @PostMapping(value = "/seller/items/new", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
//    public ResponseEntity<String> requestItemRegistration(
//            @Valid @RequestPart ItemRegRequestDto itemRegRequestDto,
//            @Valid @RequestPart("mainImg") List<MultipartFile> mainImg,
//            @Valid @RequestPart("detailedImgs") List<MultipartFile> detailedImgs
//    ) throws Exception {
//
//
//        return ResponseEntity.ok("상품 등록 요청이 완료되었습니다.");
//    }

    //     상품 수정 (아직 요청은 아님)
    @PostMapping(value = "/seller/item/{pid}")
    public ResponseEntity<String> updateItem(
            @PathVariable("pid") String pid,
            @RequestBody ItemRegRequestDto itemRegRequestDto
    ) throws Exception {

        String result = sellerItemService.updateItem(itemRegRequestDto, Long.valueOf(pid));
        return ResponseEntity.ok(result);
    }


    // 상품 삭제 (배송이 아직 완료되지 않은 상품이 있는 경우, 상품 삭제 불가능)
    @DeleteMapping(value = "/seller/item/{pid}")
    public ResponseEntity<String> deleteItem(@PathVariable("pid") String pid) {
        String result = sellerItemService.deleteItem(Long.valueOf(pid));
        return ResponseEntity.ok(result);
    }
}