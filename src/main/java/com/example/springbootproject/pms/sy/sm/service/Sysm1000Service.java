package com.example.springbootproject.pms.sy.sm.service;

import com.example.springbootproject.pms.sy.sm.dto.Sysm1000Dto;

import java.util.List;

public interface Sysm1000Service {

    List<Sysm1000Dto> getAllMenus();
    Sysm1000Dto getMenuByCd(String menuCd);

}
