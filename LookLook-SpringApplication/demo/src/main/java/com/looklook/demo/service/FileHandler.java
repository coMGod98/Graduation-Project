//package com.looklook.demo.service;
//
//import com.looklook.demo.domain.ItemImg;
//import com.looklook.demo.dto.ItemImgDto;
//import lombok.NoArgsConstructor;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Component;
//import org.springframework.util.CollectionUtils;
//import org.springframework.util.ObjectUtils;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.time.format.DateTimeFormatter;
//import java.util.ArrayList;
//import java.util.List;
//import java.time.LocalDateTime;
//
//
//@Component
//@RequiredArgsConstructor
//public class FileHandler {
//    private final ItemImgService itemImgService;
//    public List<ItemImg> parseImgInfo(MultipartFile mainImg,List<MultipartFile> detailedImgs, Long pid) throws Exception {
//
//        // 반환할 대표 이미지
//        ItemImg main = new ItemImg();
//
//        // 반환할 상세 이미지 리스트
//        List<ItemImg> detailed = new ArrayList<>();
//
//        // 전달되어 온 대표 이미지 파일이 존재할 경우
//
//        // 전달되어 온 상세 이미지 파일이 존재할 경우
//        if(!CollectionUtils.isEmpty(detailedImgs)) {
//
//            // 파일명을 업로드 한 날짜로 변환하여 저장
//            LocalDateTime now = LocalDateTime.now();
//            DateTimeFormatter dateTimeFormatter =
//                    DateTimeFormatter.ofPattern("yyyyMMdd");
//            String current_date = now.format(dateTimeFormatter);
//
//            // 프로젝트 디렉터리 내의 저장을 위한 절대 경로 설정
//            // 경로 구분자 File.separator 사용
//
////            String absolutePath = new File("").getAbsolutePath() + File.separator + File.separator;
//
////            File currentDirectory = new File(""); // 현재 디렉토리 (/java)
//            File currentDirectory = new File(System.getProperty("user.dir"));
//
//            String currentAbsolutePath = currentDirectory.getAbsolutePath(); // 현재 디렉토리의 절대 경로
//
//            // 부모 디렉토리로 이동 (main)
////            File parentDirectory = new File(currentDirectory, ".."); // 부모 디렉토리를 나타내는 File 객체
//            File parentDirectory = new File(currentDirectory.getParent());
////            String parentAbsolutePath = parentDirectory.getAbsolutePath(); // 부모 디렉토리의 절대 경로
//
//            // 타깃 디렉토리로 이동
//            File targetDirectory = new File(parentDirectory, "resources/img");
//
//            ///java/main/resources/img/pid/detailed
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
//            for(MultipartFile multipartFile : multipartFiles) {
//
//                // 파일의 확장자 추출
//                String originalFileExtension;
//                String contentType = multipartFile.getContentType();
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
//                        .origianlFileName(multipartFile.getOriginalFilename())
//                        .filePath(path + File.separator + new_file_name)
////                        .fileSize(multipartFile.getSize())
//                        .build();
//
//                // 파일 DTO 이용하여 Photo 엔티티 생성
//                Photo photo = new Photo(
//                        photoDto.getOrigFileName(),
//                        photoDto.getFilePath(),
//                        photoDto.getFileSize()
//                );
//
//                // 생성 후 리스트에 추가
//                fileList.add(photo);
//
//                // 업로드 한 파일 데이터를 지정한 파일에 저장
//                file = new File(absolutePath + path + File.separator + new_file_name);
//                multipartFile.transferTo(file);
//
//                // 파일 권한 설정(쓰기, 읽기)
//                file.setWritable(true);
//                file.setReadable(true);
//            }
//        }
//        return filelist;
//    }
//}
