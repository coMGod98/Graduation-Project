package com.looklook.demo.service;

import com.looklook.demo.domain.Item;
import com.looklook.demo.domain.ItemImg;
import com.looklook.demo.dto.*;
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
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ItemService {

    private final ItemRepository itemRepository;
    private final ItemImgService itemImgService;
    private final ItemImgRepository itemImgRepository;

    //등록하기
    public Long saveItem(ItemRegRequestDto itemRegRequestDto,
                         List<MultipartFile> itemImgFileList) throws Exception {

        //상품 등록
        Item item = itemRegRequestDto.createItem();
        itemRepository.save(item);

        // 이미지 등록
        for (int i = 0; i < itemImgFileList.size(); i++) {
            ItemImg itemimg = new ItemImg();
            itemimg.setItem(item);
            if (i == 0) {
                itemimg.setRepImgYn("Y");
            } else{
                itemimg.setRepImgYn("N");
            }
            itemImgService.saveItemImg(itemimg, itemImgFileList.get(i));
        }
        return item.getId();

    }




    //상품 데이터를 읽어오는 트랜잭션을 읽기 전용으로 설정
    //상품의 이미지를 아이디 오름차순으로 조회하고 조회한 itemImg 엔티티를 itemImgDto 객체로 만들어 리스트에 추가
    //상품 아이디가 존재하지 않을 땐 EntityNotFoundException 발생
    @Transactional(readOnly = true)
    public ItemRegRequestDto getItemDetail(Long itemId) {

        // 상품 이미지 엔티티들을 itemImgDto 객체로 변환하여 itemImgDtoList 에 담음
        List<ItemImg> itemImgList = itemImgRepository.findByItemIdOrderByIdAsc(itemId);
        List<ItemImgDto> itemImgDtoList = new ArrayList<>();

        for (ItemImg itemImg : itemImgList) {
            ItemImgDto itemImgDto = ItemImgDto.of(itemImg);
            itemImgDtoList.add(itemImgDto);
        }

        // 상품 엔티티를 ItemFormDto 객체로 변환하고 itemImgDtoList 멤버변수를 초기화
        Item item = itemRepository.findById(itemId).orElseThrow(EntityNotFoundException::new);
        ItemRegRequestDto itemRegRequestDto = ItemRegRequestDto.of(item);
        itemRegRequestDto.setItemImgDtoList(itemImgDtoList);
        return itemRegRequestDto;

    }


    public Long updateItem(ItemRegRequestDto itemRegRequestDto, List<MultipartFile> itemImgFileList) throws Exception {

        // 상품 수정
        Item item = itemRepository.findById(itemRegRequestDto.getId())
                .orElseThrow(EntityNotFoundException::new);
        item.updateItem(itemRegRequestDto);
        // 상품 이미지 수정
        List<Long> itemImgIds = itemRegRequestDto.getItemImgIds();

        if (itemImgFileList.size() != itemImgIds.size()) {
            throw new IllegalArgumentException("itemImgFileList size and itemImgIds size do not match.");
        }

        //수정한 이미지 등록
        for (int i = 0; i < itemImgFileList.size(); i++) {
            itemImgService.updateItemImg(itemImgIds.get(i), itemImgFileList.get(i));
        }   //updateItemImg() 메소드에 상품 이미지 아이디와 상품 이미지 파일 정보 파라미터로 전달

        return item.getId();
    }

    //등록한 상품 삭제
    public void deleteItem(Long itemId) {
        Item item=itemRepository.findById(itemId)
                .orElseThrow(EntityNotFoundException::new);
        itemRepository.delete(item);

        //관련 이미지 삭제
        List<ItemImg> itemImgList = itemImgRepository.findByItemIdOrderByIdAsc(itemId);
        for (ItemImg itemImg : itemImgList) {
            itemImgRepository.delete(itemImg);
        }
    }

    //관리자 상품 정보 조회
    //ItemService 클래스에 상품 조회 조건과 페이지 정보를 파라미터로 받아서 상품 데이터 조회하는 getAdminItemPage() 메소드 추가
    @Transactional(readOnly = true)
    public Page<Item> getAdminItemPage(ItemSearchDto itemSearchDto, Pageable pageable) {
        return itemRepository.getAdminItemPage(itemSearchDto, pageable);
    }

    // 메인 페이지 상품 목록 조회
    @Transactional(readOnly = true)
    public Page<MainItemDto> getMainItemPage(ItemSearchDto itemSearchDto, Pageable pageable){
        return itemRepository.getMainItemPage(itemSearchDto, pageable);
    }
}