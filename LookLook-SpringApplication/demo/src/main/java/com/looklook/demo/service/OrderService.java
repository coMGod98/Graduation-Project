package com.looklook.demo.service;

import com.looklook.demo.domain.*;
import com.looklook.demo.dto.OrderDto;
import com.looklook.demo.dto.OrderHistDto;
import com.looklook.demo.dto.OrderItemDto;
import com.looklook.demo.repository.ItemImgRepository;
import com.looklook.demo.repository.ItemRepository;
import com.looklook.demo.repository.OrderRepository;
import com.looklook.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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
public class OrderService {

    private final ItemRepository itemRepository;        //상품을 불러와서 재고 변경
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final ItemImgRepository itemImgRepository;

    public Long order(OrderDto orderDto, String userId) {
        Item item = itemRepository.findById(orderDto.getItemId())
                .orElseThrow(EntityNotFoundException::new);
        Optional<LookLookUser> user = userRepository.findByUserId(userId);

        List<OrderItem> orderItemList = new ArrayList<>();
        OrderItem orderItem = OrderItem.createOrderItem(item, orderDto.getCount());
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
    @Transactional(readOnly = true)
    public Page<OrderHistDto> getOrderList(String userId, Pageable pageable) {

        List<Order> orders=orderRepository.findOrders(userId, pageable);
        //유저의 아이디와 페이징 조건을 이욯아ㅕ 주문 목록 조회
        Long totalCount=orderRepository.countOrder(userId);
        //유저 주문 총 개수

        List<OrderHistDto> orderHistDtos = new ArrayList<>();

        for (Order order : orders) {
            OrderHistDto orderHistDto = new OrderHistDto(order);
            List<OrderItem> orderItems = order.getOrderItems();
            for (OrderItem orderItem : orderItems) {
                ItemImg itemImg = itemImgRepository.findByItemIdAndRepImgYn
                        (orderItem.getItem().getId(), "Y"); //주문한 상품의 대표 이미지 조회
                OrderItemDto orderItemDto = new OrderItemDto(orderItem, itemImg.getImgUrl());
                orderHistDto.addOrderItemDto(orderItemDto);
            }

            orderHistDtos.add(orderHistDto);
        }

        return new PageImpl<OrderHistDto>(orderHistDtos, pageable, totalCount);
    }

    //주문 유저 검증
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
    public void orderCancel(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(EntityNotFoundException::new);
        order.orderCancel();
    }

    // 장바구니 상품(들) 주문
    public Long orders(List<OrderDto> orderDtoList, String userId) {

        // 유저 조회
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
