package com.example.springbootproject.pms.sy.sm.controller;

import com.example.springbootproject.pms.sy.sm.dto.Sysm2000Dto;
import com.example.springbootproject.pms.sy.sm.dto.Sysm2010Dto;
import com.example.springbootproject.pms.sy.sm.service.Sysm2000Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/sysm2000")
public class Sysm2000Controller {

    @Autowired
    private Sysm2000Service service;

    // 전체 조회
    @GetMapping("/roles")
    public List<Sysm2000Dto> getAllRoles() {
        return service.getAllRoles();
    }

    // 단건 조회
    @GetMapping("/roles/{roleno}")
    public Sysm2000Dto getRoleByNo(@PathVariable String roleno) {
        return service.getRoleByNo(roleno);
    }

    // 등록
    @PostMapping("/roles")
    public void insertRole(@RequestBody Sysm2000Dto dto) {
        service.insertRole(dto);
    }

    // 수정
    @PutMapping("/roles/{roleno}")
    public void updateRole(@PathVariable String roleno, @RequestBody Sysm2000Dto dto) {
        dto.setRoleno(roleno); // PathVariable로 받은 roleno를 DTO에 세팅
        service.updateRole(dto);
    }

    // 삭제
    @DeleteMapping("/roles/{roleno}")
    public void deleteRole(@PathVariable String roleno) {
        service.deleteRole(roleno);
    }

    // ✅ 권한 조회 (RoleNo + MenuCd)
    @GetMapping("/roles/{roleno}/permissions")
    public List<Sysm2010Dto> getRolePermissions(
            @PathVariable String roleno,
            @RequestParam List<String> menuCds) {
        return service.getPermissions(roleno, menuCds);
    }

    @PostMapping("/roles/savePermissions")
    public void savePermission(@RequestBody List<Sysm2010Dto> dtos) {
        for (Sysm2010Dto dto : dtos) {
            service.deletePermission(dto);
            service.savePermission(dto);
        }
    }
}
