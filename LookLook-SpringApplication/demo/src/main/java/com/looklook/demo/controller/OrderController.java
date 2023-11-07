package com.looklook.demo.controller;

import com.looklook.demo.dto.*;
import com.looklook.demo.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;


@RestController
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    // 주문서 작성으로 이동
    @PostMapping("/order-sheet")
    public ResponseEntity<OrderSheetResponseDto> orderCartItem(@RequestBody OrderSheetRequestDto orderSheetRequestDto, Authentication authentication) {

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // orderResponseDto를 보내줘야함. 주문 내역 조회 시애는 orderInfoDto로 새로 만들기
        OrderSheetResponseDto dto = orderService.composeOrderSheet(orderSheetRequestDto, Long.valueOf(userDetails.getUsername()));

        return ResponseEntity.ok(dto);
    }

    // 결제하기
    @PostMapping("/order")
    public ResponseEntity<String> order(@RequestBody OrderRequestDto orderRequestDto, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        Long orderId = orderService.order(orderRequestDto, Long.valueOf(userDetails.getUsername()));

        return ResponseEntity.ok(String.valueOf(orderId));

    }

    // 주문 완료 페이지
    @GetMapping("/order-success/{order-id}")
    public ResponseEntity<OrderInfoDto> orderSuccess(@PathVariable(name = "order-id") String orderId) {
        OrderInfoDto orderInfoDto = orderService.orderSuccess(Long.valueOf(orderId));
        return ResponseEntity.ok(orderInfoDto);
    }


    // 마이페이지에서 주문정보 조회
    @GetMapping("/mypage/order-info")
    public ResponseEntity<List<OrderInfoDto>> showOrderInfo(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        List<OrderInfoDto> results = orderService.showOrderInfo(Long.valueOf(userDetails.getUsername()));

        return ResponseEntity.ok(results);
    }
}
