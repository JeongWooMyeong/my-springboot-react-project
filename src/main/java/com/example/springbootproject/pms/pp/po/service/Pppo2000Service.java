package com.example.springbootproject.pms.pp.po.service;

import com.example.springbootproject.pms.pp.po.dto.Pppo2000DetailDto;
import com.example.springbootproject.pms.pp.po.dto.Pppo2000Dto;

import java.util.List;

public interface Pppo2000Service {
    List<Pppo2000Dto> getRequestList();
    Pppo2000DetailDto getRequestDetail(String ordno);
    // 조회용 메서드
    List<Pppo2000Dto> searchRequests(String jijumcd, String status);
    byte[] generatePdf(String ordno);
    byte[] generateZip(List<String> ordnos);

    // ✅ 승인/반려 추가
    void updateOrdstate(List<String> ordnos, Integer ordstate);
}
