package com.example.springbootproject.pms.sy.tm.service.dao;

import com.example.springbootproject.pms.sy.tm.dto.Sytm1000Dto;
import com.example.springbootproject.pms.sy.tm.dto.Sytm1010Dto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface Sytm1000Mapper {
    List<Sytm1000Dto> selectAll();
    void insert(Sytm1000Dto dto);
    void update(@Param("clCd") String clCd, @Param("dto") Sytm1000Dto dto);
    void delete(@Param("clCd") String clCd);

    List<Sytm1010Dto> selectActiveByJijum(@Param("jijumcd") String jijumcd);
    void insertActive(Sytm1010Dto dto);
    void deleteActive(@Param("clcd") String clcd, @Param("jijumcd") String jijumcd);
}