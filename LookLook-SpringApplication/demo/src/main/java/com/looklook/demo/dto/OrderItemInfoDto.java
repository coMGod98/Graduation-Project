package com.looklook.demo.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class OrderItemInfoDto {
    /*
    * 주문서 작성 페이지나 주문 내역 조회 페이지에서 OrderItem 객체를 보내주면 연관관계 때문에 상품 정보 로드가 안된다..
    * 해결 방법을 못찾아서 주문상품정보에 관한 dto를 새롭게 구성하고
    * OrderSheetResponseDto, OrderInfoDto에 추가하여 보낸다.
    * */

    // OrderItem에서 가져와야함
    private Long orderItemId;
    private int count;
    private String size;
    private String color;

    // Item에서 가져와야함
    private String ItemName;
    private Long pid;
    private int price;
    private String mainImgUrl;
    private String detailedImgsUrl;
}

