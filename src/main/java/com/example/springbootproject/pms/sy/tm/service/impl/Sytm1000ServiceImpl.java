package com.example.springbootproject.pms.sy.tm.service.impl;

import com.example.springbootproject.pms.sy.tm.dto.Sytm1000Dto;
import com.example.springbootproject.pms.sy.tm.dto.Sytm1010Dto;
import com.example.springbootproject.pms.sy.tm.service.Sytm1000Service;
import com.example.springbootproject.pms.sy.tm.service.dao.Sytm1000Mapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    /*@Override
    public void activateChildren(List<Sytm1010Dto> dtos) {
        // 1. 기준 지점 + 하위 지점 조회
        List<String> childJijums = mapper.findChildren(dtos.get(0).getJijumcd());

        // 2. 모든 지점에 대해 저장
        for (String jijum : childJijums) {
            mapper.deleteActive("", jijum);
            for (Sytm1010Dto dto : dtos) {
                dto.setJijumcd(jijum);
                mapper.insertActive(dto);
            }
        }

    }*/

    /*@Override
    public void activateChildren(List<Sytm1010Dto> dtos) {
        String baseJijum = dtos.get(0).getJijumcd();

        // 1. 기준 지점 + 하위 지점 조회
        List<String> childJijums = mapper.findChildren(baseJijum);

        // 2. 기존 데이터 삭제 (Batch Delete)
        List<String> clcds = dtos.stream()
                .map(Sytm1010Dto::getClcd)
                .toList();
        mapper.deleteActiveBatch(childJijums, clcds);

        // 3. 새 데이터 Insert (Batch Insert)
        List<Sytm1010Dto> saveList = new ArrayList<>();
        for (String jijum : childJijums) {
            for (Sytm1010Dto dto : dtos) {
                Sytm1010Dto newDto = new Sytm1010Dto();
                newDto.setCoid(dto.getCoid());
                newDto.setJijumcd(jijum);
                newDto.setClcd(dto.getClcd());
                newDto.setNtnid(dto.getNtnid());
                saveList.add(newDto);
            }
        }
        mapper.insertActiveBatch(saveList);
    }*/

    @Override
    public void activateChildren(List<Sytm1010Dto> dtos) {
        // 기준 지점
        String baseJijum = dtos.get(0).getJijumcd();

        // 공통 파라미터
        String coid = dtos.get(0).getCoid();
        String ntnid = dtos.get(0).getNtnid();
        String updpn = dtos.get(0).getUpdpn();

        // 분류 리스트
        List<String> clcds = dtos.stream()
                .map(Sytm1010Dto::getClcd)
                .toList();

        // 기존 데이터 삭제
        mapper.deleteActiveChildren(baseJijum);

        // 새 데이터 Insert (Insert-Select)
        mapper.insertActiveChildren(baseJijum, coid, ntnid, updpn, clcds);
    }

}