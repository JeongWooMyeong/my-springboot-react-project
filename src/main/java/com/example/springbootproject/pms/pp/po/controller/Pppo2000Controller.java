package com.example.springbootproject.pms.pp.po.controller;

import com.example.springbootproject.pms.pp.po.dto.Pppo2000DetailDto;
import com.example.springbootproject.pms.pp.po.dto.Pppo2000Dto;
import com.example.springbootproject.pms.pp.po.service.Pppo2000Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

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

    // 단건 PDF 생성
    @PostMapping("/pdf")
    public ResponseEntity<byte[]> generatePdf(@RequestBody Map<String, String> req) {
        String ordno = req.get("ordno");
        byte[] pdfBytes = pppo2000Service.generatePdf(ordno);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + ordno + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }

    // 여러건 PDF → ZIP 생성
    @PostMapping("/pdf/bulk")
    public ResponseEntity<byte[]> generateZip(@RequestBody Map<String, List<String>> req) {
        List<String> ordnos = req.get("ordnos");
        byte[] zipBytes = pppo2000Service.generateZip(ordnos);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=pppo2000_pdfs.zip")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(zipBytes);
    }

}
