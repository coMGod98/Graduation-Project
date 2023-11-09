package com.looklook.demo.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class CartItemDto {

    private Long cartItemId;
    private String itemName;
    private String size;
    private String color;
    private int count;
    private int price;
    private String mainImgUrl;
}


