package com.looklook.demo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name="order_item")
@Getter @Setter
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id")
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="pid")
    private Item item;
    private int count;

    // 프론트로 사이즈와 색상 보낼 때, id를 보내지 않아서... 일단 문자열로 처리
    private String size;
    private String color;
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

//
//    //주문 취소
//    public void cancel() {
//        this.getItem().addStock(count);
//    }

}
