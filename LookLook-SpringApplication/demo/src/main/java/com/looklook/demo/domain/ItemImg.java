package com.looklook.demo.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "item_img")
@Getter @Setter
@RequiredArgsConstructor
public class ItemImg {
    @Id
    @Column(name="item_img_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="img_name")
    private String imgName; // 이미지 파일명
    @Column(name="ori_img_name")
    private String originalImgName; // 이미지 원본명
    private String filePath; // 이미지 저장 경로
    @Column(name = "rep_img")
    private Boolean represent; // 대표 이미지 여부
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;
}