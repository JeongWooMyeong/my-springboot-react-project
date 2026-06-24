package com.example.springbootproject.pms.sy.ep.service.dao;

import com.example.springbootproject.pms.sy.ep.dto.Syep4000Dto;
import com.example.springbootproject.pms.sy.sm.dto.Sysm2000Dto;
import com.example.springbootproject.pms.sy.sm.dto.Sysm2020Dto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface Syep4000Mapper {
    List<Syep4000Dto> selectAll();
    List<Sysm2020Dto> selectUserRoles(String userId);
    List<Sysm2000Dto> getAllRoles();
}