package com.looklook.demo.controller;

import com.looklook.demo.dto.OrderDto;
import com.looklook.demo.dto.OrderHistDto;
import com.looklook.demo.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    // 주문서 작성
    /*
    배송정보: 이름, 연락처, 주소 정보 불러오기
    상품정보: 구매하려는 상품 수량,
    *
    **/

    // 단일 상품 주문
    @PostMapping(value = "/order")
    @ResponseBody
    public ResponseEntity order(@RequestBody @Valid OrderDto orderDto,
                                BindingResult bindingResult, Principal principal) {

        if (bindingResult.hasErrors()) {
            StringBuilder sb = new StringBuilder();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            for (FieldError fieldError : fieldErrors) {
                sb.append(fieldError.getDefaultMessage());
            }
            return new ResponseEntity<String>(sb.toString(), HttpStatus.BAD_REQUEST);
        }

        Long orderId;
        try {
            orderId = orderService.order(orderDto, principal.getName());
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Long>(orderId, HttpStatus.OK);
    }

    // 주문 내역 조회
//    @GetMapping(value = {"/orders", "/orders/{page}"})
//    public String orderHist(@PathVariable(name = "page") Optional<Integer> page, Principal principal, Model model) {
//
//        Pageable pageable = PageRequest.of(page.isPresent() ? page.get() : 0, 4);
//
//        Page<OrderHistDto> orderHistDtos = orderService.getOrderList(principal.getName(), pageable);
//        model.addAttribute("orders", orderHistDtos);
//        model.addAttribute("page", pageable.getPageNumber());
//        model.addAttribute("maxPage", 5);
//        return "order/orderHist";
//    }

    // 주문 취소
    @PostMapping(value = "/order/{orderId}/cancel")
    @ResponseBody
    public ResponseEntity orderCancel(@PathVariable(name = "orderId") Long orderId, Principal principal) {

        if (!orderService.validateOrder(orderId, principal.getName())) {
            return new ResponseEntity<String>("주문 취소 권한이 없습니다.", HttpStatus.FORBIDDEN);
        }
        orderService.orderCancel(orderId);
        return new ResponseEntity<Long>(orderId, HttpStatus.OK);
    }

}
