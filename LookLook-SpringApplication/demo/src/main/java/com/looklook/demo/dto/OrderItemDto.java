package com.looklook.demo.dto;

import com.looklook.demo.domain.OrderItem;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class OrderItemDto {

//    public OrderItemDto(OrderItem orderItem, String imgUrl) {
//        this.itemName=orderItem.getItem().getItemName();
//        this.count=orderItem.getCount();
//        this.orderPrice=orderItem.getOrderPrice();
//        this.imgUrl=imgUrl;
//
//    }

    private String itemName;
    private int count;
    private int orderPrice;
    private String imgUrl;
}
