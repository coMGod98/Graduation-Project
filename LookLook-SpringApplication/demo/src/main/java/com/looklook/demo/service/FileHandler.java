package com.looklook.demo.service;

import com.looklook.demo.domain.ImgStatus;
import com.looklook.demo.domain.ItemImg;
import com.looklook.demo.dto.ItemImgDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;


@Component
@RequiredArgsConstructor
public class FileHandler {

    public List<ItemImg> parseImgInfo(MultipartFile mainImg, MultipartFile detailedImg, Long pid) throws Exception {

        // 반환할 이미지 리스트, 0번은 대표 이미지
        List<ItemImg> imgList = new ArrayList<>();

        // 전달되어 온 대표 이미지 파일이 존재할 경우

        if (mainImg != null && !mainImg.isEmpty()) {
            // 파일명을 업로드 한 날짜로 변환하여 저장
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter dateTimeFormatter =
                    DateTimeFormatter.ofPattern("yyyyMMdd");
            String current_date = now.format(dateTimeFormatter);

            // 현재 디렉토리
            File currentDirectory = new File(System.getProperty("user.dir"));

            // 타깃 디렉토리로 이동
            File targetDirectory = new File(currentDirectory, "LookLook-SpringApplication/demo/src/main/resources/static/img");

            String targetAbsolutePath = targetDirectory.getAbsolutePath()+ File.separator + pid + File.separator + "main";

            // 파일을 저장할 세부 경로 지정
            File file = new File(targetAbsolutePath);

            // 디렉터리가 존재하지 않을 경우
            if(!file.exists()) {
                boolean wasSuccessful = file.mkdirs();
                // 디렉터리 생성에 실패했을 경우
                if(!wasSuccessful)
                    System.out.println("file: was not successful");
            }


            // 파일의 확장자 추출
            String originalFileExtension = null;
            String contentType = mainImg.getContentType();

            // 확장자명이 존재하지 않을 경우 처리 x
            if(!ObjectUtils.isEmpty(contentType)) {
                if(contentType.contains("image/jpeg"))
                    originalFileExtension = ".jpg";
                else if(contentType.contains("image/png"))
                    originalFileExtension = ".png";
            }

            // 파일명 중복 피하고자 나노초까지 얻어와 지정
            String new_file_name = System.nanoTime() + originalFileExtension;

            // 파일 DTO 생성
            ItemImgDto dto = ItemImgDto.builder()
                    .originalImgName(mainImg.getOriginalFilename())
                    .filePath(targetAbsolutePath + File.separator + new_file_name)
                    .fileSize(mainImg.getSize())
                    .build();

            // 파일 DTO 이용하여 ItemImg 엔티티 생성
            ItemImg itemImg = new ItemImg(
                    mainImg.getOriginalFilename(),
                    dto.getFilePath(),
                    mainImg.getSize(),
                    ImgStatus.main
            );

            // 생성 후 리스트에 추가
            imgList.add(itemImg);

            // 업로드 한 파일 데이터를 지정한 파일에 저장
            file = new File(targetAbsolutePath + File.separator + new_file_name);
            mainImg.transferTo(file);

            // 파일 권한 설정(쓰기, 읽기)
            file.setWritable(true);
            file.setReadable(true);

        }
        if (detailedImg != null && !detailedImg.isEmpty()) {
            // 파일명을 업로드 한 날짜로 변환하여 저장
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter dateTimeFormatter =
                    DateTimeFormatter.ofPattern("yyyyMMdd");
            String current_date = now.format(dateTimeFormatter);

            // 현재 디렉토리
            File currentDirectory = new File(System.getProperty("user.dir"));

            // 타깃 디렉토리로 이동
            File targetDirectory = new File(currentDirectory, "LookLook-SpringApplication/demo/src/main/resources/static/img");

            String targetAbsolutePath = targetDirectory.getAbsolutePath()+ File.separator + pid + File.separator + "detailed";

            // 파일을 저장할 세부 경로 지정
            File file = new File(targetAbsolutePath);

            // 디렉터리가 존재하지 않을 경우
            if(!file.exists()) {
                boolean wasSuccessful = file.mkdirs();
                // 디렉터리 생성에 실패했을 경우
                if(!wasSuccessful)
                    System.out.println("file: was not successful");
            }


            // 파일의 확장자 추출
            String originalFileExtension = null;
            String contentType = detailedImg.getContentType();

            // 확장자명이 존재하지 않을 경우 처리 x
            if(!ObjectUtils.isEmpty(contentType)) {
                if(contentType.contains("image/jpeg"))
                    originalFileExtension = ".jpg";
                else if(contentType.contains("image/png"))
                    originalFileExtension = ".png";
            }

            // 파일명 중복 피하고자 나노초까지 얻어와 지정
            String new_file_name = System.nanoTime() + originalFileExtension;

            // 파일 DTO 생성
            ItemImgDto dto = ItemImgDto.builder()
                    .originalImgName(detailedImg.getOriginalFilename())
                    .filePath(targetAbsolutePath + File.separator + new_file_name)
                    .fileSize(detailedImg.getSize())
                    .build();

            // 파일 DTO 이용하여 ItemImg 엔티티 생성
            ItemImg itemImg = new ItemImg(
                    detailedImg.getOriginalFilename(),
                    dto.getFilePath(),
                    detailedImg.getSize(),
                    ImgStatus.detailed
            );

            // 생성 후 리스트에 추가
            imgList.add(itemImg);

            // 업로드 한 파일 데이터를 지정한 파일에 저장
            file = new File(targetAbsolutePath + File.separator + new_file_name);
            detailedImg.transferTo(file);

            // 파일 권한 설정(쓰기, 읽기)
            file.setWritable(true);
            file.setReadable(true);

        }

//        // 전달되어 온 상세 이미지 파일이 존재할 경우
//        if(!CollectionUtils.isEmpty(detailedImgs)) {
//
//            // 파일명을 업로드 한 날짜로 변환하여 저장
//            LocalDateTime now = LocalDateTime.now();
//            DateTimeFormatter dateTimeFormatter =
//                    DateTimeFormatter.ofPattern("yyyyMMdd");
//            String current_date = now.format(dateTimeFormatter);
//
//            // 현재 디렉토리
//            File currentDirectory = new File(System.getProperty("user.dir"));
//
//            // 타깃 디렉토리로 이동
//            File targetDirectory = new File(currentDirectory, "LookLook-SpringApplication/demo/src/main/resources/static/img");
//            String targetAbsolutePath = targetDirectory.getAbsolutePath()+ File.separator + pid + File.separator + "detailed";
//
//            // 파일을 저장할 세부 경로 지정
//            File file = new File(targetAbsolutePath);
//
//            // 디렉터리가 존재하지 않을 경우
//            if(!file.exists()) {
//                boolean wasSuccessful = file.mkdirs();
//                // 디렉터리 생성에 실패했을 경우
//                if(!wasSuccessful)
//                    System.out.println("file: was not successful");
//            }
//
//            // 다중 파일 처리
//            for(MultipartFile detailedImg : detailedImgs) {
//
//                // 파일의 확장자 추출
//                String originalFileExtension;
//                String contentType = detailedImg.getContentType();
//
//                // 확장자명이 존재하지 않을 경우 처리 x
//                if(ObjectUtils.isEmpty(contentType)) {
//                    break;
//                }
//                else {  // 확장자가 jpeg, png인 파일들만 받아서 처리
//                    if(contentType.contains("image/jpeg"))
//                        originalFileExtension = ".jpg";
//                    else if(contentType.contains("image/png"))
//                        originalFileExtension = ".png";
//                    else  // 다른 확장자일 경우 처리 x
//                        break;
//                }
//
//                // 파일명 중복 피하고자 나노초까지 얻어와 지정
//                String new_file_name = System.nanoTime() + originalFileExtension;
//
//                // 파일 DTO 생성
//                ItemImgDto dto = ItemImgDto.builder()
//                        .originalImgName(detailedImg.getOriginalFilename())
//                        .filePath(targetAbsolutePath + File.separator + new_file_name)
//                        .fileSize(detailedImg.getSize())
//                        .build();
//
//                // 파일 DTO 이용하여 Photo 엔티티 생성
//                ItemImg itemImg = new ItemImg(
//                        detailedImg.getOriginalFilename(),
//                        dto.getFilePath(),
//                        detailedImg.getSize(),
//                        ImgStatus.detailed
//                );
//
//                // 생성 후 리스트에 추가
//                imgList.add(itemImg);
//
//                // 업로드 한 파일 데이터를 지정한 파일에 저장
//                file = new File(targetAbsolutePath + File.separator + new_file_name);
//                detailedImg.transferTo(file);
//
//                // 파일 권한 설정(쓰기, 읽기)
//                file.setWritable(true);
//                file.setReadable(true);
//            }
//        }
        return imgList;
    }
}
