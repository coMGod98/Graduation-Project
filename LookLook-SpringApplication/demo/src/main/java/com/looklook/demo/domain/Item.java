package com.looklook.demo.domain;

import com.looklook.demo.dto.ItemDto;
import com.looklook.demo.dto.ItemRegRequestDto;
import com.looklook.demo.dto.SellerItemDto;
import com.looklook.demo.exception.OutOfStockException;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@ToString
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique=true)
    private String itemName;
    private int price;

    @PrePersist
    public void prePersist() {
        if (this.regTime == null) {
            this.regTime = LocalDateTime.now();
        }
    }

    // 판매자가 해당 상품을 등록한 날짜
    @Column(name="reg_time")
    private LocalDateTime regTime;
    private String category;
    private String pgender;
    private String itemDetail;
    @JoinColumn(name="product_id")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemSize> sizes;
    @JoinColumn(name="product_id")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemColor> colors;

    @OneToMany(mappedBy = "item")
    private List<OrderItem> orderItems;

    @OneToMany(mappedBy = "item")
    private List<CartItem> cartItems;

    // 해당 상품을 등록한 판매자의 uid
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
        dto.setItemDetail(item.getItemDetail());
        dto.setRegTime(this.regTime);


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
        dto.setColor(colors);
        dto.setPgender(item.getPgender());
        dto.setCategory(item.getCategory());
        dto.setItemDetail(item.getItemDetail());
        return dto;
    }
    public void addItemImg(ItemImg itemImg) {
        this.imgs.add(itemImg);

        // 게시글에 파일이 저장되어있지 않은 경우
        if(itemImg.getItem() != this)
            // 파일 저장
            itemImg.setItem(this);
    }
}