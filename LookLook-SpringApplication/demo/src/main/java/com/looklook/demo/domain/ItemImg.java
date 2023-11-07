package com.looklook.demo.domain;

import lombok.*;

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

    private String originalImgName; // 이미지 원본명
    private String filePath; // 이미지 저장 경로
    private Long fileSize;
    @Enumerated(EnumType.STRING)
    private ImgStatus represent; // 대표 이미지 여부
    @ManyToOne(fetch = FetchType.LAZY)

    @JoinColumn(name = "item_id")
    private Item item;

    @Builder
    public ItemImg(String originalImgName, String filePath, Long fileSize, ImgStatus represent){
        this.originalImgName = originalImgName;
        this.filePath = filePath;
        this.fileSize = fileSize;
        this.represent = represent;
    }
}