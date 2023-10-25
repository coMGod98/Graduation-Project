package com.looklook.demo.service;

import com.looklook.demo.domain.*;
import com.looklook.demo.dto.OrderDto;
import com.looklook.demo.repository.ItemRepository;
import com.looklook.demo.repository.OrderRepository;
import com.looklook.demo.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@TestPropertySource(locations = "classpath:application-test.properties")
class OrderServiceTest {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    UserRepository userRepository;


    public Item saveItem() {
        Item item=new Item();
        item.setItemName("테스트 상품");
        item.setPrice(100000);
        item.setItemDetail("테스트 상품 설명");
        item.setItemSellStatus(ItemSellStatus.SELL);
        item.setStock(100);
        return itemRepository.save(item);
    }

    public LookLookUser saveUser() {
        LookLookUser user=new LookLookUser();
        user.setUserId("djgdfjkg");
        return userRepository.save(user);
    }

    @Test
    @DisplayName("주문 테스트")
    public void order() {
        Item item = saveItem();
        LookLookUser user = saveUser();

        // 상품 상세 페이지 화면에서 넘어오는 값들 설정
        OrderDto orderDto = new OrderDto();
        orderDto.setCount(10);
        orderDto.setItemId(item.getId());

        // 주문 객체 DB에 저장
        Long orderId = orderService.order(orderDto, user.getEmail());

        // 저장된 주문 객체 조회
        Order order = orderRepository.findById(orderId).orElseThrow(EntityNotFoundException::new);

        // 1. DB에 저장된 주문 객체에서 주문 상품 추출 (1개)
        List<OrderItem> orderItems = order.getOrderItems();

        // 2. 위에서 만든 주문 상품 총 가격 (1개)
        int totalPrice = orderDto.getCount() * item.getPrice();

        // 1의 가격과 2가 같은지 테스트
        assertEquals(totalPrice, order.getTotalPrice());
    }
    @Test
    @DisplayName("주문 취소 테스트")
    public void cancelOrder() {

        Item item = saveItem();
        LookLookUser user = saveUser();

        OrderDto orderDto = new OrderDto();
        orderDto.setCount(10);
        orderDto.setItemId(item.getId());

        // 주문 객체 저장
        Long orderId = orderService.order(orderDto, user.getUserId());

        // 주문된 객체를 조회한 뒤에 주문 취소
        Order order = orderRepository.findById(orderId).orElseThrow(EntityNotFoundException::new);
        orderService.orderCancel(orderId);

        // 주문의 상태가 "CANCEL" 이고 처음 수량 100이 맞다면 테스트 통과
        assertEquals(OrderStatus.CANCEL, order.getOrderStatus());
        assertEquals(100, item.getStock());

    }
}