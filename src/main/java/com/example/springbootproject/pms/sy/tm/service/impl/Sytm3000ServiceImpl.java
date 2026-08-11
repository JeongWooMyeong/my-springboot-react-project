package com.example.springbootproject.pms.sy.tm.service.impl;

import com.example.springbootproject.pms.sy.tm.dto.Sytm3000Dto;
import com.example.springbootproject.pms.sy.tm.service.Sytm3000Service;
import com.example.springbootproject.pms.sy.tm.service.dao.mssql.Sytm3000Mapper;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class Sytm3000ServiceImpl
        implements Sytm3000Service {

    private final Sytm3000Mapper sytm3000Mapper;

    private final MinioClient minioClient;

    @Value("${storage.bucket}")
    private String bucketName;


    @Override
    public List<Sytm3000Dto> getFontList() {

        return sytm3000Mapper.selectFontList();
    }


    @Override
    public void uploadFont(
            MultipartFile file
    ) throws Exception {

        if (file == null || file.isEmpty()) {
            throw new RuntimeException("폰트 파일이 없습니다.");
        }


        String filename =
                file.getOriginalFilename();


        if (filename == null || filename.isBlank()) {
            throw new RuntimeException("파일명이 없습니다.");
        }


        /*
         * MinIO 저장 경로
         *
         * springbootproject
         * └── fonts
         *     └── font.ttf
         */
        String objectName =
                "fonts/" + filename;


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


        /*
         * DB 정보 저장
         */
        Sytm3000Dto dto =
                new Sytm3000Dto();

        dto.setFontfilename(filename);

        dto.setFontfamily(
                extractFontFamily(filename)
        );

        dto.setFontfilepath(
                "/upload/fonts/" + filename
        );

        dto.setFontweight(400);

        dto.setFontstyle("NORMAL");

        dto.setRegid("SYSTEM");


        sytm3000Mapper.insertFont(dto);
    }


    @Override
    public void deleteFont(
            Integer fontid
    ) {

        sytm3000Mapper.deleteFont(fontid);
    }


    private String extractFontFamily(
            String filename
    ) {

        return filename
                .replace(".ttf", "")
                .replace(".otf", "");
    }

}