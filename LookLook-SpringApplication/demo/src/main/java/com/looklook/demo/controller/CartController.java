package com.looklook.demo.controller;

import com.looklook.demo.dto.CartItemDto;
import com.looklook.demo.dto.CartListDto;
import com.looklook.demo.dto.CartOrderDto;
import com.looklook.demo.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    // 장바구니 담기
    @PostMapping(value = "/cart")
    @ResponseBody
    public ResponseEntity cart(@RequestBody @Valid CartItemDto cartItemDto,
                               BindingResult bindingResult, Principal principal) {

        if (bindingResult.hasErrors()) {
            StringBuilder sb = new StringBuilder();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            for (FieldError fieldError : fieldErrors) {
                sb.append(fieldError.getDefaultMessage()).append(" ");
            }
            return new ResponseEntity<String>(sb.toString(), HttpStatus.BAD_REQUEST);
        }


        try {
            Long cartItemId = cartService.addCart(cartItemDto, principal.getName());
            return new ResponseEntity<>(cartItemId, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    //이부분 resonseeneiet로 바꾸긴 했는대 맞는진 모르겠어요
    //장바구니 조회
    @GetMapping(value = "/cart")
    public ResponseEntity<List<CartListDto>> cartList(Principal principal, Model model) {
        List<CartListDto> cartListDto = cartService.getCartList(principal.getName());
        model.addAttribute("cartItems", cartListDto);
        return new ResponseEntity<>(cartListDto, HttpStatus.OK);
    }
    //원래 코드
    //    @GetMapping(value = "/cart")
    //    public String cartList(Principal principal, Model model) {
    //
    //        List<CartListDto> cartListDto = cartService.getCartList(principal.getName());
    //        model.addAttribute("cartItems", cartListDto);
    //        return "cart/cartList";
    //    }

    //장바구니 상품 수량 변경
    @PatchMapping(value = "cartITem/{cartItemId}")
    public @ResponseBody ResponseEntity updateCartItem(@PathVariable("cartItemId") Long cartItemId,
                                                       int count, Principal principal) {

        if(count<=0) {
            return new ResponseEntity<String>("최소 한개 이상 담아주세요", HttpStatus.BAD_REQUEST);
        } else if (!cartService.validateCartItem(cartItemId, principal.getName())) {
            return  new ResponseEntity<String>("수정 권한이 없습니다.", HttpStatus.FORBIDDEN);
        }
        cartService.updateCartItemCount(cartItemId, count);
        return new ResponseEntity<Long>(cartItemId, HttpStatus.OK);
    }

    //장바구니 삭제
    @DeleteMapping(value = "/cartItem/{cartITemId}")
    @ResponseBody
    public ResponseEntity deleteCartItem(@PathVariable Long cartITemId,
                                         Principal principal) {
        if (!cartService.validateCartItem(cartITemId, principal.getName())) {
            return new ResponseEntity<String> ("수정권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        cartService.deleteCartItem(cartITemId);
        return new ResponseEntity<Long>(cartITemId, HttpStatus.OK);
    }

    // 장바구니 상품 주문
    @PostMapping(value = "/cart/orders")
    @ResponseBody
    public ResponseEntity orders(@RequestBody CartOrderDto cartOrderDto, Principal principal) {

        List<CartOrderDto> cartOrderDtoList = cartOrderDto.getCartOrderDtoList();

        if (cartOrderDtoList == null || cartOrderDtoList.isEmpty()) {
            return new ResponseEntity<String>("주문할 상품을 선택해주세요.", HttpStatus.BAD_REQUEST);
        }

        // 장바구니 주문 상품들 각각 검증
        for (CartOrderDto cartOrderDto1 : cartOrderDtoList) {
            if (!cartService.validateCartItem(cartOrderDto1.getCartItemId(), principal.getName())) {
                return new ResponseEntity<String>("주문 권한이 없습니다.", HttpStatus.FORBIDDEN);
            }
        }

        Long orderId = cartService.orderCartItem(cartOrderDtoList, principal.getName());
        return new ResponseEntity<Long>(orderId, HttpStatus.OK );
    }

}
