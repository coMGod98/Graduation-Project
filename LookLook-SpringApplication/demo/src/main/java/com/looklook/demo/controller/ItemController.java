package com.looklook.demo.controller;

import com.looklook.demo.dto.ItemRegRequestDto;
import com.looklook.demo.domain.Item;
//import com.looklook.demo.dto.ItemSearchDto;
//import com.looklook.demo.service.ItemService;
//import com.looklook.demo.dto.ItemSearchDto;
//import com.looklook.demo.service.ItemService;
import com.looklook.demo.dto.ItemSearchDto;
import com.looklook.demo.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;



//추후 관리자만 들어갈 수 있는 페이지로 armin/ 추가함
@Controller
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    // 상품 등록 페이지
    @GetMapping(value = "admin/item/new")
    public String itemForm(ItemRegRequestDto itemRegRequestDto, Model model) {

        model.addAttribute("itemFormDto", itemRegRequestDto);
        return "item/itemForm";
    }

    //상품 등록
    @PostMapping(value = "/admin/item/new")
    public String itemNew(@Valid ItemRegRequestDto itemRegRequestDto, BindingResult bindingResult, Model model,
                          @RequestParam(name = "itemImgFile") List<MultipartFile> itemImgFileList) {

        if (bindingResult.hasErrors()) {
            return "item/itemForm";
        }


//        if (itemImgFileList.get(0).isEmpty() && itemRegRequestDto.getId() == null) {
//            model.addAttribute("errorMessage",
//                    "첫번째 상품 이미지는 필수 입력 값 입니다.");
//            return "item/itemForm";
//        }

        try {
            itemService.saveItem(itemRegRequestDto, itemImgFileList);
        } catch (Exception e) {
            model.addAttribute("errorMessage",
                    "상품 등록 중 에러가 발생하였습니다.");
            return "item/itemForm";
        }

        return "redirect:/";
    }

    // 상품 관리 페이지
    @GetMapping(value = {"/admin/items", "/admin/items/{page}"})
    public String itemManage(ItemSearchDto itemSearchDto,
                             @PathVariable(name = "page") Optional<Integer> page,
                             Model model) {

        // PageRequest.of() 메소드를 통해 Pageable 객체 생성
        Pageable pageable = PageRequest.of(page.isPresent() ? page.get() : 0, 3);
        Page<Item> items = itemService.getAdminItemPage(itemSearchDto, pageable);

        model.addAttribute("items", items);
        model.addAttribute("itemSearchDto", itemSearchDto);
        model.addAttribute("maxPage", 5);
        return "item/itemMng";
    }

//    // 상품 수정 페이지
//    @GetMapping(value = "/admin/item/{itemId}")
//    public String itemDetail(@PathVariable(name = "itemId") Long itemId, Model model) {
//
//        try {
//            ItemFormDto itemFormDto = itemService.getItemDetail(itemId);
//            model.addAttribute("itemFormDto", itemFormDto);
//        } catch (EntityNotFoundException e) {
//            model.addAttribute("errorMessage", "존재하지 않는 상품입니다.");
//            model.addAttribute("itemFormDto", new ItemFormDto());
//        }
//        return "item/itemForm";
//    }

    // 상품 수정
//    @PostMapping(value = "/admin/item/{itemId}")
//    public String itemUpdate(@Valid ItemRegRequestDto itemRegRequestDto, BindingResult bindingResult, Model model,
//                             @RequestParam(name = "itemImgFile") List<MultipartFile> itemImgFileList) {
//
//        if (bindingResult.hasErrors()) {
//            return "item/itemForm";
//        }

//        if (itemImgFileList.get(0).isEmpty() && itemRegRequestDto.getId() == null) {
//            model.addAttribute("errorMessage",
//                    "첫번째 상품 이미지는 필수 입력 값 입니다.");
//            return "item/itemForm";
//        }

//        try {
//            itemService.updateItem(itemRegRequestDto, itemImgFileList);
//        } catch (Exception e) {
//            model.addAttribute("errorMessage", "상품 수정 중 에러가 발생하였습니다.");
//            return "item/itemForm";
//        }
//        return "redirect:/";
//    }

//    // 상품 상세 페이지
//    @GetMapping(value = "/item/{itemId}")
//    public String itemDetail(Model model, @PathVariable("itemId") Long itemId) {
//        ItemFormDto itemFormDto = itemService.getItemDetail(itemId);
//        model.addAttribute("item", itemFormDto);
//        return "item/itemDetail";
//    }
}