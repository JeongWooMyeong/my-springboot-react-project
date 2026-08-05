package com.example.springbootproject.pms.sy.tm.service.dao.mssql;

import com.example.springbootproject.pms.sy.tm.dto.Sytm1000Dto;
import com.example.springbootproject.pms.sy.tm.dto.Sytm2000Dto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface Sytm2000Mapper {

    int insert(Sytm2000Dto dto);

    List<Sytm2000Dto> selectList(@Param("clcd") String clcd, @Param("jijumcd") String jijumcd);

    Sytm2000Dto selectById(Long id);

    int update(Sytm2000Dto dto);

    int delete(Long id);

    int insertActive(Sytm2000Dto dto);

    List<Sytm1000Dto> findByParent(@Param("clcd") String parentClCd, @Param("jijumcd") String jijumcd);
}