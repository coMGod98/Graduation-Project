package com.looklook.demo.dto;

import com.looklook.demo.domain.Order;
import com.looklook.demo.domain.OrderItem;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class OrderInfoDto {
    private Order order;
    private Map<String, Object> orderItems;
}
