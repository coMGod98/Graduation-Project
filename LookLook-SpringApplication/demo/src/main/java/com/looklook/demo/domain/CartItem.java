package com.looklook.demo.domain;

import com.looklook.demo.dto.CartItemDto;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Table(name="cart_item")
@Getter @Setter
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_item_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="cart_id")
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="pid")
    private Item item;

    private int count;

    // 프론트로 사이즈와 색상 보낼 때, id를 보내지 않아서... 일단 문자열로 처리
    private String size;

    private String color;

    public void addCount(int count) {
        this.count+=count;
    }

    public CartItemDto toCartItemDto(CartItem cartItem) {
        CartItemDto dto = new CartItemDto();
        dto.setCartItemId(cartItem.getId());
        dto.setItemName(cartItem.getItem().getItemName());
        dto.setSize(cartItem.getSize());
        dto.setColor(cartItem.getColor());
        dto.setCount(cartItem.getCount());
        dto.setPrice(cartItem.getItem().getPrice());
        return dto;
    }

    // 장바구니에서 상품 주문 시 장바구니 상품이 주문 상품으로 변경
    // 아직 상품 주문 전이므로, orderStatus는 자동으로 false
    public OrderItem toOrderItem(CartItem cartItem) {
        OrderItem orderItem = new OrderItem();
        // 연관된 상품 엔티티, 구매 개수, 구매 옵션(색상, 사이즈), 구매상태 세팅
        orderItem.setItem(cartItem.getItem());
        orderItem.setCount(cartItem.getCount());
        orderItem.setColor(cartItem.getColor());
        orderItem.setSize(cartItem.getSize());
        orderItem.setOrderStatus(OrderStatus.INCOMPLETED);
        return orderItem;
    }




    public static CartItem createCartItem(Cart cart, Item item, int count) {
        CartItem cartItem=new CartItem();
        cartItem.setCart(cart);
        cartItem.setItem(item);
        cartItem.setCount(count);
        return cartItem;
    }



    //수량 변경 메소드
    public void updateCount(int count) {
        this.count=count;
    }
}
