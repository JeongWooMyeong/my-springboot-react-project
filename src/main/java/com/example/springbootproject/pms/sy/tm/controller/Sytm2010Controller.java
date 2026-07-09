package com.example.springbootproject.pms.sy.tm.controller;

import com.example.springbootproject.pms.sy.tm.dto.Sytm2000Dto;
import com.example.springbootproject.pms.sy.tm.service.Sytm2010Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sytm2010")
@RequiredArgsConstructor
public class Sytm2010Controller {

    private final Sytm2010Service service;

    // 특정 분류에 속한 템플릿 리스트 조회
    @GetMapping("/category/{clCd}")
    public List<Sytm2000Dto> getTemplatesByCategory(@PathVariable Long clCd) {
        return service.getTemplatesByCategory(clCd);
    }

    // 특정 분류에 활성화된 템플릿 조회
    @GetMapping("/category/{clCd}/active")
    public List<Sytm2000Dto> getActiveTemplatesByCategory(@PathVariable Long clCd) {
        return service.getActiveTemplatesByCategory(clCd);
    }

    // 템플릿 활성화/비활성화 설정
    @PostMapping("/active/{templateId}")
    public int setTemplateActive(
            @PathVariable Long templateId,
            @RequestParam Long clCd,       // 분류 코드 추가
            @RequestParam boolean active   // 활성화 여부
    ) {
        return service.setTemplateActive(templateId, clCd, active);
    }
}
