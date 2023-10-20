package com.looklook.demo.repository;

import com.looklook.demo.domain.Item;
import com.looklook.demo.dto.ItemSearchDto;
import com.looklook.demo.dto.MainItemDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ItemRepositoryCustom {

    Page<Item> getAdminItemPage(ItemSearchDto itemSearchDto, Pageable pageable);

    // @QueryProjection 을 이용하여 바로 Dto 객체 반환
    //Page<MainItemDto> getMainItemPage(ItemSearchDto itemSearchDto, Pageable pageable);
}
