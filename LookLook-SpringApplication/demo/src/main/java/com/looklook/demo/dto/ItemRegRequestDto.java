package com.looklook.demo.dto;

import com.looklook.demo.domain.ItemColor;
import com.looklook.demo.domain.Item;
import com.looklook.demo.domain.ItemSize;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.modelmapper.ModelMapper;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@ToString
public class ItemRegRequestDto {
    private String itemName;
    private Integer price;
    private String pgender;
    private String itemDetail;
    private List<String> size;
    private List<String> color;
    private String category;
    private Long uid;
    private MultipartFile mainImg;
    private List<MultipartFile> detailImgs;

    // dto -> Entity (suran)
    public Item toEntity(ItemRegRequestDto dto) {
        Item item = new Item();
        item.setItemName(dto.getItemName());
        item.setPrice(dto.getPrice());

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
}