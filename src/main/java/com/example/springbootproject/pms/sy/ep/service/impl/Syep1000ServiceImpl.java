package com.example.springbootproject.pms.sy.ep.service.impl;

import com.example.springbootproject.pms.sy.ep.dto.Syep1000Dto;
import com.example.springbootproject.pms.sy.ep.service.Syep1000Service;
import com.example.springbootproject.pms.sy.ep.service.dao.Syep1000Mapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Syep1000ServiceImpl implements Syep1000Service {
    private final Syep1000Mapper syep1000Mapper;

    public Syep1000ServiceImpl(Syep1000Mapper syep1000Mapper) {
        this.syep1000Mapper = syep1000Mapper;
    }

    @Override
    public List<Syep1000Dto> getAllJijum() {
        return syep1000Mapper.selectAll();
    }
}
