package com.example.springbootproject.pms.pp.po.controller;

import com.example.springbootproject.pms.pp.po.dto.Pppo2000DetailDto;
import com.example.springbootproject.pms.pp.po.dto.Pppo2000Dto;
import com.example.springbootproject.pms.pp.po.service.Pppo2000Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/pppo2000")
@RequiredArgsConstructor
public class Pppo2000Controller {
    private final Pppo2000Service pppo2000Service;
    //신청 내역 리스트
    @GetMapping("/list")
    public List<Pppo2000Dto> getRequestList() {
        return pppo2000Service.getRequestList();
    }

    // 특정 신청 건 상세 (템플릿 데이터 포함)
    @GetMapping("/{ordno}")
    public Pppo2000DetailDto getRequestDetail(@PathVariable String ordno) {
        return pppo2000Service.getRequestDetail(ordno);
    }

    // 조회 API (지점, 상태 필터)
    @GetMapping("/search")
    public List<Pppo2000Dto> searchRequests(
            @RequestParam(required = false) String jijumcd,
            @RequestParam(required = false) String status
    ) {
        return pppo2000Service.searchRequests(jijumcd, status);
    }

}
