package com.looklook.demo.controller;

import com.looklook.demo.dto.CartItemDto;
import com.looklook.demo.dto.CartListDto;
import com.looklook.demo.dto.CartOrderDto;
import com.looklook.demo.service.CartService;
import lombok.RequiredArgsConstructor;
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

@RestController
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    // 장바구니 담기
    @PostMapping(value = "/cart")
    public @ResponseBody ResponseEntity order(@RequestBody @Valid CartItemDto cartItemDto,
                               BindingResult bindingResult, Principal principal) {

        if (bindingResult.hasErrors()) {
            StringBuilder sb = new StringBuilder();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            for (FieldError fieldError : fieldErrors) {
                sb.append(fieldError.getDefaultMessage()).append(" ");
            }
                return new ResponseEntity<String>(sb.toString(), HttpStatus.BAD_REQUEST);
            }

            String userId = principal.getName();    //현재 로그인한 회원 아이디 정보르 변수에 저장
            Long cartItemId;

            try {
                cartItemId = cartService.addCart(cartItemDto, userId);
            } catch (Exception e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
            }   //회원으로부터 넘어온 장바구니에 담을 상품 정보와 현재 로그인한 회원의 아이디 정보를 이용해
                //장바구니에 상품을 담는 로직 호출

        return new ResponseEntity<Long>(cartItemId, HttpStatus.OK);

    }





    //이부분 resonseeneiet로 바꾸긴 했는대 맞는진 모르겠어요
    //장바구니 페이지 이동
    @GetMapping(value = "/cart")
    public ResponseEntity<List<CartListDto>> orderHist(Principal principal, Model model) {
        List<CartListDto> cartListDto = cartService.getCartList(principal.getName());
        model.addAttribute("cartItems", cartListDto);
        return new ResponseEntity<>(cartListDto, HttpStatus.OK);
    }
    //원래 코드
    //    @GetMapping(value = "/cart")
    //    public String orderHist(Principal principal, Model model) {
    //
    //        List<CartListDto> cartListDto = cartService.getCartList(principal.getName());
    //          //현재 로그인한 사용자의 이멩리 정보를 이용하여 장바구니에 담겨있는 상품 정보 조회
    //        model.addAttribute("cartItems", cartListDto);
    //          //조회한 장바구니 상품 정보를 뷰로 전달
    //        return "cart/cartList";
    //    }

    //장바구니 수량 변경
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
    public @ResponseBody ResponseEntity deleteCartItem(@PathVariable ("cartITemId") Long cartITemId,
                                         Principal principal) {
        if (!cartService.validateCartItem(cartITemId, principal.getName())) {
            return new ResponseEntity<String> ("수정권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        cartService.deleteCartItem(cartITemId);
        return new ResponseEntity<Long>(cartITemId, HttpStatus.OK);
    }

    // 장바구니 상품 주문
    @PostMapping(value = "/cart/orders")
    public @ResponseBody ResponseEntity orderCartItem(@RequestBody CartOrderDto cartOrderDto, Principal principal) {

        List<CartOrderDto> cartOrderDtoList = cartOrderDto.getCartOrderDtoList();

        if (cartOrderDtoList == null || cartOrderDtoList.size() == 0) {
            return new ResponseEntity<String>("주문할 상품을 선택해주세요.", HttpStatus.FORBIDDEN);
        }   //주문할 상품 선택했는지 체크

        // 장바구니 주문 상품들 각각 검증
        for (CartOrderDto cartOrder : cartOrderDtoList) {
            if (!cartService.validateCartItem(cartOrder.getCartItemId(), principal.getName())) {
                return new ResponseEntity<String>("주문 권한이 없습니다.", HttpStatus.FORBIDDEN);
            }
        }   //주문 권한 체크

        Long orderId = cartService.orderCartItem(cartOrderDtoList, principal.getName());
        return new ResponseEntity<Long>(orderId, HttpStatus.OK );
        //주문 로직 호출 결과 생성된 주문 번호 반환
        //생성된 주문 번호와 요청이 성공했다는 HTTP 응답 상태 코드 반환
    }
}
