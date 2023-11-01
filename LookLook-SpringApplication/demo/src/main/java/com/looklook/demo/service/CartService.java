package com.looklook.demo.service;


import com.looklook.demo.domain.Cart;
import com.looklook.demo.domain.CartItem;
import com.looklook.demo.domain.Item;
import com.looklook.demo.domain.LookLookUser;
import com.looklook.demo.dto.CartItemDto;
import com.looklook.demo.dto.CartItemRegRequestDto;

import com.looklook.demo.repository.CartItemRepository;
import com.looklook.demo.repository.ItemRepository;
import com.looklook.demo.repository.UserRepository;
import com.looklook.demo.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;
    private final OrderService orderService;


    // 장바구니 담기
    @Transactional
    public Long addCart(CartItemRegRequestDto cartItemRegRequestDto, Long uid) {

        Optional<LookLookUser> optionalUser = userRepository.findById(uid);

        LookLookUser user = optionalUser.get();

        Optional<Cart> optionalCart = cartRepository.findByUserId(user.getId());

        Cart cart;

        // 1. 장바구니가 존재하지 않는다면 생성
        // 동시성 문제가 발생할 가능성이 있다...?
        if (!optionalCart.isPresent()) {
            cart = new Cart();
            cart.setUser(user);
            cartRepository.save(cart);
        }
        else {
            cart = optionalCart.get();
        }

        // 2. dto를 검사해서 기존 장바구니에 같은 사이즈, 색상으로 동일 상품이 담겨있으면 새로 추가하지 말고 count만 증가시키기
        Optional<CartItem> ifDuplicated = cartItemRepository.findByItemIdAndColorAndSize(
                cartItemRegRequestDto.getPid(), cartItemRegRequestDto.getColor(), cartItemRegRequestDto.getSize());

        if (ifDuplicated.isPresent()) {
            CartItem pastCartItem = ifDuplicated.get();
            pastCartItem.addCount(cartItemRegRequestDto.getCount());
            return pastCartItem.getId();
        } else {  // 3. 새로운 상품이면 새로운 CartItem 만들어서 저장
            // cartItemDto -> cartItem(Entity)
            Optional<Item> item = itemRepository.findById(cartItemRegRequestDto.getPid());
            CartItem newCartItem = cartItemRegRequestDto.toEntity(cartItemRegRequestDto,cart, item.get());
            // save cartItem
            cartItemRepository.save(newCartItem);
            return newCartItem.getId();
        }
    }

    // 장바구니 조회
    @Transactional(readOnly = true)
    public Map<String, Object> getCartList(Long uid) {
        // 1. 해당 유저의 Cart 조회
        Optional<Cart> optionalCart = cartRepository.findByUserId(uid);

        Cart cart;

        // 2. 장바구니가 존재하지 않는다면 생성
        // 동시성 문제가 발생할 가능성이 있다...?
        if (!optionalCart.isPresent()) {
            Optional<LookLookUser> optionalUser = userRepository.findById(uid);
            LookLookUser user = optionalUser.get();
            cart = new Cart();
            cart.setUser(user);
            cartRepository.save(cart);
        }
        else { // 3. 있으면 불러오기
            cart = optionalCart.get();
        }

        // 4. CartItem -> cartListDto
        List<CartItem> items = cartItemRepository.findAllByCartId(cart.getId());

        List<CartItemDto> cartItemDtos = items.stream()
                .map(item -> item.toCartItemDto(item))
                .collect(Collectors.toList());

        Map<String, Object> result = new HashMap<>();
        result.put("CartItemList", cartItemDtos);

        // 장바구니에 담긴 상품 총 가격
        int totalPrice = items.stream().mapToInt(item -> (item.getItem().getPrice())*(item.getCount())).sum();
        result.put("totalPrice", totalPrice);

        return result;
    }

    // 장바구니에 담긴 아이템 삭제
    public void deleteCartItem(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

//
//    //장바구니 주인 조회
//    @Transactional(readOnly = true)
//    public boolean validateCartItem(Long cartItemId, String userId) {
//
//        //로그인 이용자
//        Optional<LookLookUser> curUser=userRepository.findByUserId(userId);
//        LookLookUser result = curUser.get();
//        //수량 변경 요청 들어온 장바구니 상품 유저
//        CartItem cartItem=cartItemRepository.findById(cartItemId).orElseThrow(EntityNotFoundException::new);
//        LookLookUser savedUser=cartItem.getCart().getUser();
//
//        if(StringUtils.equals(result.getUserId(), savedUser.getUserId())) {
//            return true;
//        }
//        return false;
//    }
//
//    public void updateCartItemCount(Long cartItemId, int count){
//        CartItem cartItem=cartItemRepository.findById(cartItemId).orElseThrow(EntityNotFoundException::new);
//        cartItem.updateCount(count);
//    }
//
//    public void deleteCartItem(Long cartItemId){
//
//        CartItem cartItem=cartItemRepository.findById(cartItemId).orElseThrow(EntityNotFoundException::new);
//        cartItemRepository.delete(cartItem);
//    }
//
//    // 장바구니 상품(들) 주문
//    public Long orderCartItem(List<CartOrderDto> cartOrderDtoList, String userId) {
//
//        List<OrderDto> orderDtoList = new ArrayList<>();
//
//        for (CartOrderDto cartOrderDto : cartOrderDtoList) {
//            CartItem cartItem = cartItemRepository.findById(cartOrderDto.getCartItemId()).orElseThrow(EntityNotFoundException::new);
//            OrderDto orderDto = new OrderDto();
//            orderDto.setItemId(cartItem.getItem().getId());
//            orderDto.setCount(cartItem.getCount());
//            orderDtoList.add(orderDto);
//        }
//
//        Long orderId = orderService.orders(orderDtoList, userId);
//
//        // 주문한 장바구니 상품을 제거
//        for (CartOrderDto cartOrderDto : cartOrderDtoList) {
//            CartItem cartItem = cartItemRepository.findById(cartOrderDto.getCartItemId()).orElseThrow(EntityNotFoundException::new);
//            cartItemRepository.delete(cartItem);
//        }
//        return orderId;
//    }
}
