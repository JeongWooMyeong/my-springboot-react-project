package com.example.springbootproject.pms.sy.ep.service.impl;

import com.example.springbootproject.pms.sy.ep.dto.Syep1000Dto;
import com.example.springbootproject.pms.sy.ep.service.Syep1000Service;
import com.example.springbootproject.pms.sy.ep.service.dao.mssql.Syep1000Mapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Override
    public Syep1000Dto getJijumById(String jijumCd) {
        return syep1000Mapper.selectById(jijumCd);
    }

    @Override
    public void insertJijum(Syep1000Dto dto) {
        syep1000Mapper.insert(dto);
    }

    @Override
    public void updateJijum(Syep1000Dto dto) {
        syep1000Mapper.update(dto);
    }
    //논리적으로 사용유무 N으로 변경
    @Override
    @Transactional
    public void deleteJijum(String jijumCd, String coid) {

        //syep1000Mapper.delete(jijumCd, coid);
        syep1000Mapper.updateUseYn(jijumCd, coid);

    }

    @Override
    public List<Syep1000Dto> getJijumByCoId(String coid) {
        return syep1000Mapper.selectByCoId(coid);   // ✅ Mapper 호출
    }

}
