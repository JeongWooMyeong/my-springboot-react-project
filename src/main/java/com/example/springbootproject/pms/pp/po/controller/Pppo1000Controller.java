package com.example.springbootproject.pms.pp.po.controller;

import com.example.springbootproject.pms.config.JwtConfig;
import com.example.springbootproject.pms.login.dto.Syep4000VO;
import com.example.springbootproject.pms.pp.po.dto.Pppo1000Dto;
import com.example.springbootproject.pms.pp.po.service.Pppo1000Service;
import com.example.springbootproject.pms.util.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/pppo1000")
@RequiredArgsConstructor
public class Pppo1000Controller {

    private final Pppo1000Service service;

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

    @PostMapping("/upload/image")
    public Map<String, String> upload(@RequestParam MultipartFile file) throws Exception {

        String fileName = UUID.randomUUID() + ".png";

        String dir = System.getProperty("user.dir") + "/upload/userimage/";

        Path path = Paths.get(dir, fileName);

        Files.createDirectories(path.getParent());

        file.transferTo(path);

        return Map.of(
                "url", "http://localhost:8081/upload/userimage/" + fileName
        );
    }
}