package com.example.springbootproject.pms.sy.sm.service.dao;

import com.example.springbootproject.pms.sy.sm.dto.Sysm2000Dto;
import com.example.springbootproject.pms.sy.sm.dto.Sysm2010Dto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface Sysm2000Mapper {
    List<Sysm2000Dto> selectAll();
    Sysm2000Dto selectByNo(String roleno);
    void insert(Sysm2000Dto dto);
    void update(Sysm2000Dto dto);
    void delete(String roleno);
    // ✅ 권한 조회 추가
    List<Sysm2010Dto> selectPermissions(@Param("roleno") String roleno,
                                        @Param("menucd") String menucd);
    void savePermission(Sysm2010Dto dto);
    void deletePermission(Sysm2010Dto dto);
}
