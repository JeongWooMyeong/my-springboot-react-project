package com.example.springbootproject.pms.pp.po.service.dao;

import com.example.springbootproject.pms.pp.po.dto.Pppo2000DetailDto;
import com.example.springbootproject.pms.pp.po.dto.Pppo2000Dto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface Pppo2000Mapper {
    List<Pppo2000Dto> selectRequestList();
    Pppo2000DetailDto selectRequestDetail(String ordno);
}