package com.looklook.demo.domain;

//import com.looklook.demo.dto.ItemFormDto;
import com.looklook.demo.dto.ItemDto;
import com.looklook.demo.dto.ItemFormDto;
import com.looklook.demo.exception.OutOfStockException;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "item")
@Getter @Setter
@ToString
public class Item extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String itemName;
    private int price;
    private int stock;
    @Enumerated(EnumType.STRING)
    private ItemSellStatus itemSellStatus;

    private LocalDateTime regTime;
    private LocalDateTime updateTime;
    private String category;

    private String size;

    private String color;

    private String pgender;

    private String itemDetail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UID")
    private LookLookUser user;


    public ItemDto of(Item item) {
        ItemDto dto = new ItemDto();
        dto.setPid(item.getId());
        dto.setItemName(item.getItemName());
        dto.setPrice(item.getPrice());
        dto.setItemDetail(item.getItemDetail());
        dto.setSize(item.getSize());
        dto.setColor(item.getColor());
        dto.setPgender(item.getPgender());
        dto.setCategory(item.getCategory());
        dto.setItemDetail(item.getItemDetail());
        return dto;
    }

    public void updateItem(ItemFormDto itemFormDto) {
        this.itemName = itemFormDto.getItemName();
        this.category=itemFormDto.getCategory();
        this.color=itemFormDto.getColor();
        this.itemDetail = itemFormDto.getItemDetail();
        this.stock = itemFormDto.getStock();
        this.itemSellStatus = itemFormDto.getItemSellStatus();
        this.pgender=itemFormDto.getPgender();
        this.price=itemFormDto.getPrice();
        this.size=itemFormDto.getSize();
    }

    public void removeStock(int stock) {

        int restStock = this.stock - stock;
        if (restStock < 0) {
            throw new OutOfStockException("상품의 재고가 부족합니다. (현재 재고 수량: " + this.stock + ")");
        }
        this.stock = restStock;
    }

    //주문 취소할때
    public void addStock(int stock) {
        this.stock += stock;
    }

}