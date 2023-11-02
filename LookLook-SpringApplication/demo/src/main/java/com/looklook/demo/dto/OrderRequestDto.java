package com.looklook.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class OrderRequestDto {
    private String newAddress; // 새로운 주소 등록 시 사용, 없으면 빼기
    private List<Long> orderItemIds; // 주문하려는 상품 아이디를 배열로
    // 예시
    //    {
    //        "orderItemIds": [1, 2, 3]
    //    }
    private String paymentMethod; // 카드정보
    private String paymentType; // 일시불, 할부
}
