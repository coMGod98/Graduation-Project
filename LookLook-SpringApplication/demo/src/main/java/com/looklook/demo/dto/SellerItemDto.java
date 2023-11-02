package com.looklook.demo.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SellerItemDto {
    private Long pid;
    private String itemName;
    private int price;
    private LocalDateTime regTime;
    private int stock;
    private List<String> size;
    private List<String> color;
    private String pgender;
    private String category;
    private String itemDetail;
}
