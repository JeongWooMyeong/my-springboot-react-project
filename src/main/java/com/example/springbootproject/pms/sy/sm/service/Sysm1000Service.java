package com.example.springbootproject.pms.sy.sm.service;

import com.example.springbootproject.pms.sy.sm.dto.Sysm1000Dto;

import java.util.List;

public interface Sysm1000Service {

    List<Sysm1000Dto> getAllMenus(String useYn);
    Sysm1000Dto getMenuByCd(String menuCd);

    void createMenu(Sysm1000Dto dto);   // 등록
    void updateMenu(String menuCd, Sysm1000Dto dto); // 수정
    void deleteMenu(String menuCd);     // 삭제


}
