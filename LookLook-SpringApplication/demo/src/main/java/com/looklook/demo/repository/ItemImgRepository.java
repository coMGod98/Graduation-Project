package com.looklook.demo.repository;

import com.looklook.demo.domain.ImgStatus;
import com.looklook.demo.domain.ItemImg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ItemImgRepository extends JpaRepository<ItemImg,Long> {

    // 상품 아이디와 대표 이미지 여부로 대표 이미지 불러오기
    ItemImg findByItemIdAndRepresent(Long itemId, ImgStatus imgStatus);

    // 상품 아이디로 대표 이미지와 상세 이미지 전부 불러오기
    List<ItemImg> findAllByItemIdAndRepresent(Long itemId, ImgStatus imgStatus);
}
