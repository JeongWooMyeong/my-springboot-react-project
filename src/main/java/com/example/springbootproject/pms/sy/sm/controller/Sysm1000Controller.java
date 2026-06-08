package com.example.springbootproject.pms.sy.sm.controller;

import com.example.springbootproject.pms.sy.sm.dto.Sysm1000Dto;
import com.example.springbootproject.pms.sy.sm.service.Sysm1000Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sysm1000")
public class Sysm1000Controller {
    private final Sysm1000Service sysm1000Service;

    public Sysm1000Controller(Sysm1000Service sysm1000Service){
        this.sysm1000Service = sysm1000Service;
    }

    @GetMapping("/menus")
    public List<Sysm1000Dto> getAllMenus() {
        return sysm1000Service.getAllMenus();
    }

    @GetMapping("/menus/{menuCd}")
    public Sysm1000Dto getMenuByCd(@PathVariable String menuCd) {
        return sysm1000Service.getMenuByCd(menuCd);
    }

}
