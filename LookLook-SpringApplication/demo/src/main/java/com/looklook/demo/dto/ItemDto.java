package com.looklook.demo.dto;

import com.looklook.demo.domain.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ItemDto {
    private Long pid;
    private String itemName;
    private int price;
    private ItemSellStatus itemSellStatus;
    private List<String> size;
    private List<String> color;
    private String pgender;
    private String category;
    private String itemDetail;

}
