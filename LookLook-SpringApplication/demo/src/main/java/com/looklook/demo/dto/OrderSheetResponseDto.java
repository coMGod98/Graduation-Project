package com.looklook.demo.dto;

import com.looklook.demo.domain.OrderItem;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class OrderSheetResponseDto {
    /*
    * 1. 배송정보 (이름, 연락처, DB에 저장된 사용자 주소)
    * 2. orderItems
    * 3. 결제 금액 (상품 가격, 배송비 포함 총 가격)
    *
    * cf) 위 3가지에 배송정보, 결제 정보(결제 수단, 타입) 업데이트해서 주문할 떄 OrderRequest로 구성하기
    * */
    private String userName;
    private String phoneNumber;
    private String address;
    private List<OrderItemInfoDto> orderiteminfo;
    private final int SHIPMENT_FEE = 2500;
    private int orderItemPrice;  // 배송비 뺀 상품 가격
    private int totalPrice; // 배송비 포함 상품 가격

}
