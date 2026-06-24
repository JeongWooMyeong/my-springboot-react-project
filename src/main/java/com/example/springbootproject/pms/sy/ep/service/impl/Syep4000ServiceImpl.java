package com.example.springbootproject.pms.sy.ep.service.impl;

import com.example.springbootproject.pms.sy.ep.dto.Syep4000Dto;
import com.example.springbootproject.pms.sy.ep.service.Syep4000Service;
import com.example.springbootproject.pms.sy.ep.service.dao.Syep4000Mapper;
import com.example.springbootproject.pms.sy.sm.dto.Sysm2000Dto;
import com.example.springbootproject.pms.sy.sm.dto.Sysm2020Dto;
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

    @Override
    public List<Sysm2020Dto> getUserRoles(String userId) {
        return syep4000Mapper.selectUserRoles(userId);
    }

    @Override
    public List<Sysm2000Dto> getAllRoles() {
        return syep4000Mapper.getAllRoles();
    }
}