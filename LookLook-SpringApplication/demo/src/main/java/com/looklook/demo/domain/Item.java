package com.looklook.demo.domain;

//import com.looklook.demo.dto.ItemFormDto;
import com.looklook.demo.dto.ItemDto;
import com.looklook.demo.dto.ItemRegRequestDto;
import com.looklook.demo.dto.SellerItemDto;
import com.looklook.demo.exception.OutOfStockException;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@ToString
@Table(name = "item")
public class Item extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique=true)
    private String itemName;
    private int price;
    private int stock;
    @Enumerated(EnumType.STRING)
    private ItemSellStatus itemSellStatus;
    @PrePersist
    public void prePersist() {
        this.regTime = LocalDateTime.now();
    }
    private LocalDateTime regTime;

    //private LocalDateTime updateTime;
    private String size; // 삭제 필요
    private String category;
    private String color; // 삭제 필요
    private String pgender;
    private String itemDetail;
    @JoinColumn(name="product_id")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemSize> sizes;
    @JoinColumn(name="product_id")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemColor> colors;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UID")
    private LookLookUser user;

    @OneToMany(
            mappedBy = "item",
            cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
            orphanRemoval = true
    )
    private List<ItemImg> imgs = new ArrayList<>();


    // 상품 엔티티를 Dto로 변환
    public ItemDto toItemDto(Item item, List<String> sizes, List<String> colors) {
        ItemDto dto = new ItemDto();
        dto.setPid(item.getId());
        dto.setItemName(item.getItemName());
        dto.setPrice(item.getPrice());
        dto.setItemDetail(item.getItemDetail());
        dto.setSize(sizes);
        dto.setColor(colors);
        dto.setPgender(item.getPgender());
        dto.setCategory(item.getCategory());
        dto.setPrice(item.getPrice());
        dto.setItemSellStatus(item.getItemSellStatus());
        dto.setItemDetail(item.getItemDetail());
        dto.setStock(item.getStock());
        return dto;
    }

    public SellerItemDto toSellerItemDto(Item item, List<String> sizes, List<String> colors) {
        SellerItemDto dto = new SellerItemDto();
        dto.setPid(item.getId());
        dto.setItemName(item.getItemName());
        dto.setPrice(item.getPrice());
        dto.setItemDetail(item.getItemDetail());
        dto.setSize(sizes);
        dto.setRegTime(item.regTime);
        dto.setStock(item.getStock());
        dto.setColor(colors);
        dto.setPgender(item.getPgender());
        dto.setCategory(item.getCategory());
        dto.setItemSellStatus(item.getItemSellStatus());
        dto.setItemDetail(item.getItemDetail());
        return dto;
    }

    public void updateItem(ItemRegRequestDto itemRegRequestDto) {
        this.itemName = itemRegRequestDto.getItemName();
        this.category= itemRegRequestDto.getCategory();
//        this.color= itemRegRequestDto.getColor();
        this.itemDetail = itemRegRequestDto.getItemDetail();
        this.stock = itemRegRequestDto.getStock();
//        this.itemSellStatus = itemRegRequestDto.getItemSellStatus();
        this.pgender= itemRegRequestDto.getPgender();
        this.price= itemRegRequestDto.getPrice();
//        this.size= itemRegRequestDto.getSize();
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