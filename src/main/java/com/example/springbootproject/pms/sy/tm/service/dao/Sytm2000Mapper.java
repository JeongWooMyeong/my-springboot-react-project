package com.example.springbootproject.pms.sy.tm.service.dao;

import com.example.springbootproject.pms.sy.tm.dto.Sytm2000Dto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface Sytm2000Mapper {

    int insert(Map<String, Object> param);

    List<Sytm2000Dto> selectList();

    Map<String, Object> selectById(Long id);

    int update(Map<String, Object> param);

    int delete(Long id);
}