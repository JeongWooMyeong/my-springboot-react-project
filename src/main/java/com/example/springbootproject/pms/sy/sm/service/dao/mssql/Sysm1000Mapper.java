package com.example.springbootproject.pms.sy.sm.service.dao.mssql;

import com.example.springbootproject.pms.sy.sm.dto.Sysm1000Dto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface Sysm1000Mapper {
    List<Sysm1000Dto> getAllMenus(@Param("useYn") String useYn);
    Sysm1000Dto getMenuByCd(String menuCd);
    // 등록
    int createMenu(Sysm1000Dto dto);

    // 수정
    int updateMenu(Sysm1000Dto dto);

    // 삭제
    int deleteMenu(String menuCd);
}
