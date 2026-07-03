package com.example.springbootproject.pms.pp.po.service.impl;

import com.example.springbootproject.pms.pp.po.dto.Pppo1100Dto;
import com.example.springbootproject.pms.pp.po.service.Pppo1100Service;
import com.example.springbootproject.pms.pp.po.service.dao.Pppo1100Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class Pppo1100ServiceImpl implements Pppo1100Service {
    private final Pppo1100Mapper mapper;

    @Override
    public void save(Pppo1100Dto dto) {
        mapper.insert(dto);
    }

    @Override
    public Pppo1100Dto findByOrdNo(String ordNo) {
        return mapper.findByOrdNo(ordNo);
    }
}
