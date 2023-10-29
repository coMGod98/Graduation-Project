package com.looklook.demo.dto;

import com.looklook.demo.domain.Item;
import com.looklook.demo.domain.LookLookUser;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ItemDto {
    private Long pid;
    private String itemName;
    private int price;

    private String itemSellStatus;
    private String size;
    private String color;
    private String pgender;
    private String category;
    private String itemDetail;

}
