package com.looklook.demo.service;

import com.looklook.demo.domain.*;
import com.looklook.demo.dto.ItemDto;
import com.looklook.demo.repository.ItemImgRepository;
import com.looklook.demo.repository.ItemRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.File;
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
            if (main != null) {
                String originalPath = main.getFilePath();
                String extractedPath = originalPath.substring(originalPath.indexOf(File.separator + "img"));
                mainImgUrl.add(extractedPath);
            } else {
                // 해당 상품 이미지가 없을 때 메세지 설정
                mainImgUrl.add("해당 상품 이미지가 없습니다");
            }

            ItemImg detailed = itemImgRepository.findByItemIdAndRepresent(item.getId(), ImgStatus.detailed);
            if (detailed != null) {
                String detailedOriginalPath = detailed.getFilePath();
                String detailedExtractedPath = detailedOriginalPath.substring(detailedOriginalPath.indexOf(File.separator + "img"));
                detailedImgUrl.add(detailedExtractedPath);
            } else {
                // 해당 상품 이미지가 없을 때 메세지 설정
                detailedImgUrl.add("해당 상품 이미지가 없습니다");
            }
        }

        List<ItemDto> results = items.stream()
                .map(item -> item.toItemDto(item, null, null))
                .collect(Collectors.toList());

        for (int i = 0; i < results.size(); i++) {
            if (i < mainImgUrl.size()) {
                results.get(i).setMainImgUrl(mainImgUrl.get(i));
            }
            if (i < detailedImgUrl.size()) {
                results.get(i).setDetailedImgsUrl(detailedImgUrl.get(i));
            }
        }

        return results;
    }

    // 상품 아이디로 상품 조회
    @Transactional
    public ItemDto getItemByPid(Long id) {
        Optional<Item> optionalItem = itemRepository.findById(id);

        if (optionalItem.isPresent()) {
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
            if (main != null) {
                String originalPath = main.getFilePath();
                String extractedPath = originalPath.substring(originalPath.indexOf(File.separator + "img"));
                result.setMainImgUrl(extractedPath);
            } else {
                result.setMainImgUrl("상품 이미지가 없습니다");
            }

            ItemImg detailed = itemImgRepository.findByItemIdAndRepresent(item.getId(), ImgStatus.detailed);
            if (detailed != null) {
                String detailedOriginalPath = detailed.getFilePath();
                String detailedExtractedPath = detailedOriginalPath.substring(detailedOriginalPath.indexOf(File.separator + "img"));
                result.setDetailedImgsUrl(detailedExtractedPath);

            } else {
                result.setDetailedImgsUrl("상품 이미지가 없습니다");
            }

            return result;
        } else {
            throw new RuntimeException("상품 정보 없습니다.");
        }
    }

    // 검색어로 조회
    @Transactional
    public List<ItemDto> searchItem(String itemName) {
        List<Item> items = itemRepository.findByItemName(itemName);
        List<ItemDto> results = items.stream()
                .map(item -> item.toItemDto(item, null, null))
                .collect(Collectors.toList());

        List<String> mainImgUrl = new ArrayList<>();
        List<String> detailedImgUrl = new ArrayList<>();

        for (Item item : items) {
            ItemImg main = itemImgRepository.findByItemIdAndRepresent(item.getId(), ImgStatus.main);
            if (main != null) {
                String originalPath = main.getFilePath();
                String extractedPath = originalPath.substring(originalPath.indexOf(File.separator + "img"));
                mainImgUrl.add(extractedPath);
            } else {
                // 해당 상품 이미지가 없을 때 메세지 설정
                mainImgUrl.add("해당 상품 이미지가 없습니다");
            }
            ItemImg detailed = itemImgRepository.findByItemIdAndRepresent(item.getId(), ImgStatus.detailed);
            if (detailed != null) {
                String detailedOriginalPath = detailed.getFilePath();
                String detailedExtractedPath = detailedOriginalPath.substring(detailedOriginalPath.indexOf(File.separator + "img"));
                detailedImgUrl.add(detailedExtractedPath);
            } else {
                // 해당 상품 이미지가 없을 때 메세지 설정
                detailedImgUrl.add("해당 상품 이미지가 없습니다");
            }
        }

        for (int i = 0; i < results.size(); i++) {
            if (i < mainImgUrl.size()) {
                results.get(i).setMainImgUrl(mainImgUrl.get(i));
            }
            if (i < detailedImgUrl.size()) {
                results.get(i).setDetailedImgsUrl(detailedImgUrl.get(i));
            }
        }

        return results;
    }

    // 메인 페이지에서 추천상품 4개
    @Transactional
    public List<ItemDto> showRecommendedProducts() {
        List<Item> items = itemRepository.findTop4ByOrderByIdAsc();

        List<ItemDto> results = items.stream()
                .map(item -> item.toItemDto(item, null, null))
                .collect(Collectors.toList());

        List<String> mainImgUrl = new ArrayList<>();
        List<String> detailedImgUrl = new ArrayList<>();

        for (Item item : items) {
            ItemImg main = itemImgRepository.findByItemIdAndRepresent(item.getId(), ImgStatus.main);
            if (main != null) {
                String originalPath = main.getFilePath();
                String extractedPath = originalPath.substring(originalPath.indexOf(File.separator + "img"));
                mainImgUrl.add(extractedPath);
            } else {
                // 해당 상품 이미지가 없을 때 메세지 설정
                mainImgUrl.add("해당 상품 이미지가 없습니다");
            }
            ItemImg detailed = itemImgRepository.findByItemIdAndRepresent(item.getId(), ImgStatus.detailed);
            if (detailed != null) {
                String detailedOriginalPath = detailed.getFilePath();
                String detailedExtractedPath = detailedOriginalPath.substring(detailedOriginalPath.indexOf(File.separator + "img"));
                detailedImgUrl.add(detailedExtractedPath);
            } else {
                // 해당 상품 이미지가 없을 때 메세지 설정
                detailedImgUrl.add("해당 상품 이미지가 없습니다");
            }
        }

        for (int i = 0; i < results.size(); i++) {
            if (i < mainImgUrl.size()) {
                results.get(i).setMainImgUrl(mainImgUrl.get(i));
            }
            if (i < detailedImgUrl.size()) {
                results.get(i).setDetailedImgsUrl(detailedImgUrl.get(i));
            }
        }
        return results;
    }

    // 메인 페이지에서 신상품 4개
    @Transactional
    public List<ItemDto> showNewProducts() {
        List<Item> items = itemRepository.findTop4ByOrderByIdDesc();

        List<ItemDto> results = items.stream()
                .map(item -> item.toItemDto(item, null, null))
                .collect(Collectors.toList());

        List<String> mainImgUrl = new ArrayList<>();
        List<String> detailedImgUrl = new ArrayList<>();

        for (Item item : items) {
            ItemImg main = itemImgRepository.findByItemIdAndRepresent(item.getId(), ImgStatus.main);
            if (main != null) {
                String originalPath = main.getFilePath();
                String extractedPath = originalPath.substring(originalPath.indexOf(File.separator + "img"));
                mainImgUrl.add(extractedPath);
            } else {
                // 해당 상품 이미지가 없을 때 메세지 설정
                mainImgUrl.add("해당 상품 이미지가 없습니다");
            }
            ItemImg detailed = itemImgRepository.findByItemIdAndRepresent(item.getId(), ImgStatus.detailed);
            if (detailed != null) {
                String detailedOriginalPath = detailed.getFilePath();
                String detailedExtractedPath = detailedOriginalPath.substring(detailedOriginalPath.indexOf(File.separator + "img"));
                detailedImgUrl.add(detailedExtractedPath);
            } else {
                // 해당 상품 이미지가 없을 때 메세지 설정
                detailedImgUrl.add("해당 상품 이미지가 없습니다");
            }
        }

        for (int i = 0; i < results.size(); i++) {
            if (i < mainImgUrl.size()) {
                results.get(i).setMainImgUrl(mainImgUrl.get(i));
            }
            if (i < detailedImgUrl.size()) {
                results.get(i).setDetailedImgsUrl(detailedImgUrl.get(i));
            }
        }
        return results;
    }
}