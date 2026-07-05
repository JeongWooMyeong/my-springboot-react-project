package com.example.springbootproject.pms.sy.ep.service;

import com.example.springbootproject.pms.sy.ep.dto.Syep1000Dto;

import java.util.List;

public interface Syep1000Service {
    List<Syep1000Dto> getAllJijum();
    Syep1000Dto getJijumById(String jijumCd);
    void insertJijum(Syep1000Dto dto);
    void updateJijum(Syep1000Dto dto);
    void deleteJijum(String jijumCd, String coid);
    List<Syep1000Dto> getJijumByCoId(String coid);   // ✅ 추가
}
