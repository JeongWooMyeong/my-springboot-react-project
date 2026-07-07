package com.example.springbootproject.pms.sy.tm.service.impl;

import com.example.springbootproject.pms.sy.tm.dto.Sytm1000Dto;
import com.example.springbootproject.pms.sy.tm.dto.Sytm1010Dto;
import com.example.springbootproject.pms.sy.tm.service.Sytm1000Service;
import com.example.springbootproject.pms.sy.tm.service.dao.Sytm1000Mapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Sytm1000ServiceImpl implements Sytm1000Service {

    private final Sytm1000Mapper mapper;

    public Sytm1000ServiceImpl(Sytm1000Mapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public List<Sytm1000Dto> getAll() {
        return mapper.selectAll();
    }

    @Override
    public void insert(Sytm1000Dto dto) {
        mapper.insert(dto);
    }

    @Override
    public void update(String clCd, Sytm1000Dto dto) {
        mapper.update(clCd, dto);
    }

    @Override
    public void delete(String clCd) {
        mapper.delete(clCd);
    }

    @Override
    public List<Sytm1010Dto> getActiveByJijum(String jijumcd) {
        return mapper.selectActiveByJijum(jijumcd);
    }

    @Override
    public void activate(List<Sytm1010Dto> dtos) {
        if(!dtos.isEmpty()) {
            mapper.deleteActive(dtos.get(0).getClcd(), dtos.get(0).getJijumcd());
        }
        for (Sytm1010Dto dto : dtos) {
            mapper.insertActive(dto);
        }
    }

    @Override
    public void deactivate(String clcd, String jijumcd) {
        mapper.deleteActive(clcd, jijumcd);
    }
}