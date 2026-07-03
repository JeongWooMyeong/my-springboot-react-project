package com.example.springbootproject.pms.sy.tm.controller;

import com.example.springbootproject.pms.sy.tm.dto.Sytm2000Dto;
import com.example.springbootproject.pms.sy.tm.service.Sytm2000Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sytm2000")
@RequiredArgsConstructor
public class Sytm2000Controller {

    private final Sytm2000Service service;

    @PostMapping
    public Long create(@RequestBody Map<String, Object> param) {
        return service.create(param);
    }

    @GetMapping
    public List<Sytm2000Dto> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public Sytm2000Dto get(@PathVariable Long id) {
        return service.get(id);
    }

    @PutMapping("/{id}")
    public int update(@PathVariable Long id,
                      @RequestBody Map<String, Object> param) {
        return service.update(id, param);
    }

    @DeleteMapping("/{id}")
    public int delete(@PathVariable Long id) {
        return service.delete(id);
    }
}