package com.looklook.demo.dto;

import com.looklook.demo.domain.Order;
import com.looklook.demo.domain.OrderItem;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@ToString
public class OrderInfoDto {
    private Order order;
    private List<OrderItemInfoDto> orderiteminfo;
}
