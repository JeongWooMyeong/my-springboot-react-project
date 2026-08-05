package com.example.springbootproject.pms.sy.sm.service.impl;

import com.example.springbootproject.pms.sy.sm.dto.Sysm1000Dto;
import com.example.springbootproject.pms.sy.sm.service.Sysm1000Service;
import com.example.springbootproject.pms.sy.sm.service.dao.mssql.Sysm1000Mapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Sysm1000ServiceImpl implements Sysm1000Service {

    private final Sysm1000Mapper sysm1000Mapper;

    public Sysm1000ServiceImpl(Sysm1000Mapper sysm1000Mapper) {
        this.sysm1000Mapper = sysm1000Mapper;
    }

    @Override
    public List<Sysm1000Dto> getAllMenus(String useYn) {
        return sysm1000Mapper.getAllMenus(useYn);
    }

    @Override
    public Sysm1000Dto getMenuByCd(String menuCd) {
        return sysm1000Mapper.getMenuByCd(menuCd);
    }

    @Override
    public void createMenu(Sysm1000Dto dto) {
        sysm1000Mapper.createMenu(dto);   // ✅ 필드명 수정
    }

    @Override
    public void updateMenu(String menuCd, Sysm1000Dto dto) {
        dto.setMenuCd(menuCd);
        sysm1000Mapper.updateMenu(dto);   // ✅ 필드명 수정
    }

    @Override
    public void deleteMenu(String menuCd) {
        sysm1000Mapper.deleteMenu(menuCd); // ✅ 필드명 수정
    }
}