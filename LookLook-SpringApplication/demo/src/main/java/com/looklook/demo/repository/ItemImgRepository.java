package com.looklook.demo.repository;

import com.looklook.demo.domain.ItemImg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ItemImgRepository extends JpaRepository<ItemImg,Long> {

    List<ItemImg> findByItemIdOrderByIdAsc(Long itemId);

    //상품 대표 이미지 찾는 쿼리 메소드
    ItemImg findByItemIdAndRepImgYn(Long itemId, String repImgYn);
}
