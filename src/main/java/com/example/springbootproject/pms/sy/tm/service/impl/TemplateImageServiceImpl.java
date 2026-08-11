package com.example.springbootproject.pms.sy.tm.service.impl;

import com.example.springbootproject.pms.sy.tm.service.TemplateImageService;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TemplateImageServiceImpl
        implements TemplateImageService {



    private final MinioClient minioClient;

    @Value("${storage.bucket}")
    private String bucketName;

    @Override
    public String uploadImage(
            MultipartFile file
    ) throws Exception {

        if (file == null || file.isEmpty()) {
            throw new RuntimeException("이미지 파일 없음");
        }

        String originalName =
                file.getOriginalFilename();

        String extension = "";

        if (originalName != null &&
                originalName.contains(".")) {

            extension =
                    originalName.substring(
                            originalName.lastIndexOf(".")
                    );
        }

        String saveName =
                UUID.randomUUID() + extension;

        String objectName =
                "template/" + saveName;

        minioClient.putObject(
                PutObjectArgs.builder()
                        .bucket(bucketName)
                        .object(objectName)
                        .stream(
                                file.getInputStream(),
                                file.getSize(),
                                (long) (10 * 1024 * 1024)
                        )
                        .contentType(
                                file.getContentType()
                        )
                        .build()
        );

        return "/upload/template/" + saveName;


    }


}