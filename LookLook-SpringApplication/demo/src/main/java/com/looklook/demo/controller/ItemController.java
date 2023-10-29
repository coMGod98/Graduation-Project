package com.looklook.demo.controller;

import com.looklook.demo.domain.Item;
import com.looklook.demo.dto.ItemFormDto;
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

    //판매자 상품 등록 페이지
    @GetMapping(value = "admin/item/new")
    public String itemForm(ItemFormDto itemFormDto, Model model) {

        model.addAttribute("itemFormDto", itemFormDto);
        return "item/itemForm";
    }


    //판매자 상품 등록
    @PostMapping(value = "/admin/item/new")
    public String itemNew(@Valid ItemFormDto itemFormDto, BindingResult bindingResult, Model model,
                          @RequestParam(name = "itemImgFile") List<MultipartFile> itemImgFileList) {

        if (bindingResult.hasErrors()) {
            return "item/itemForm";
        }


        if (itemImgFileList.get(0).isEmpty() && itemFormDto.getId() == null) {
            model.addAttribute("errorMessage",
                    "첫번째 상품 이미지는 필수 입력 값 입니다.");
            return "item/itemForm";
        }

        try {
            itemService.saveItem(itemFormDto, itemImgFileList);
        } catch (Exception e) {
            model.addAttribute("errorMessage",
                    "상품 등록 중 에러가 발생하였습니다.");
            return "item/itemForm";
        }

        return "redirect:/";
    }



    // 판매자 상품 수정 페이지
    @GetMapping(value = "/admin/item/{itemId}")
    public String itemDetail(@PathVariable(name = "itemId") Long itemId, Model model) {

        try {
            ItemFormDto itemFormDto = itemService.getItemDetail(itemId);
            model.addAttribute("itemFormDto", itemFormDto);
        } catch (EntityNotFoundException e) {
            model.addAttribute("errorMessage", "존재하지 않는 상품입니다.");
            model.addAttribute("itemFormDto", new ItemFormDto());
        }
        return "item/itemForm";
    }

    // 상품 수정
    @PostMapping(value = "/admin/item/{itemId}")
    public String itemUpdate(@Valid ItemFormDto itemFormDto, BindingResult bindingResult, Model model,
                             @RequestParam(name = "itemImgFile") List<MultipartFile> itemImgFileList) {

        if (bindingResult.hasErrors()) {
            return "item/itemForm";
        }

        if (itemImgFileList.get(0).isEmpty() && itemFormDto.getId() == null) {
            model.addAttribute("errorMessage",
                    "첫번째 상품 이미지는 필수 입력 값 입니다.");
            return "item/itemForm";
        }

        try {
            itemService.updateItem(itemFormDto, itemImgFileList);
        } catch (Exception e) {
            model.addAttribute("errorMessage", "상품 수정 중 에러가 발생하였습니다.");
            return "item/itemForm";
        }
        return "redirect:/";
    }

    // 관리자 상품 정보 조회
    // 요청 URL에 페이지 번호가 없는 경우와 있는 경우 2가지
    @GetMapping(value = {"/admin/items", "/admin/items/{page}"})
    public String itemManage(ItemSearchDto itemSearchDto,
                             @PathVariable(name = "page") Optional<Integer> page,
                             Model model) {

        // PageRequest.of() 메소드를 통해 Pageable 객체 생성
        // 첫번째 파라미터는 조회할 페이지 번호, 두 번째는 한 번에 가져올 데이터 수
        Pageable pageable = PageRequest.of(page.isPresent() ? page.get() : 0, 3);
        Page<Item> items = itemService.getAdminItemPage(itemSearchDto, pageable);

        model.addAttribute("items", items);
        model.addAttribute("itemSearchDto", itemSearchDto);
        //view 단에서 하단에 보여줄 페이지 번호의 최대 개수
        model.addAttribute("maxPage", 5);
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