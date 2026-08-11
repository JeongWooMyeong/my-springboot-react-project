package com.example.springbootproject.pms.sy.tm.service.impl;

import com.example.springbootproject.pms.sy.tm.dto.Sytm1000Dto;
import com.example.springbootproject.pms.sy.tm.dto.Sytm2000Dto;
import com.example.springbootproject.pms.sy.tm.service.Sytm2000Service;
import com.example.springbootproject.pms.sy.tm.service.dao.mssql.Sytm2000Mapper;
import com.example.springbootproject.pms.sy.tm.service.dao.mssql.Sytm2010Mapper;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class Sytm2000ServiceImpl implements Sytm2000Service {

    private final Sytm2000Mapper mapper;
    private final Sytm2010Mapper mapper2010;
    private final MinioClient minioClient;

    @Value("${storage.bucket}")
    private String bucketName;

    @Override
    public Long create(
            Sytm2000Dto dto,
            MultipartFile thumbnail
    ) throws Exception {

        dto.setCreatedAt(LocalDateTime.now());
        dto.setUpdatedAt(LocalDateTime.now());

        if (thumbnail != null &&
                !thumbnail.isEmpty()) {

            String thumbnailPath =
                    saveThumbnail(thumbnail);

            dto.setThumbnailpath(thumbnailPath);
        }

        mapper.insert(dto);

        Sytm2000Dto active =
                new Sytm2000Dto();

        active.setTmpno(dto.getId());
        active.setClcd(dto.getClcd());

        mapper.insertActive(active);

        return dto.getId();
    }

    @Override
    public List<Sytm2000Dto> list(
            String clcd,
            String jijumcd
    ) {
        return mapper.selectList(
                clcd,
                jijumcd
        );
    }

    @Override
    public Sytm2000Dto get(Long id) {
        return mapper.selectById(id);
    }

    @Override
    public int update(
            Sytm2000Dto dto,
            MultipartFile thumbnail
    ) throws Exception {

        dto.setUpdatedAt(
                LocalDateTime.now()
        );

        if (thumbnail != null &&
                !thumbnail.isEmpty()) {

            String thumbnailPath =
                    saveThumbnail(thumbnail);

            dto.setThumbnailpath(
                    thumbnailPath
            );
        }

        return mapper.update(dto);
    }

    @Override
    public int delete(
            Long id,
            Long clcd
    ) {

        mapper2010.deleteTemplateActive(
                id,
                clcd
        );

        return mapper.delete(id);
    }

    private String saveThumbnail(
            MultipartFile file
    ) throws Exception {

        String fileName =
                UUID.randomUUID() + ".png";

        String objectName =
                "thumb/" + fileName;

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

        return "/upload/thumb/" + fileName;
    }

    @Override
    public List<Sytm1000Dto> getCategoriesByParent(
            String parentClCd,
            String jijumcd
    ) {
        return mapper.findByParent(
                parentClCd,
                jijumcd
        );
    }
}