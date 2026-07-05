package com.example.springbootproject.pms.sy.ep.controller;

import com.example.springbootproject.pms.sy.ep.dto.Syep2000Dto;
import com.example.springbootproject.pms.sy.ep.service.Syep2000Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company")
public class Syep2000Controller {

    private final Syep2000Service service;

    public Syep2000Controller(Syep2000Service service) {
        this.service = service;
    }

    @GetMapping
    public List<Syep2000Dto> getAllCompanies() {
        return service.getAllCompanies();
    }

    @GetMapping("/{coid}")
    public Syep2000Dto getCompany(@PathVariable String coid) {
        return service.getCompanyById(coid);
    }

    @PostMapping
    public void createCompany(@RequestBody Syep2000Dto dto) {
        service.insertCompany(dto);
    }

    @PutMapping("/{coid}")
    public void updateCompany(@PathVariable String coid, @RequestBody Syep2000Dto dto) {
        dto.setCoid(coid);
        service.updateCompany(dto);
    }

    @DeleteMapping("/{coid}")
    public void deleteCompany(@PathVariable String coid) {
        service.deleteCompany(coid);
    }
}