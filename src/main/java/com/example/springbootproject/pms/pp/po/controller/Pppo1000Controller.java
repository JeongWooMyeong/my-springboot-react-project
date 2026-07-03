package com.example.springbootproject.pms.pp.po.controller;

import com.example.springbootproject.pms.config.JwtConfig;
import com.example.springbootproject.pms.pp.po.dto.Pppo1000Dto;
import com.example.springbootproject.pms.pp.po.service.Pppo1000Service;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

        Claims claims = Jwts.parser()
                .verifyWith(JwtConfig.getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        String userid = claims.getSubject();
        String jijumcd = claims.get("jijumcd", String.class);
        String coid = claims.get("coid", String.class);

        dto.setRgr(userid);
        dto.setJijumcd(jijumcd);
        dto.setCoid(coid);
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
}