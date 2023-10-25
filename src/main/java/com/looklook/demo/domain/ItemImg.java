package com.looklook.demo.domain;

import com.looklook.demo.domain.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "item_img")
@Getter @Setter
public class ItemImg extends BaseTimeEntity {

    @Id
    @Column(name="item_img_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name="img_name")
    private String imgName; //이미지 파일명

    @Column(name="ori_img_name")
    private String oriImgName; //원본 이미지 파일명

    @Column(name="img_url")
    private String imgUrl; //이미지 조회 경로

    @Column(name = "rep_img")
    private String repImgYn; //대표 이미지 여부

    @Column(name="Detail_img")
    private String detailImg;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    public void updateItemImg(String oriImgName, String imgName, String imgUrl) {
        this.oriImgName = oriImgName;
        this.imgName = imgName;
        this.imgUrl = imgUrl;
    }
}