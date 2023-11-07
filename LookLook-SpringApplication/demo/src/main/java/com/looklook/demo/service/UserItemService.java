package com.looklook.demo.service;

import com.looklook.demo.domain.*;
import com.looklook.demo.dto.ItemDto;
import com.looklook.demo.repository.ItemImgRepository;
import com.looklook.demo.repository.ItemRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserItemService {
    private final ItemRepository itemRepository;
    private final ItemImgRepository itemImgRepository;

    // 카테고리별 아이템 조회
    // 101(여자 셔츠/블라우스)로 조회하면 해당 카테고리의 아이템 리스트를 dto 리스트로 반환
    @Transactional
    public List<ItemDto> getItemsByCategory(String category) {
        Optional<List<Item>> optionalItems = itemRepository.findByCategory(category);

        List<Item> items = optionalItems.orElseThrow(() -> new RuntimeException("해당 카테고리에 상품이 없습니다."));

        // 메인 이미지 리스트를 만들고 dto에 직접 설정
        List<String> mainImgUrl = new ArrayList<>();
        List<String> detailedImgUrl = new ArrayList<>();

        for (Item item : items) {
            ItemImg main = itemImgRepository.findByItemIdAndRepresent(item.getId(), ImgStatus.main);

            String originalPath = main.getFilePath();
            String extractedPath = originalPath.substring(originalPath.indexOf("/img"));
            mainImgUrl.add(extractedPath);

            List<ItemImg> detailed = itemImgRepository.findAllByItemIdAndRepresent(item.getId(), ImgStatus.detailed);
            List<String> detailedUrlList = new ArrayList<>();
            for (ItemImg img : detailed) {
                String detailedOriginalPath = img.getFilePath();
                String detailedExtractedPath = originalPath.substring(detailedOriginalPath.indexOf("/img"));
                detailedUrlList.add(detailedExtractedPath);
            }
            detailedImgUrl.add(String.valueOf(detailedUrlList));
        }

        List<ItemDto> results = items.stream()
                .map(item -> item.toItemDto(item, null, null))
                .collect(Collectors.toList());

        for (ItemDto dto : results) {
            for (String mainUrl : mainImgUrl) {
                dto.setMainImgUrl(mainUrl);
            }
            for (String detailedUrl : detailedImgUrl) {
                dto.setDetailedImgsUrl(Collections.singletonList(detailedUrl));
            }
        }

        return results;
    }

    // 상품 아이디로 상품 조회
    @Transactional
    public ItemDto getItemByPid(Long id) {
        Optional<Item> optionalItem = itemRepository.findById(id);

        if (optionalItem.isPresent()){
            //Optional 벗기기
            Item item = optionalItem.get();

            // 해당 id의 상품이 비어있지 않으면, 어떤 사이즈를 가지고 있는지 조회
            List<ItemSize> sizes = item.getSizes();

            List<String> sizeResult = sizes.stream()
                        .map(ItemSize::getSizeName)
                        .collect(Collectors.toList());

            // 해당 id의 상품이 비어있지 않으면, 어떤 색상을 가지고 있는지 조회
            List<ItemColor> colors = item.getColors();

            List<String> colorResult = colors.stream()
                    .map(ItemColor::getColor) // ItemSize 엔티티의 사이즈 이름 필드
                    .collect(Collectors.toList());

            ItemDto result = item.toItemDto(item, sizeResult, colorResult);

            ItemImg main = itemImgRepository.findByItemIdAndRepresent(item.getId(), ImgStatus.main);

            String originalPath = main.getFilePath();
            String extractedPath = originalPath.substring(originalPath.indexOf("/img"));
            result.setMainImgUrl(extractedPath);

            List<String> detailedImgUrl = new ArrayList<>();

            List<ItemImg> detailed = itemImgRepository.findAllByItemIdAndRepresent(item.getId(), ImgStatus.detailed);

            for (ItemImg img : detailed) {
                String detailedOriginalPath = img.getFilePath();
                String detailedExtractedPath = originalPath.substring(detailedOriginalPath.indexOf("/img"));
                detailedImgUrl.add(detailedExtractedPath);
            }
            result.setDetailedImgsUrl(detailedImgUrl);

            return result;
        }
        else {
            throw new RuntimeException("상품 정보 없습니다.");
        }
    }

    // 상품별 보유 사이즈 조회
    public Optional<Item> getItemSizesByPid(Long pid) {
        return itemRepository.findById(pid);
    }

    // 상품별 보유 색상 조회
    public Optional<Item> getItemColorsByPid(Long pid){
        return itemRepository.findById(pid);
    }
}