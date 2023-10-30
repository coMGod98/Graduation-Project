package com.looklook.demo.dto;

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
public class ItemRegRequestDto {

    private Long id;

    @NotBlank(message = "상품명은 필수 입력 값입니다.")
    private String itemName;

    @NotNull(message = "가격은 필수 입력 값입니다.")
    private Integer price;

    @NotNull(message = "재고는 필수 입력 값입니다.")
    private Integer stock;
    @NotBlank
    private String pgender;
    @NotBlank(message = "상품 상세는 필수 입력 값입니다.")
    private String itemDetail;

    // 대표 이미지

    // 상세 이미지
    @NotBlank(message = "상품 크기는 필수 입력 값입니다.")
    private List<String> size;

    @NotBlank(message = "상품 색상은 필수 입력 값입니다.")
    private List<String> color;


    @NotNull(message = "상품 카테고리는 필수 선택 값입니다.")
    private String category;

    @NotBlank
    private String uid;

//    private ItemSellStatus itemSellStatus;  // 삭제 필요

    // 상품 수정 시 사용되는 멤버변수들
    private List<ItemImgDto> itemImgDtoList = new ArrayList<>();
    private List<Long> itemImgIds = new ArrayList<>();

    private static ModelMapper modelMapper = new ModelMapper();

    // DTO -> Entity
    public Item createItem(){
        return modelMapper.map(this, Item.class);
    }

    // Entity -> DTO
    public static ItemRegRequestDto of(Item item){
        return modelMapper.map(item, ItemRegRequestDto.class);
    }
}