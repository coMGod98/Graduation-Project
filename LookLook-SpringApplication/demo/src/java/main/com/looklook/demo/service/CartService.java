package com.looklook.demo.service;


import com.looklook.demo.domain.Cart;
import com.looklook.demo.domain.CartItem;
import com.looklook.demo.domain.Item;
import com.looklook.demo.domain.LookLookUser;
import com.looklook.demo.dto.CartItemDto;
import com.looklook.demo.dto.CartListDto;
import com.looklook.demo.dto.CartOrderDto;
import com.looklook.demo.dto.OrderDto;
import com.looklook.demo.repository.CartItemRepository;
import com.looklook.demo.repository.CartRepository;
import com.looklook.demo.repository.ItemRepository;
import com.looklook.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.util.StringUtils;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class CartService {


    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;
    private final OrderService orderService;


    //장바구니 담기
    public Long addCart(CartItemDto cartItemDto, String userId) {

        Item item = itemRepository.findById(cartItemDto.getItemId())
                .orElseThrow(EntityNotFoundException::new);
        Optional<LookLookUser> user = userRepository.findByUserId(userId);
        LookLookUser result = user.get();
        Cart cart=cartRepository.findByUserId(result.getId());

        // 장바구니가 존재하지 않는다면 생성
        if (cart == null) {
            cart = Cart.createCart(result);
            cartRepository.save(cart);
        }

        CartItem savedCartItem = cartItemRepository.findByCartIdAndItemId(cart.getId(), item.getId());
        //현재 상품이 장바구니에 이미 들어가 있는지 조회

        // 해당 상품이 장바구니에 존재한다면 기존 수량에서 현재 장바구니에 담을 수량만큼 더해줌
        if (savedCartItem != null) {
            savedCartItem.addCount(cartItemDto.getCount());
            return savedCartItem.getId();
        } else {
            CartItem cartItem = CartItem.createCartItem(cart, item, cartItemDto.getCount());
            cartItemRepository.save(cartItem);
            return cartItem.getId();
        }
    }


    //장바구니 조회
    @Transactional(readOnly = true)
    public List<CartListDto> getCartList(String userId) {

        List<CartListDto> cartListDto=new ArrayList<>();

        Optional<LookLookUser> user=userRepository.findByUserId(userId);
        LookLookUser result = user.get();
        Cart cart=cartRepository.findByUserId(result.getId());

        if(cart==null) {
            return cartListDto;
        }

        cartListDto=cartItemRepository.findCartListDto(cart.getId());
        return cartListDto;
    }


    //장바구니 수량 변경
    @Transactional(readOnly = true)
    public boolean validateCartItem(Long cartItemId, String userId) {

        //로그인 이용자
        Optional<LookLookUser> curUser=userRepository.findByUserId(userId);
        LookLookUser result = curUser.get();
        //수량 변경 요청 들어온 장바구니 상품 유저
        CartItem cartItem=cartItemRepository.findById(cartItemId).orElseThrow(EntityNotFoundException::new);
        LookLookUser savedUser=cartItem.getCart().getUser();

        if(StringUtils.equals(result.getUserId(), savedUser.getUserId())) {
            return true;
        }
        return false;
    }

    public void updateCartItemCount(Long cartItemId, int count){
        CartItem cartItem=cartItemRepository.findById(cartItemId)
                .orElseThrow(EntityNotFoundException::new);

        cartItem.updateCount(count);
    }

    //장바구니 상품 삭제
    public void deleteCartItem(Long cartItemId){

        CartItem cartItem=cartItemRepository.findById(cartItemId).orElseThrow(EntityNotFoundException::new);
        cartItemRepository.delete(cartItem);
    }

    // 장바구니 상품(들) 주문
    public Long orderCartItem(List<CartOrderDto> cartOrderDtoList, String userId) {
        List<OrderDto> orderDtoList = new ArrayList<>();

        for (CartOrderDto cartOrderDto : cartOrderDtoList) {
            //장바구니 페이지에서 전달 받은 주문 상품 번호를 이용하여 주문 로직으로 전달할 orderDto 객체 생성
            CartItem cartItem = cartItemRepository
                    .findById(cartOrderDto.getCartItemId())
                    .orElseThrow(EntityNotFoundException::new);

            OrderDto orderDto = new OrderDto();
            orderDto.setItemId(cartItem.getItem().getId());
            orderDto.setCount(cartItem.getCount());
            orderDtoList.add(orderDto);
        }

        Long orderId = orderService.orders(orderDtoList, userId);
        //장바구니에 담은 상품을 주문하도록 주문 로직 호출

        // 주문한 상품 장바구니에서 제거
        for (CartOrderDto cartOrderDto : cartOrderDtoList) {
            CartItem cartItem = cartItemRepository
                    .findById(cartOrderDto.getCartItemId())
                    .orElseThrow(EntityNotFoundException::new);
            cartItemRepository.delete(cartItem);
        }
        return orderId;
    }
}
