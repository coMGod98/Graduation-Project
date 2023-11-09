package com.looklook.demo.repository;
import com.looklook.demo.domain.CartItem;
import org.springframework.data.domain.Pageable;
import com.looklook.demo.domain.Item;
import com.looklook.demo.domain.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    // 장바구니 상품 아이디로 상품 조회
    Optional<Item> findByCartItems(CartItem cartItem);

    //상품 검색
    @Query("SELECT i FROM Item i WHERE i.itemName LIKE %:itemName%")
    List<Item> findByItemName(@Param("itemName")String itemName);

    // 추천 상품 1~4번 4개
    List<Item> findTop4ByOrderByIdAsc();

    // 신상품 4개
    List<Item> findTop4ByOrderByIdDesc();
}