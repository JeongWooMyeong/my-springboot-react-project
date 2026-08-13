package com.example.springbootproject.pms.sy.tm.service.impl;

import com.example.springbootproject.pms.common.storage.service.MinioStorageService;
import com.example.springbootproject.pms.sy.tm.service.TemplateImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TemplateImageServiceImpl
        implements TemplateImageService {


    private final MinioStorageService minioStorageService;


    @Override
    public String uploadImage(
            MultipartFile file
    ) throws Exception {


        /*
         * 파일 확인
         */

        if (file == null || file.isEmpty()) {

            throw new RuntimeException(
                    "이미지 파일 없음"
            );
        }


        /*
         * 확장자
         */

        String originalName =
                file.getOriginalFilename();


        String extension = "";


        if (
                originalName != null
                        &&
                        originalName.contains(".")
        ) {

            extension =
                    originalName.substring(
                            originalName.lastIndexOf(".")
                    );
        }


        /*
         * 저장 파일명
         */

        String saveName =
                UUID.randomUUID()
                        + extension;


        /*
         * MinIO Object 경로
         */

        String objectName =
                "template/" + saveName;


        /*
         * MinIO 업로드
         */

        byte[] data =
                file.getBytes();


        minioStorageService.upload(
                objectName,
                data,
                file.getContentType()
        );


        /*
         * 외부에서 사용할 경로
         */

        return "/upload/template/" + saveName;
    }
}