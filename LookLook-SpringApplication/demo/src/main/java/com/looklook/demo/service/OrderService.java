package com.looklook.demo.service;

import com.looklook.demo.domain.*;
import com.looklook.demo.dto.*;
import com.looklook.demo.repository.*;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.thymeleaf.util.StringUtils;

import javax.persistence.EntityNotFoundException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {

    private final ItemRepository itemRepository;        //상품을 불러와서 재고 변경
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartItemRepository cartItemRepository;
    private final ItemImgRepository itemImgRepository;

    // 주문서 작성 시 필요한 정보 보내주기
    // 주문서 작성 단계에서 주문 상품 테이블에 데이터를 추가 (이때 주문 상태는 false)
    @Transactional
    public OrderSheetResponseDto composeOrderSheet(OrderSheetRequestDto orderSheetRequestDto, Long uid) {

        /*
         * 1. 배송정보 (이름, 연락처, DB에 저장된 사용자 주소)
         * 2. orderItems
         * 3. 결제 금액 (상품 가격, 배송비 포함 총 가격)
         *
         * cf) 위 3가지에 배송정보, 결제 정보(결제 수단, 타입) 업데이트해서 주문할 떄 OrderRequest로 구성하기
         * */

        OrderSheetResponseDto dto = new OrderSheetResponseDto();
        // 1. 배송 정보 가져오기
        Optional<LookLookUser> optionalUser = userRepository.findById(uid);
        if (optionalUser.isPresent()) {
            LookLookUser user = optionalUser.get();
            dto.setUserName(user.getUserName());
            dto.setPhoneNumber(user.getPhoneNumber());
            dto.setAddress(user.getAddress());
        }

        // 2. orderItems
        // 만약 orderSheetRequestDto에 cartId가 null이 아니면, cartItem을 orderItem으로 바꾸기
        // 주문을 완료해야 장바구니가 비워짐. 주문서 작성까지 와도 주문을 완료하지 않으면 cart, cartItem은 유지되어야 함

        if (orderSheetRequestDto.getCartItemId() != null) { // 장바구니 -> 주문서 작성
            // 1. CartItemId로 장바구니 상품 불러오기
            List<Long> cartItemIds = orderSheetRequestDto.getCartItemId();

            List<CartItem> cartItems = new ArrayList<>();

            for (Long cartItemId : cartItemIds) {
                Optional<CartItem> optionalCartItem = cartItemRepository.findById(cartItemId);
                if (optionalCartItem.isPresent()) {
                    CartItem item = optionalCartItem.get();
                    cartItems.add(item);
                }
            }

            // 2. CartItem에 있는걸 OrderItem으로
            List<OrderItem> orderItems = cartItems.stream()
                    .map(cartItem -> cartItem.toOrderItem(cartItem))
                    .collect(Collectors.toList());

            // 3. OrderItem 테이블에 저장
            for (OrderItem orderItem : orderItems) {
                orderItemRepository.save(orderItem);
            }

            // 4. dto에 OrderItem 담아주기
            dto.setOrderItems(orderItems);

            // 5. dto에 orderItemPrice 담아주기
            int totalPrice = orderItems.stream().mapToInt(item -> (item.getItem().getPrice())*(item.getCount())).sum();
            dto.setOrderItemPrice(totalPrice);

        } else { // 상품 상세 페이지 -> 주문서 작성
            OrderItem orderItem = new OrderItem();

            // 1. 연관된 item 설정
            Optional<Item> optionalItem = itemRepository.findById(orderSheetRequestDto.getPid());
            if (optionalItem.isPresent()) {
                Item item = optionalItem.get();
                orderItem.setItem(item);
            }

            // 2. size, color, count 설정
            orderItem.setSize(orderSheetRequestDto.getSize());
            orderItem.setColor(orderSheetRequestDto.getColor());
            orderItem.setCount(orderSheetRequestDto.getCount());

            // 3. 아직 주문 전이므로 orderStatus = false
            orderItem.setOrderStatus(false);

            // 4. orderItem 테이블에 저장
            orderItemRepository.save(orderItem);

            // 5. OrderSheetResponseDto에 orderItem 설정
            // dto에서 List<OrderItem> 타입으로 설정되어 있어서 1개밖에 없어도 리스트에 넣어주기
            List<OrderItem> orderItems = new ArrayList<>();
            orderItems.add(orderItem);
            dto.setOrderItems(orderItems);

            // 6. dto에 orderItemPrice 담아주기
            int totalPrice = orderItem.getCount() * orderItem.getItem().getPrice();
            dto.setOrderItemPrice(totalPrice);
        }

        return dto;
    }

// 1. orderRequestDto에서 데이터 보내주기
    // 배송정보(새로운 배송지로 업데이트 되었을 수도 있다.), List<Long> orderItemId, 결제 정보 (결제 금액은 서버에서 다시 계산)
// 2. orderRequestDto에서 받은 정보 바탕으로 새로운 Order 생성
// 3. 새로운 Order 설정 끝내면 DB에 저장
// 4. 해당 Order의 모든 OrderItem의 orderStatus가 true로 업데이트
// 5. 장바구니 db 삭제

    public void order(OrderRequestDto orderRequestDto, Long uid) {

    }

//    public Long order(OrderDto orderDto, String userId) {
//
//
//        Item item=itemRepository.findById(orderDto.getItemId()).orElseThrow(EntityNotFoundException::new);
//        Optional<LookLookUser> user = userRepository.findByUserId(userId);
//
//        List<OrderItem> orderItemList=new ArrayList<>();
//
//        OrderItem orderItem=OrderItem.createOrderItem(item, orderDto.getCount());
//        orderItemList.add(orderItem);
//
//        if (user.isPresent()){
//            LookLookUser result = user.get();
//            Order order = Order.createOrder(result, orderItemList);
//            orderRepository.save(order);
//            return order.getId();
//        }
//
//        // Optional이 비어 있을 때 처리 미흡
//        return null;
//    }

    // 주문 내역 조회
//    @Transactional(readOnly = true)
//    public Page<OrderHistDto> getOrderList(String userId, Pageable pageable) {
//
//        List<Order> orders=orderRepository.findOrders(userId, pageable);
//        Long totalCount=orderRepository.countOrder(userId);
//
//        List<OrderHistDto> orderHistDtos=new ArrayList<>();
//
//        for (Order order : orders) {
//            OrderHistDto orderHistDto = new OrderHistDto(order);
//            List<OrderItem> orderItems = order.getOrderItems();
//            for (OrderItem orderItem : orderItems) {
//                ItemImg itemImg = itemImgRepository.findByItemIdAndRepImgYn(orderItem.getItem().getId(), "Y");
//                OrderItemDto orderItemDto = new OrderItemDto(orderItem, itemImg.getImgUrl());
//                orderHistDto.addOrderItemDto(orderItemDto);
//            }
//            orderHistDtos.add(orderHistDto);
//        }
//        return new PageImpl<>(orderHistDtos, pageable, totalCount);
//    }

//    @Transactional(readOnly = true)
//    public boolean validateOrder(Long orderId, String userId) {
//
//        //상품 주문한 유저
//        Order order=orderRepository.findById(orderId).orElseThrow(EntityNotFoundException::new);
//
//        if (StringUtils.equals(order.getUser().getUserId(),userId)) {
//            return true;
//        }
//        return false;
//    }

    // 주문 취소
//    public void orderCancel(Long orderId) {
//        Order order = orderRepository.findById(orderId).orElseThrow(EntityNotFoundException::new);
//        order.orderCancel();
//    }

    // 장바구니 상품(들) 주문
//    public Long orders(List<OrderDto> orderDtoList, String userId) {
//
//        // 로그인한 유저 조회
//
//        Optional<LookLookUser> user = userRepository.findByUserId(userId);
//
//        // orderDto 객체를 이용하여 item 객체와 count 값을 얻어낸 뒤, 이를 이용하여 OrderItem 객체(들) 생성
//        List<OrderItem> orderItemList = new ArrayList<>();
//        for (OrderDto orderDto : orderDtoList) {
//            Item item = itemRepository.findById(orderDto.getItemId()).orElseThrow(EntityNotFoundException::new);
//            OrderItem orderItem = OrderItem.createOrderItem(item, orderDto.getCount());
//            orderItemList.add(orderItem);
//        }
//
//        //Order Entity 클래스에 존재하는 createOrder 메소드로 Order 생성 및 저장
//        if (user.isPresent()){
//            LookLookUser result = user.get();
//            Order order = Order.createOrder(result, orderItemList);
//            orderRepository.save(order);
//            return order.getId();
//        }
//
//        return null;
//    }


}
