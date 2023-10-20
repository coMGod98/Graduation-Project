package com.looklook.demo.repository;

import com.looklook.demo.domain.ItemImg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ItemImgRepository extends JpaRepository<ItemImg,Long> {

    List<ItemImg> findByItemIdOrderByIdAsc(Long itemId);

    //주문 서비스
//    ItemImg findByItemIdAndRepimgYn(Long itemId, String repimgYn);
}
