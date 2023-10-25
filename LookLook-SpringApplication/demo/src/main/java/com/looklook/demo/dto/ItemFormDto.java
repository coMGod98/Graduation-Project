package com.looklook.demo.dto;

import com.looklook.demo.domain.Category;
import com.looklook.demo.dto.ItemImgDto;
import com.looklook.demo.domain.ItemSellStatus;
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

    @NotBlank(message = "상품명은 필수 입력 값입니다.")
    private String itemName;

    @NotNull(message = "가격은 필수 입력 값입니다.")
    private Integer price;

    @NotBlank(message = "상품 상세는 필수 입력 값입니다.")
    private String itemDetail;

    @NotNull(message = "재고는 필수 입력 값입니다.")
    private Integer stock;

    @NotNull(message = "상품 카테고리는 필수 선택 값입니다.")
    private Category category;

    @NotBlank
    private String color;

    @NotBlank
    private String pgender;

    @NotBlank
    private String size;

    @NotBlank
    private String uid;

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
        return modelMapper.map(item, ItemFormDto.class);
    }
}