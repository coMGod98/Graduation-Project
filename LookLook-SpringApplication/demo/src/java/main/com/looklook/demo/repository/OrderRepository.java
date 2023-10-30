package com.looklook.demo.repository;

import com.looklook.demo.domain.Order;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("select o from Order o " +
            "where o.user.userId = :userId " +
            "order by o.orderDate desc"
    )
    List<Order> findOrders(@Param("userId") String userId, Pageable pageable);
    //현재 로그인한 사용자의 주문 데이터를 페이징 조건에 맞춰 조회

    @Query("select count(o) from Order o " +
            "where o.user.userId = :userId"
    )
    Long countOrder(@Param("userId") String userId);
    //현재 로그인한 회원의 주문 개수가 몇개인지 조회

}