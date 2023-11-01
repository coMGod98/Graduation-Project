package com.looklook.demo.service;

import com.looklook.demo.domain.ItemImg;
//import com.looklook.demo.service.ItemImgService;
import com.looklook.demo.dto.ItemRegRequestDto;
//import com.looklook.demo.dto.ItemSearchDto;
//import com.looklook.demo.dto.MainItemDto;
import com.looklook.demo.domain.Item;
//import com.looklook.demo.dto.ItemSearchDto;
import com.looklook.demo.dto.ItemSearchDto;
import com.looklook.demo.repository.ItemImgRepository;
import com.looklook.demo.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ItemService {

    private final ItemRepository itemRepository;
    private final ItemImgService itemImgService;
    private final ItemImgRepository itemImgRepository;

    // 상품 등록
    public Long saveItem(ItemRegRequestDto itemRegRequestDto,
                         List<MultipartFile> itemImgFileList) throws Exception {

        // 상품 등록
        Item item = itemRegRequestDto.createItem();
        itemRepository.save(item);

        // 이미지 등록
//        for (int i = 0; i < itemImgFileList.size(); i++) {
//            ItemImg itemimg = new ItemImg();
//            itemimg.setItem(item);
//            if (i == 0) {
//                itemimg.setRepImgYn("Y");
//            } else{
//                itemimg.setRepImgYn("N");
//            }
//            itemImgService.saveItemImg(itemimg, itemImgFileList.get(i));
//        }
        return item.getId();

    }

    // 상품 관리 페이지 상품 목록 조회
//    @Transactional(readOnly = true)
//    public Page<Item> getAdminItemPage(ItemSearchDto itemSearchDto, Pageable pageable) {
//        return itemRepository.getAdminItemPage(itemSearchDto, pageable);
//    }

//    // 상품 조회
//    @Transactional(readOnly = true)
//    public ItemFormDto getItemDetail(Long itemId) {
//
//        // 상품 이미지 엔티티들을 itemImgDto 객체로 변환하여 itemImgDtoList 에 담음
//        List<ItemImg> itemImgList = itemImgRepository.findByItemIdOrderByIdAsc(itemId);
//        List<ItemImgDto> itemImgDtoList = new ArrayList<>();
//
//        for (ItemImg itemImg : itemImgList) {
//            ItemImgDto itemImgDto = ItemImgDto.of(itemImg);
//            itemImgDtoList.add(itemImgDto);
//        }
//
//        // 상품 엔티티를 ItemFormDto 객체로 변환하고 itemImgDtoList 멤버변수를 초기화
//        Item item = itemRepository.findById(itemId).orElseThrow(EntityNotFoundException::new);
//
//        ItemFormDto itemFormDto = ItemFormDto.of(item);
//        itemFormDto.setItemImgDtoList(itemImgDtoList);
//        return itemFormDto;
//
//    }


//    public Long updateItem(ItemRegRequestDto itemRegRequestDto, List<MultipartFile> itemImgFileList) throws IOException {
//
//        // 상품 수정
//        Item item=itemRepository.findById(itemRegRequestDto.getId())
//                .orElseThrow(EntityNotFoundException::new);
//        item.updateItem(itemRegRequestDto);
//
//        // 상품 이미지 수정
//        List<Long> itemImgIds = itemRegRequestDto.getItemImgIds();
//        for (int i = 0; i < itemImgFileList.size(); i++) {
//            itemImgService.updateItemImg(itemImgIds.get(i), itemImgFileList.get(i));
//        }
//
//        return item.getId();
//    }

//    // 메인 페이지 상품 목록 조회
//    @Transactional(readOnly = true)
//    public Page<MainItemDto> getMainItemPage(ItemSearchDto itemSearchDto, Pageable pageable){
//        return itemRepository.getMainItemPage(itemSearchDto, pageable);
//    }
}