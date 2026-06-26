package com.example.springbootproject.pms.sy.ep.service.dao;

import com.example.springbootproject.pms.sy.ep.dto.Syep1000Dto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface Syep1000Mapper {
    List<Syep1000Dto> selectAll();
}
