package com.looklook.demo.dto;

import com.querydsl.core.annotations.QueryProjection;

public class MainItemDto {
    private Long id;
    private String itemName;
    private String category;
    private String itemDetail;
    private String imgUrl;
    private Integer price;

    @QueryProjection
    public MainItemDto(Long id, String itemName,String category, String itemDetail,
                       String imgUrl, Integer price) {
        this.id=id;
        this.itemName=itemName;
        this.category=category;
        this.itemDetail=itemDetail;
        this.imgUrl=imgUrl;
        this.price=price;
    }
}
