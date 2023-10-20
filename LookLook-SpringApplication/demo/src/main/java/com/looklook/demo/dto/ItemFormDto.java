package com.looklook.demo.dto;

import com.looklook.demo.dto.ItemSellStatus;
import com.looklook.demo.domain.Item;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class ItemFormDto {

    private Long id;

    @NotBlank(message = "상품명 필수 입력")
    private String itemName;

    @NotNull(message = "가격 필수 입력 값.")
    private Integer price;

    @NotBlank(message = "상품 상세 필수 입력")
    private String itemDetail;

    @NotNull(message = "재고 필수 입력")
    private Integer stock;

    private ItemSellStatus itemSellStatus;

    // 상품 수정 시 사용되는 멤버변수들
    private List<ItemImgDto> itemImgDtoList = new ArrayList<>();
    private List<Long> itemImgIds = new ArrayList<>();

    private static ModelMapper modelMapper = new ModelMapper();

    // DTO -> Entity
    public Item createItem(){
        return modelMapper.map(this, Item.class);
    }

    // Entity -> DTO
    public static ItemFormDto of(Item item){
        return modelMapper.map(item,ItemFormDto.class);
    }
}