package com.example.springbootproject.pms.sy.tm.service.dao;

import com.example.springbootproject.pms.sy.tm.dto.Sytm2000Dto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface Sytm2000Mapper {

    int insert(Sytm2000Dto dto);

    List<Sytm2000Dto> selectList();

    Sytm2000Dto selectById(Long id);

    int update(Sytm2000Dto dto);

    int delete(Long id);

    int insertActive(Sytm2000Dto dto);
}