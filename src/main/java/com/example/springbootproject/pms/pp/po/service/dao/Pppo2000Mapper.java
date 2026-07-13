package com.example.springbootproject.pms.pp.po.service.dao;

import com.example.springbootproject.pms.pp.po.dto.Pppo2000DetailDto;
import com.example.springbootproject.pms.pp.po.dto.Pppo2000Dto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface Pppo2000Mapper {
    List<Pppo2000Dto> selectRequestList();
    Pppo2000DetailDto selectRequestDetail(String ordno);
    // 조회용 메서드
    List<Pppo2000Dto> searchRequests(@Param("jijumcd") String jijumcd,
                                     @Param("status") String status);

    // ✅ 승인/반려 추가
    void updateOrdstate(@Param("ordnos") List<String> ordnos, @Param("ordstate") Integer ordstate);
}