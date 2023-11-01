package com.looklook.demo.controller;

import com.looklook.demo.dto.OrderDto;
import com.looklook.demo.dto.OrderSheetRequestDto;
import com.looklook.demo.dto.OrderSheetResponseDto;
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
    @PostMapping("/cart/order")
    public ResponseEntity<OrderSheetResponseDto> orderCartItem(@RequestBody OrderSheetRequestDto orderSheetRequestDto, Authentication authentication) {

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // orderResponseDto를 보내줘야함. 주문 내역 조회 시애는 orderInfoDto로 새로 만들기
        OrderSheetResponseDto dto = orderService.composeOrderSheet(orderSheetRequestDto, Long.valueOf(userDetails.getUsername()));


        return ResponseEntity.ok(dto);
    }

    // 상품 상세페이지에서 주문서 작성으로 이동 -> 필요 없을 듯



    @PostMapping(value = "/product/order")
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


    // 주문하기


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
//    @PostMapping(value = "/order/{orderId}/cancel")
//    @ResponseBody
//    public ResponseEntity orderCancel(@PathVariable(name = "orderId") Long orderId, Principal principal) {
//
//        if (!orderService.validateOrder(orderId, principal.getName())) {
//            return new ResponseEntity<String>("주문 취소 권한이 없습니다.", HttpStatus.FORBIDDEN);
//        }
//        orderService.orderCancel(orderId);
//        return new ResponseEntity<Long>(orderId, HttpStatus.OK);
//    }

}
