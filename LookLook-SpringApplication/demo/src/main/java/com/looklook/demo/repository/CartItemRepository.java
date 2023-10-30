package com.looklook.demo.repository;

import com.looklook.demo.domain.CartItem;
import com.looklook.demo.dto.CartListDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    CartItem findByCartIdAndItemId(Long cartId, Long itemId);

//    @Query("select new com.looklook.demo.dto.CartListDto(ci.id, i.itemName, i.price, ci.count, im.imgUrl)" +
//            "from CartItem ci, ItemImg im " +
//            "join ci.item i " +
//            "where ci.cart.id = :cartId " +
//            "and im.item.id = ci.item.id " +
//            "and im.represent = true " +
//            "order by ci.regTime desc")

//    List<CartListDto> findCartListDto(Long cartId);


}
