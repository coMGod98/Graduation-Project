package com.looklook.demo.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name="order_item")
@Getter @Setter
public class OrderItem extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="item_id")
    private Item item;
    private int count;

    // 프론트로 사이즈와 색상 보낼 때, id를 보내지 않아서... 일단 문자열로 처리
    private String size;
    private String color;
    private Boolean orderStatus; // 주문 완료되면 true, 주문 미완은 false

    public static OrderItem createOrderItem(Item item, int count) {

        OrderItem orderItem = new OrderItem();
        orderItem.setItem(item);
        orderItem.setCount(count);
//        orderItem.setOrderPrice(item.getPrice());

        item.removeStock(count);
        return orderItem;
    }

//    public int getTotalPrice() {
//        return orderPrice * count;
//    }
//
//    //주문 취소
//    public void cancel() {
//        this.getItem().addStock(count);
//    }

}
