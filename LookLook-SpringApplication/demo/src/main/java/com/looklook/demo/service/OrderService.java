package com.looklook.demo.service;

import com.looklook.demo.domain.*;
import com.looklook.demo.dto.*;
import com.looklook.demo.repository.ItemImgRepository;
import com.looklook.demo.repository.ItemRepository;
import com.looklook.demo.repository.OrderRepository;
import com.looklook.demo.repository.UserRepository;
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

@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {

    private final ItemRepository itemRepository;        //상품을 불러와서 재고 변경
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final ItemImgRepository itemImgRepository;

    // 주문서 작성 시 필요한 정보 보내주기
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
            // 1. CartItem에 있는걸 OrderItem으로
        } else { // 상품 상세 페이지 -> 주문서 작성

        }

        return dto;
    }

//1. 주문서 작성 단계에서 주문 상품 테이블에 데이터를 추가 (이때 주문 상태는 false)
//2. 주문하기 버튼을 누르면 주문 테이블에 새로 레코드가 추가
//3. 이때 주문 상품과 연결되고, 주문 상품의 상태 정보가 true로 업데이트

    public Long order(OrderDto orderDto, String userId) {


        Item item=itemRepository.findById(orderDto.getItemId()).orElseThrow(EntityNotFoundException::new);
        Optional<LookLookUser> user = userRepository.findByUserId(userId);

        List<OrderItem> orderItemList=new ArrayList<>();

        OrderItem orderItem=OrderItem.createOrderItem(item, orderDto.getCount());
        orderItemList.add(orderItem);

        if (user.isPresent()){
            LookLookUser result = user.get();
            Order order = Order.createOrder(result, orderItemList);
            orderRepository.save(order);
            return order.getId();
        }

        // Optional이 비어 있을 때 처리 미흡
        return null;
    }

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

    @Transactional(readOnly = true)
    public boolean validateOrder(Long orderId, String userId) {

        //상품 주문한 유저
        Order order=orderRepository.findById(orderId).orElseThrow(EntityNotFoundException::new);

        if (StringUtils.equals(order.getUser().getUserId(),userId)) {
            return true;
        }
        return false;
    }

    // 주문 취소
//    public void orderCancel(Long orderId) {
//        Order order = orderRepository.findById(orderId).orElseThrow(EntityNotFoundException::new);
//        order.orderCancel();
//    }

    // 장바구니 상품(들) 주문
    public Long orders(List<OrderDto> orderDtoList, String userId) {

        // 로그인한 유저 조회

        Optional<LookLookUser> user = userRepository.findByUserId(userId);

        // orderDto 객체를 이용하여 item 객체와 count 값을 얻어낸 뒤, 이를 이용하여 OrderItem 객체(들) 생성
        List<OrderItem> orderItemList = new ArrayList<>();
        for (OrderDto orderDto : orderDtoList) {
            Item item = itemRepository.findById(orderDto.getItemId()).orElseThrow(EntityNotFoundException::new);
            OrderItem orderItem = OrderItem.createOrderItem(item, orderDto.getCount());
            orderItemList.add(orderItem);
        }

        //Order Entity 클래스에 존재하는 createOrder 메소드로 Order 생성 및 저장
        if (user.isPresent()){
            LookLookUser result = user.get();
            Order order = Order.createOrder(result, orderItemList);
            orderRepository.save(order);
            return order.getId();
        }

        return null;
    }


}
