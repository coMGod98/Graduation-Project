package com.looklook.demo.repository;

import com.looklook.demo.domain.Item;
import com.looklook.demo.domain.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.querydsl.QuerydslPredicateExecutor;


import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item,Long>
{
    Optional<List<Item>> findByCategory(String category);

    // 상품 아이디로 상품 조회
    Optional<Item> findById(Long id);

    // 유저 아이디로 판매자가 등록한 모든 상품 리스트 조회
    List<Item> findByUserId(Long id);

    // 주문 상품 아이디로 상품 조회
    Optional<Item> findByOrderItems(OrderItem orderItem);
}