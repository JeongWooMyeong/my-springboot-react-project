package com.example.springbootproject.pms.sy.sm.service.impl;

import com.example.springbootproject.pms.sy.sm.dto.Sysm2000Dto;
import com.example.springbootproject.pms.sy.sm.dto.Sysm2010Dto;
import com.example.springbootproject.pms.sy.sm.service.Sysm2000Service;
import com.example.springbootproject.pms.sy.sm.service.dao.Sysm2000Mapper;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class Sysm2000ServiceImpl implements Sysm2000Service {

    @Autowired
    private Sysm2000Mapper mapper;

    @Override
    public List<Sysm2000Dto> getAllRoles() {
        return mapper.selectAll();
    }

    @Override
    public Sysm2000Dto getRoleByNo(String roleno) {
        return mapper.selectByNo(roleno);
    }

    @Override
    public void insertRole(Sysm2000Dto dto) {
        mapper.insert(dto);
    }

    @Override
    public void updateRole(Sysm2000Dto dto) {
        mapper.update(dto);
    }

    @Override
    public void deleteRole(String roleno) {
        mapper.delete(roleno);
    }

    // ✅ 권한 조회 추가
    @Override
    public List<Sysm2010Dto> getPermissions(String roleno, List<String> menuCds) {
        return mapper.selectPermissions(roleno, menuCds);
    }

    @Override
    public void savePermission(Sysm2010Dto dto) {
        mapper.savePermission(dto);
    }

    @Override
    public void deletePermission(Sysm2010Dto dto) {
        mapper.deletePermission(dto);
    }
}
