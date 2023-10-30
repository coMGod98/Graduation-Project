package com.looklook.demo.dto;

import com.looklook.demo.domain.ItemSellStatus;
import lombok.Getter;
import lombok.Setter;

//상품 조회 dto
@Getter
@Setter
public class ItemSearchDto {

    private String searchDateType;
    private ItemSellStatus searchSellStatus;    //상품 판매상태 기준으로 상품 데이터 조회
    private String searchBy;        //상품 조회시 어떤 유형으로 조회할지 선택(상품명, 상품 등록자 아이디 넣을 예정)
    private String searchQuery = "";    //조회할 검색어 저장할 변수
    //private String searchItemCategory;  //카테고리 기준으로 상품 데이터 조회
}
