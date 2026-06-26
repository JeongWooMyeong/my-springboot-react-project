package com.example.springbootproject.pms.sy.ep.controller;

import com.example.springbootproject.pms.sy.ep.dto.Syep1000Dto;
import com.example.springbootproject.pms.sy.ep.service.Syep1000Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/jijum")
public class Syep1000Controller {

    private final Syep1000Service syep1000Service;

    public Syep1000Controller(Syep1000Service syep1000Service) {
        this.syep1000Service = syep1000Service;
    }

    @GetMapping
    public List<Syep1000Dto> getAllJijum() {
        return syep1000Service.getAllJijum();
    }
}