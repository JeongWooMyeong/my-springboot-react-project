package com.example.springbootproject.pms.sy.sm.service.dao;

import com.example.springbootproject.pms.sy.sm.dto.Sysm1000Dto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface Sysm1000Mapper {
    List<Sysm1000Dto> getAllMenus();
    Sysm1000Dto getMenuByCd(String menuCd);
}
