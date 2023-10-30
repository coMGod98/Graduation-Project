package com.looklook.demo.controller;

import com.looklook.demo.domain.Item;
import com.looklook.demo.dto.ItemRegRequestDto;
import com.looklook.demo.dto.ItemSearchDto;
import com.looklook.demo.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;



//추후 관리자만 들어갈 수 있는 페이지로 armin/ 추가함
@RestController
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    //판매자 상품 등록
    @GetMapping(value = "admin/item/new")
    public String itemForm(ItemRegRequestDto itemRegRequestDto, Model model) {
        model.addAttribute("itemRegRequestDto", itemRegRequestDto);
        return "item/itemForm";
    }

    //판매자 상품 등록
    @PostMapping(value = "/admin/item/new")
    public String itemNew(@Valid ItemRegRequestDto itemRegRequestDto, BindingResult bindingResult, Model model,
                          @RequestParam(name = "itemImgFile") List<MultipartFile> itemImgFileList) {

        if (bindingResult.hasErrors()) {    //상품 등록 시 필수 값이 없으면 다시 상품 등록 페이지로 전환
            return "item/itemForm";
        }

        if (itemImgFileList.get(0).isEmpty() && itemRegRequestDto.getId() == null) {
            model.addAttribute("errorMessage",
                    "첫번째 상품 이미지는 필수 입력 값 입니다.");
            return "item/itemForm";
        }

        try {
            itemService.saveItem(itemRegRequestDto, itemImgFileList);
        } catch (Exception e) {
            model.addAttribute("errorMessage",
                    "상품 등록 중 에러가 발생하였습니다.");
            return "item/itemForm";
        }

        return "redirect:/";
    }



//    // 판매자 상품 수정
//    // 조회한 상품 데이터를 모델에 담아 뷰로 전달
//    @GetMapping(value = "/admin/item/{itemId}")
//    public String itemDetail(@PathVariable(name = "itemId") Long itemId, Model model) {
//
//        try {
//            ItemRegRequestDto itemRegRequestDto = itemService.getItemDetail(itemId);
//            model.addAttribute("itemFormDto", itemFormDto);
//        } catch (EntityNotFoundException e) {
//            model.addAttribute("errorMessage", "존재하지 않는 상품입니다.");
//            model.addAttribute("itemFormDto", new ItemFormDto());
//        }
//        return "item/itemForm";
//    }

    // 상품 수정
    @PostMapping(value = "/admin/item/{itemId}")
    public String itemUpdate(@Valid ItemRegRequestDto itemRegRequestDto, BindingResult bindingResult, Model model,
                             @RequestParam(name = "itemImgFile") List<MultipartFile> itemImgFileList) {

        if (bindingResult.hasErrors()) {
            return "item/itemForm";
        }

        if (itemImgFileList.get(0).isEmpty() && itemRegRequestDto.getId() == null) {
            model.addAttribute("errorMessage",
                    "첫번째 상품 이미지는 필수 입력 값 입니다.");
            return "item/itemForm";
        }

        try {
            itemService.updateItem(itemRegRequestDto, itemImgFileList);
        } catch (Exception e) {
            model.addAttribute("errorMessage", "상품 수정 중 에러가 발생하였습니다.");
            return "item/itemForm";
        }
        return "redirect:/";
    }

    //상품 삭제
    @DeleteMapping(value = "/admin/item/{itemId}")
    public String deleteItem(@PathVariable(name="itemId") Long itemId) {
        try {
            itemService.deleteItem(itemId);
            return "item/itemForm"; // 삭제 후 상품 목록 화면으로 리다이렉트
        } catch (EntityNotFoundException e) {
            // 상품이 존재하지 않을 경우 에러 메시지 반환 또는 처리
            return "errorPage"; // 존재하지 않는 상품 에러 페이지로 이동
        }
    }



    //상품 관리 화면 및 이동 및 조회한 상품 데이터를 회면에 전달
    @GetMapping(value = {"/admin/items", "/admin/items/{page}"})    //value에 상품 화면 진입 시 URL에 페이지 번호가 없는 경우와 있는 경우 2가지 매핑
    public String itemManage(ItemSearchDto itemSearchDto,
                             @PathVariable(name = "page") Optional<Integer> page,
                             Model model) {

        // PageRequest.of() 메소드를 통해 Pageable 객체 생성
        // 첫번째 파라미터는 조회할 페이지 번호, 두 번째는 한 번에 가져올 데이터 수
        Pageable pageable = PageRequest.of(page.isPresent() ? page.get() : 0, 3);
        //페이징을 위해 PageRequest.of 메소드를 통해 Pageable 객체 생성, URL 경로에 페이지 번호 있으면 해당 페이지를 조회하도록 세팅, 페이지 번호 없으면 0번 페이지 조회
        Page<Item> items = itemService.getAdminItemPage(itemSearchDto, pageable);
        //조회 조건과 페이징 정보를 파라미터로 넘겨서 Page 객체를 반환 받음
        model.addAttribute("items", items);
        //조회한 상품 데이터 및 페이징 정보를 뷰에 전달
        model.addAttribute("itemSearchDto", itemSearchDto);
        //페이지 전환 시 기존 검색 조건을 유지한 채 이동할 수 있도록 뷰에 다시 전달
        model.addAttribute("maxPage", 5);           //view 단에서 하단에 보여줄 페이지 번호의 최대 개수

        return "item/itemMng";
    }

//    // 상품 상세 페이지
//    @GetMapping(value = "/item/{itemId}")
//    public String itemDetail(Model model, @PathVariable("itemId") Long itemId) {
//        ItemFormDto itemFormDto = itemService.getItemDetail(itemId);
//        model.addAttribute("item", itemFormDto);
//        return "item/itemDetail";
//    }
}