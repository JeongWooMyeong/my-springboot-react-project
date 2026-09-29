package com.example.springbootproject.pms.sy.bs.controller;

import com.example.springbootproject.pms.common.storage.service.MinioStorageService;
import com.example.springbootproject.pms.sy.bs.dto.NoticeFileDto;
import com.example.springbootproject.pms.sy.bs.dto.Sybs1000Dto;
import com.example.springbootproject.pms.sy.bs.service.Sybs1000Service;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/api/sybs1000")
@RequiredArgsConstructor
public class Sybs1000Controller {


    private final Sybs1000Service sybs1000Service;
    private final MinioStorageService minioStorageService;


    /**
     * 공지사항 목록 조회
     */
    @GetMapping("/list")
    public ResponseEntity<List<Sybs1000Dto>> selectList() {

        return ResponseEntity.ok(
                sybs1000Service.select_list()
        );
    }


    /**
     * 공지사항 상세 조회
     */
    @GetMapping("/{noticeId}")
    public ResponseEntity<Sybs1000Dto> selectOne(
            @PathVariable Long noticeId
    ) {

        return ResponseEntity.ok(
                sybs1000Service.select_one(noticeId)
        );
    }


    /**
     * 공지사항 등록
     */
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Long> insert(
            @RequestPart("data") Sybs1000Dto dto,
            @RequestPart(value = "files", required = false) List<MultipartFile> files
    ) throws Exception {

        return ResponseEntity.ok(
                sybs1000Service.insert(dto, files)
        );
    }


    /**
     * 공지사항 수정
     */
    @PutMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<Long> update(
            @RequestPart("data") Sybs1000Dto dto,
            @RequestPart(value = "files", required = false) List<MultipartFile> files
    ) throws Exception {

        return ResponseEntity.ok(
                sybs1000Service.update(
                        dto,
                        files
                )
        );
    }


    /**
     * 공지사항 삭제
     */
    @DeleteMapping("/{noticeId}")
    public ResponseEntity<Integer> delete(
            @PathVariable Long noticeId
    ) {

        return ResponseEntity.ok(
                sybs1000Service.delete(noticeId)
        );
    }

    @GetMapping("/mainList")
    public ResponseEntity<?> selectMainList(){

        return ResponseEntity.ok(
                sybs1000Service.selectMainList()
        );

    }

    @GetMapping("/file/{fileId}")
    public ResponseEntity<InputStreamResource> downloadFile(
            @PathVariable Long fileId
    ) throws Exception {

        NoticeFileDto file =
                sybs1000Service.select_file(fileId);

        InputStream inputStream =
                minioStorageService.getInputStream(
                        file.getObject_name()
                );

        String encodedFileName =
                URLEncoder.encode(
                        file.getOriginal_name(),
                        StandardCharsets.UTF_8
                ).replaceAll("\\+", "%20");

        return ResponseEntity.ok()
                .contentType(
                        MediaType.parseMediaType(
                                file.getContent_type()
                        )
                )
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename*=UTF-8''"
                                + encodedFileName
                )
                .contentLength(file.getFile_size())
                .body(
                        new InputStreamResource(
                                inputStream
                        )
                );
    }
}