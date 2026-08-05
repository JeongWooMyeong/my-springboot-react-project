package com.example.springbootproject.pms.pp.po.service.dao.mssql;

import com.example.springbootproject.pms.pp.po.dto.Pppo1000Dto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface Pppo1000Mapper {
    void insert(Pppo1000Dto dto);
    Pppo1000Dto select(String ordNo);
}
