package com.example.springbootproject.pms.pp.po.service.dao;

import com.example.springbootproject.pms.pp.po.dto.Pppo1100Dto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface Pppo1100Mapper {
    void insert(Pppo1100Dto dto);
    Pppo1100Dto findByOrdNo(String ordNo);
    List<Pppo1100Dto> findByOrdNoList(String ordNo);
}
