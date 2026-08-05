package com.example.springbootproject.pms.sy.ep.service.dao.mssql;

import com.example.springbootproject.pms.sy.ep.dto.Syep1000Dto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface Syep1000Mapper {
    List<Syep1000Dto> selectAll();
    Syep1000Dto selectById(String jijumCd);
    int insert(Syep1000Dto dto);
    int update(Syep1000Dto dto);
    int delete(@Param("jijumcd") String jijumCd, @Param("coid") String coid);
    List<Syep1000Dto> selectByCoId(String coid);   // ✅ 추가
}
