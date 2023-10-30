package com.looklook.demo.dto;

import com.looklook.demo.domain.ItemColor;
import com.looklook.demo.domain.ItemSellStatus;
import com.looklook.demo.domain.Item;
import com.looklook.demo.domain.ItemSize;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.modelmapper.ModelMapper;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter @Setter
@ToString
public class ItemRegRequestDto {
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
    @NotBlank
    private List<String> size;
    @NotBlank
    private List<String> color;
    @NotNull(message = "상품 카테고리는 필수 선택 값입니다.")
    private String category;

    private Long uid;

//    private ItemSellStatus itemSellStatus;  // 삭제 필요

    // 상품 수정 시 사용되는 멤버변수들
    private List<ItemImgDto> itemImgDtoList = new ArrayList<>();
    private List<Long> itemImgIds = new ArrayList<>();


    // dto -> Entity (suran)
    public Item toEntity(ItemRegRequestDto dto) {
        Item item = new Item();
        item.setItemName(dto.getItemName());
        item.setPrice(dto.getPrice());
        item.setStock(dto.getStock());

        // size 배열
        List<String> sizeStrings = dto.getSize();
        List<ItemSize> sizeResult = new ArrayList<>();

        for (String sizeString : sizeStrings) {
            ItemSize itemSize = new ItemSize();
            itemSize.setSizeName(sizeString);
            sizeResult.add(itemSize);
        }
        item.setSizes(sizeResult);

        // color 배열
        List<String> colorStrings = dto.getColor();
        List<ItemColor> colorResult = new ArrayList<>();

        for (String colorString : colorStrings) {
            ItemColor itemColor = new ItemColor();
            itemColor.setColor(colorString);
            colorResult.add(itemColor);
        }
        item.setColors(colorResult);

        item.setCategory(dto.getCategory());
        item.setPgender(dto.getPgender());
        item.setItemDetail(getItemDetail());

        return item;
    }

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