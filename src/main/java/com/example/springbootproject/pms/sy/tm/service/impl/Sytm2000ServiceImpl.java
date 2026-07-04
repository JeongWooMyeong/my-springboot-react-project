package com.example.springbootproject.pms.sy.tm.service.impl;

import com.example.springbootproject.pms.sy.tm.dto.Sytm2000Dto;
import com.example.springbootproject.pms.sy.tm.service.Sytm2000Service;
import com.example.springbootproject.pms.sy.tm.service.dao.Sytm2000Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class Sytm2000ServiceImpl implements Sytm2000Service {

    private final Sytm2000Mapper mapper;
    private final String uploadDir =
            "upload/thumb/";

    @Override
    public Long create(Sytm2000Dto dto, MultipartFile thumbnail) throws Exception {

        dto.setCreatedAt(LocalDateTime.now());
        dto.setUpdatedAt(LocalDateTime.now());

        if (thumbnail != null && !thumbnail.isEmpty()) {

            String thumbnailPath = saveThumbnail(thumbnail);

            dto.setThumbnailpath(thumbnailPath);
        }

        mapper.insert(dto);

        return dto.getId();
    }

    @Override
    public List<Sytm2000Dto> list() {
        return mapper.selectList();
    }

    @Override
    public Sytm2000Dto get(Long id) {
        return mapper.selectById(id);
    }

    @Override
    public int update(Sytm2000Dto dto, MultipartFile thumbnail) throws Exception {

        dto.setUpdatedAt(LocalDateTime.now());

        if (thumbnail != null && !thumbnail.isEmpty()) {

            String thumbnailPath = saveThumbnail(thumbnail);

            dto.setThumbnailpath(thumbnailPath);
        }

        return mapper.update(dto);
    }

    @Override
    public int delete(Long id) {
        return mapper.delete(id);
    }

    private String saveThumbnail(MultipartFile file) throws Exception {

        Files.createDirectories(Paths.get(uploadDir));

        String fileName = UUID.randomUUID() + ".png";

        Path path = Paths.get(uploadDir, fileName);

        file.transferTo(path);

        // DB에 저장할 값 (URL)
        return "/upload/thumb/" + fileName;
    }
}