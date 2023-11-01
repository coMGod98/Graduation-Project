package com.looklook.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderSheetRequestDto {
    // 장바구니 통해 구매하는거라면 cartItemId만 보내주면 됨
    // 예시
    //    {
    //        "cartItemId": [1, 2, 3]
    //    }
    private List<Long> cartItemIds;


    // 상품 상세 페이지에서 구매하는 거라면 cartItemId는 비우고, 상품 id, 사이즈, 색상, 수량 필요
    private Long pid;
    private String size;
    private String color;
    private int count;
}
