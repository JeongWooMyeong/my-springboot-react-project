package com.example.springbootproject.pms.pp.po.service.dao;

import com.example.springbootproject.pms.pp.po.dto.Pppo1100Dto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface Pppo1100Mapper {
    void insert(Pppo1100Dto dto);
    Pppo1100Dto findByOrdNo(String ordNo);
}
