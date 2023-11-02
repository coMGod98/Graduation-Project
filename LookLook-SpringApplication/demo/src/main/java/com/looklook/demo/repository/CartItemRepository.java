package com.looklook.demo.repository;

import com.looklook.demo.domain.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    CartItem findByCartIdAndItemId(Long cartId, Long itemId);

    CartItem findByItemId(Long pid);

    // 같은 상품에 색상, 사이즈 옵션까지 같은 경우를 찾기 위함 (cartItem 새로 추가가 아니라 기존의 수량 증가시키기)
    Optional<CartItem> findByItemIdAndColorAndSizeAndCartId(Long pid, String color, String size, Long CartId);

    // 장바구니 아이디로 모든 장바구니 아이템 불러오기
    List<CartItem> findAllByCartId(Long cartId);

    // 장바구니 아이템 아이디로 장바구니 아이템 불러오기

    Optional<CartItem> findById(Long cartItemId);

    void deleteById(Long cartItemId);

}
