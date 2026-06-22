package com.example.springbootproject.pms.sy.ep.service.impl;

import com.example.springbootproject.pms.sy.ep.dto.Syep4000Dto;
import com.example.springbootproject.pms.sy.ep.service.Syep4000Service;
import com.example.springbootproject.pms.sy.ep.service.dao.Syep4000Mapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Syep4000ServiceImpl implements Syep4000Service {

    private final Syep4000Mapper syep4000Mapper;

    public Syep4000ServiceImpl(Syep4000Mapper syep4000Mapper) {
        this.syep4000Mapper = syep4000Mapper;
    }

    @Override
    public List<Syep4000Dto> getAllUsers() {
        return syep4000Mapper.selectAll();
    }
}