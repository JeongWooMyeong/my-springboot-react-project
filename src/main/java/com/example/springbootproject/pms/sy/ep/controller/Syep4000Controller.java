package com.example.springbootproject.pms.sy.ep.controller;

import com.example.springbootproject.pms.sy.ep.dto.Syep4000Dto;
import com.example.springbootproject.pms.sy.ep.service.Syep4000Service;
import com.example.springbootproject.pms.sy.sm.dto.Sysm1000Dto;
import com.example.springbootproject.pms.sy.sm.dto.Sysm2000Dto;
import com.example.springbootproject.pms.sy.sm.dto.Sysm2020Dto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class Syep4000Controller {

    private final Syep4000Service syep4000Service;

    public Syep4000Controller(Syep4000Service syep4000Service) {
        this.syep4000Service = syep4000Service;
    }

    @GetMapping
    public List<Syep4000Dto> getUser(){
        return syep4000Service.getAllUsers();
    }

    // ⭐ 전체 ROLE LIST (추가)
    @GetMapping("/roles")
    public List<Sysm2000Dto> getAllRoles() {
        return syep4000Service.getAllRoles();
    }

    @GetMapping("/{userId}/roles")
    public List<Sysm2020Dto> getUserRoles(
            @PathVariable String userId
    ) {
        return syep4000Service.getUserRoles(userId);
    }

}
