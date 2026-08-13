package com.example.springbootproject.pms.pp.po.controller;

import com.example.springbootproject.pms.common.storage.service.MinioStorageService;
import com.example.springbootproject.pms.login.dto.Syep4000VO;
import com.example.springbootproject.pms.pp.po.dto.Pppo1000Dto;
import com.example.springbootproject.pms.pp.po.service.Pppo1000Service;
import com.example.springbootproject.pms.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/pppo1000")
@RequiredArgsConstructor
public class Pppo1000Controller {

    private final Pppo1000Service service;
    private final MinioStorageService minioStorageService;

    // -----------------------------
    // 저장 (1000 + 1100 같이 저장)
    // -----------------------------
    @PostMapping
    public ResponseEntity<?> save(@RequestBody Pppo1000Dto dto, @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        Syep4000VO user = JwtUtil.parseToken(token);


        dto.setRgr(user.getUserid());
        dto.setJijumcd(user.getJijumcd());
        dto.setCoid(user.getJijumcd());
        dto.setNtnid("NL01");

        service.save(dto);

        return ResponseEntity.ok("SUCCESS");
    }

    // -----------------------------
    // 조회 (1000 + 1100 merge)
    // -----------------------------
    @GetMapping("/{ordno}")
    public ResponseEntity<Pppo1000Dto> get(@PathVariable String ordNo) {

        return ResponseEntity.ok(service.find(ordNo));
    }

    // -----------------------------
    // 사용자 이미지 업로드
    // -----------------------------
    @PostMapping("/upload/image")
    public Map<String, String> upload(
            @RequestParam MultipartFile file
    ) throws Exception {


        if (
                file == null
                        ||
                        file.isEmpty()
        ) {

            throw new RuntimeException(
                    "이미지 파일이 없습니다."
            );
        }


        /*
         * 파일명
         */

        String fileName =
                UUID.randomUUID()
                        + ".png";


        /*
         * MinIO Object 경로
         */

        String objectName =
                "userimage/" + fileName;


        /*
         * MinIO 업로드
         */

        minioStorageService.upload(
                objectName,
                file.getBytes(),
                file.getContentType()
        );


        /*
         * 외부 접근 URL
         */

        return Map.of(
                "url",
                "/upload/userimage/" + fileName
        );
    }
}