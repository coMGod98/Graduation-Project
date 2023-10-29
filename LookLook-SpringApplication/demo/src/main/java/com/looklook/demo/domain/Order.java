package com.looklook.demo.domain;

//import com.looklook.demo.service.OrderService;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter @Setter
@Table (name="orders")
public class Order extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="order_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UID")
    private LookLookUser user;

    @Column(name = "order_date")
    private LocalDate orderDate;        //주문일

    @Column
    private String address;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems = new ArrayList<>();


    private LocalDateTime regTime;
    private LocalDateTime updateTime;



    public void addOrderItem(OrderItem orderItem) {
        orderItems.add(orderItem);      //주문 객체에 주문 상품 객체 연결
        orderItem.setOrder(this);       //주문 상품 객체에 주문 객체 연결(연관 관계 주의)
    }

    public static Order createOrder(LookLookUser user, List<OrderItem> orderItemList) {

        Order order = new Order();
        order.setUser(user);
        for (OrderItem orderItem : orderItemList) {
            order.addOrderItem(orderItem);
        }
        order.setOrderDate(LocalDate.now());
        order.setOrderStatus(OrderStatus.ORDER);
        return order;
    }

    public int getTotalPrice() {
        int totalPrice = 0;

        // 각 상품 TotalPrice 모두 더한 가격
        for (OrderItem orderItem : orderItems) {
            totalPrice += orderItem.getTotalPrice();
        }
        return totalPrice;
    }

    //주문 취소
    public void orderCancel() {

        this.orderStatus = OrderStatus.CANCEL;
        for (OrderItem orderItem : orderItems) {
            orderItem.cancel();
        }
    }
}
