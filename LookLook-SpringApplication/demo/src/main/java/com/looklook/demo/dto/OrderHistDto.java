package com.looklook.demo.dto;

import com.looklook.demo.domain.Order;
import com.looklook.demo.domain.OrderStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class OrderHistDto {

    public OrderHistDto(Order order) {
        this.orderId=order.getId();
        this.orderDate=order.getOrderDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        this.orderStatus=order.getOrderStatus();
    }

    private Long orderId;
    private String orderDate;
    private OrderStatus orderStatus;
    private List<OrderItemDto> orderItemDtoList=new ArrayList<>();

    public void addOrderItemDto(OrderItemDto orderItemDto) {
        orderItemDtoList.add(orderItemDto);
    }
}