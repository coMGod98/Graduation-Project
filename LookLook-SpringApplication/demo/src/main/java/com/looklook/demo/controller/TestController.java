package com.looklook.demo.controller;

import com.looklook.demo.dto.ItemRegRequestDto;
import com.looklook.demo.service.SellerItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class TestController {
    private final SellerItemService sellerItemService;
    private final String imgUploadPath = "src/main/resources/img";
    @PostMapping(value = "/test", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> requestItemRegistration(
            @RequestPart ItemRegRequestDto itemRegRequestDto,
            @RequestPart MultipartFile imgFile
    ) throws Exception {


//        try {
//            sellerItemService.addNewItem(itemRegRequestDto);
//            return ResponseEntity.ok("상품 등록 요청이 완료되었습니다.");
//        } catch (RuntimeException e) {
//            return ResponseEntity.status(HttpStatus.CONFLICT).body("해당 상품명으로 등록된 상품이 이미 존재합니다.");
//        }

        // 이미지 저장 서비스


        return ResponseEntity.ok(imgFile.getName());
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
}
