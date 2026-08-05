package com.example.springbootproject.pms.sy.ep.service.dao.mssql;

import com.example.springbootproject.pms.sy.ep.dto.Syep2000Dto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface Syep2000Mapper {
    List<Syep2000Dto> selectAll();
    Syep2000Dto selectById(String coid);
    int insert(Syep2000Dto dto);
    int update(Syep2000Dto dto);
    int delete(String coid);
}