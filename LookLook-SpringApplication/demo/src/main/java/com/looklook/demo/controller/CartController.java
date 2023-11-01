package com.looklook.demo.controller;

import com.looklook.demo.dto.CartItemRegRequestDto;
import com.looklook.demo.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    // 상세 페이지에서 장바구니 담기
    @PostMapping(value = "/cart")
    public ResponseEntity<String> addItemToCart(@RequestBody CartItemRegRequestDto cartItemRegRequestDto, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        // cartService에서 장바구니 담기
        Long cartItemId = cartService.addCart(cartItemRegRequestDto, Long.valueOf(userDetails.getUsername()));

        //응답 반환
        return ResponseEntity.ok(cartItemId + "번으로 추가되었습니다.");
    }

    //장바구니 조회
    @GetMapping(value = "/cart")
    public ResponseEntity<Map<String, Object>> showCart(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        Map<String, Object> result = cartService.getCartList(Long.valueOf(userDetails.getUsername()));

        return ResponseEntity.ok(result);
    }

    //장바구니에서 item 삭제
    @DeleteMapping(value = "/cart/{cartItemId}")
    public ResponseEntity<String> deleteCartItem(@PathVariable("cartItemId") String cartItemId) {
        cartService.deleteCartItem(Long.valueOf(cartItemId));
        return ResponseEntity.ok("아이템이 삭제되었습니다.");
    }

//    //장바구니 상품 수량 변경 -> 삭제
//    @PatchMapping(value = "cartITem/{cartItemId}")
//    public @ResponseBody ResponseEntity updateCartItem(@PathVariable("cartItemId") Long cartItemId,
//                                                       int count, Principal principal) {
//
//        if(count<=0) {
//            return new ResponseEntity<String>("최소 한개 이상 담아주세요", HttpStatus.BAD_REQUEST);
//        } else if (!cartService.validateCartItem(cartItemId, principal.getName())) {
//            return  new ResponseEntity<String>("수정 권한이 없습니다.", HttpStatus.FORBIDDEN);
//        }
//        cartService.updateCartItemCount(cartItemId, count);
//        return new ResponseEntity<Long>(cartItemId, HttpStatus.OK);
//    }



    // 장바구니 상품 주문
//    @PostMapping(value = "/cart/orders")
//    @ResponseBody
//    public ResponseEntity orders(@RequestBody CartOrderDto cartOrderDto, Principal principal) {
//
//        List<CartOrderDto> cartOrderDtoList = cartOrderDto.getCartOrderDtoList();
//
//        if (cartOrderDtoList == null || cartOrderDtoList.size() == 0) {
//            return new ResponseEntity<String>("주문할 상품을 선택해주세요.", HttpStatus.BAD_REQUEST);
//        }
//
//        // 장바구니 주문 상품들 각각 검증
//        for (CartOrderDto cartOrderDto1 : cartOrderDtoList) {
//            if (!cartService.validateCartItem(cartOrderDto1.getCartItemId(), principal.getName())) {
//                return new ResponseEntity<String>("주문 권한이 없습니다.", HttpStatus.FORBIDDEN);
//            }
//        }
//
//        Long orderId = cartService.orderCartItem(cartOrderDtoList, principal.getName());
//        return new ResponseEntity<Long>(orderId, HttpStatus.OK);
//    }

}
