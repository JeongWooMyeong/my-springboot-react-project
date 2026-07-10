package com.example.springbootproject.pms.sy.tm.controller;

import com.example.springbootproject.pms.login.dto.Syep4000VO;
import com.example.springbootproject.pms.sy.tm.dto.Sytm1000Dto;
import com.example.springbootproject.pms.sy.tm.dto.Sytm2000Dto;
import com.example.springbootproject.pms.sy.tm.service.Sytm2000Service;
import com.example.springbootproject.pms.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sytm2000")
@RequiredArgsConstructor
public class Sytm2000Controller {

    private final Sytm2000Service service;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Long create(
            @RequestPart("template") Sytm2000Dto dto,
            @RequestPart(value = "thumbnail", required = false) MultipartFile thumbnail
    ) throws Exception {
        return service.create(dto, thumbnail);
    }

    @GetMapping
    public List<Sytm2000Dto> list(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam(required = false) String clcd
    ) {
        String token = authHeader.replace("Bearer ", "");
        Syep4000VO user = JwtUtil.parseToken(token);
        String jijumcd = user.getJijumcd();

        // 관리자라면 모든 지점 조회
//        if ("ADMIN".equals(user.getRole())) {
//            jijumcd = "0";
//        }

        return service.list(clcd, jijumcd);
    }

    @GetMapping("/{id}")
    public Sytm2000Dto get(@PathVariable Long id) {
        return service.get(id);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public int update(
            @PathVariable Long id,
            @RequestPart("template") Sytm2000Dto dto,
            @RequestPart(value = "thumbnail", required = false) MultipartFile thumbnail
    ) throws Exception {
        dto.setId(id);
        return service.update(dto, thumbnail);
    }

    @DeleteMapping("/{id}/{clcd}")
    public int delete(@PathVariable Long id, @PathVariable Long clcd) {
        return service.delete(id, clcd);
    }

    @GetMapping("/categories")
    public List<Sytm1000Dto> getCategories(@RequestHeader("Authorization") String authHeader, @RequestParam(defaultValue = "0") String parent) {
        String token = authHeader.replace("Bearer ", "");
        Syep4000VO user = JwtUtil.parseToken(token);
        String jijumcd = user.getJijumcd();

        return service.getCategoriesByParent(parent, jijumcd);
    }

}