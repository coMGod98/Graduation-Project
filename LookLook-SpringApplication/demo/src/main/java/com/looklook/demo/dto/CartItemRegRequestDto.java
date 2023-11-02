package com.looklook.demo.dto;

import com.looklook.demo.domain.Cart;
import com.looklook.demo.domain.CartItem;
import com.looklook.demo.domain.Item;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CartItemRegRequestDto {
    private Long pid;
    private String size;
    private String color;
    private int count;

    public CartItem toEntity(CartItemRegRequestDto dto, Cart cart, Item item) {
        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setSize(dto.getSize());
        cartItem.setColor(dto.getColor());
        cartItem.setCount(dto.getCount());
        cartItem.setItem(item);
        return cartItem;
    }
}
