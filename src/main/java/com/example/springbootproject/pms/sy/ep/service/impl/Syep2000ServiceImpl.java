package com.example.springbootproject.pms.sy.ep.service.impl;

import com.example.springbootproject.pms.sy.ep.dto.Syep2000Dto;
import com.example.springbootproject.pms.sy.ep.service.Syep2000Service;
import com.example.springbootproject.pms.sy.ep.service.dao.mssql.Syep2000Mapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Syep2000ServiceImpl implements Syep2000Service {

    private final Syep2000Mapper mapper;

    public Syep2000ServiceImpl(Syep2000Mapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public List<Syep2000Dto> getAllCompanies() {
        return mapper.selectAll();
    }

    @Override
    public Syep2000Dto getCompanyById(String coid) {
        return mapper.selectById(coid);
    }

    @Override
    public void insertCompany(Syep2000Dto dto) {
        mapper.insert(dto);
    }

    @Override
    public void updateCompany(Syep2000Dto dto) {
        mapper.update(dto);
    }

    @Override
    public void deleteCompany(String coid) {
        mapper.delete(coid);
    }
}