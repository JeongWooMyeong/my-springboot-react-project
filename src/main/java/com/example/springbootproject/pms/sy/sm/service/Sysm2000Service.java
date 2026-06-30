package com.example.springbootproject.pms.sy.sm.service;

import com.example.springbootproject.pms.sy.sm.dto.Sysm2000Dto;
import com.example.springbootproject.pms.sy.sm.dto.Sysm2010Dto;

import java.util.List;

public interface Sysm2000Service {
    List<Sysm2000Dto> getAllRoles();
    Sysm2000Dto getRoleByNo(String roleno);
    void insertRole(Sysm2000Dto dto);
    void updateRole(Sysm2000Dto dto);
    void deleteRole(String roleno);
    // ✅ 권한 조회 추가
    List<Sysm2010Dto> getPermissions(String roleno, String menucd);
    void savePermission(Sysm2010Dto dto);
    void deletePermission(Sysm2010Dto dto);
}