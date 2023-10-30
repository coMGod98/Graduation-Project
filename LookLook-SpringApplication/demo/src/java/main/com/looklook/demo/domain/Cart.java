package com.looklook.demo.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name="cart")
@Getter @Setter
@ToString
public class Cart extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "cart_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "UID" )
    private LookLookUser user;

//    @OneToOne
//    @JoinColumn(name="ca_id")
//    private LookLookCategory category;

    public static Cart createCart(LookLookUser user) {
        Cart cart=new Cart();
        cart.setUser(user);
        return cart;
    }
}
