package com.example.springbootproject.pms.sy.sm.controller;

import com.example.springbootproject.pms.sy.sm.dto.Sysm1000Dto;
import com.example.springbootproject.pms.sy.sm.service.Sysm1000Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sysm1000")
public class Sysm1000Controller {
    private final Sysm1000Service sysm1000Service;

    public Sysm1000Controller(Sysm1000Service sysm1000Service){
        this.sysm1000Service = sysm1000Service;
    }

    @GetMapping("/menus")
    public List<Sysm1000Dto> getAllMenus(@RequestParam(required = false) String useYn) {

        return sysm1000Service.getAllMenus(useYn);
    }

    @GetMapping("/menus/{menuCd}")
    public Sysm1000Dto getMenuByCd(@PathVariable String menuCd) {
        return sysm1000Service.getMenuByCd(menuCd);
    }

    //등록
    @PostMapping("/menus")
    public Sysm1000Dto createMenu(@RequestBody Sysm1000Dto dto){
        sysm1000Service.createMenu(dto);
        return dto;
    }

    //수정
    @PutMapping("/menus/{menuCd}")
    public Sysm1000Dto updateMenu(@PathVariable String menuCd, @RequestBody Sysm1000Dto dto){
        sysm1000Service.updateMenu(menuCd, dto);
        return dto;
    }

    //삭제
    @DeleteMapping("/menus/{menuCd}")
    public void deleteMenu(@PathVariable String menuCd){
        sysm1000Service.deleteMenu(menuCd);
    }

}
