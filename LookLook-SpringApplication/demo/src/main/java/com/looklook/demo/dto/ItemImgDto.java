package com.looklook.demo.dto;

import com.looklook.demo.domain.ItemImg;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

@Getter @Setter
public class ItemImgDto {

    private Long pid;
    private String imgName;
    private String originalImgName;
    private String filePath;
    private String represent;



}