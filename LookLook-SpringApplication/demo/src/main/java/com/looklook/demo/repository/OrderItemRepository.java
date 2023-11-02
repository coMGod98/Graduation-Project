package com.looklook.demo.repository;

import com.looklook.demo.domain.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findAllByOrderId(Long orderId);

    Optional<OrderItem> findByColorAndCountAndSizeAndItemIdAndOrderIdIsNull(String color, int count, String size, Long pid);
}
