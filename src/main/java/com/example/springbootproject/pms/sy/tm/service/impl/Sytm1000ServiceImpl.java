package com.example.springbootproject.pms.sy.tm.service.impl;

import com.example.springbootproject.pms.sy.tm.dto.Sytm1000Dto;
import com.example.springbootproject.pms.sy.tm.dto.Sytm1010Dto;
import com.example.springbootproject.pms.sy.tm.dto.TemplateActivateMessage;
import com.example.springbootproject.pms.sy.tm.producer.TemplateProducer;
import com.example.springbootproject.pms.sy.tm.service.Sytm1000Service;
import com.example.springbootproject.pms.sy.tm.service.dao.mssql.Sytm1000Mapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class Sytm1000ServiceImpl implements Sytm1000Service {

    private final Sytm1000Mapper mapper;
    private final TemplateProducer templateProducer;

    public Sytm1000ServiceImpl(Sytm1000Mapper mapper, TemplateProducer templateProducer) {
        this.mapper = mapper;
        this.templateProducer = templateProducer;
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
    @Transactional
    public void delete(String clCd) {
        mapper.deleteActiveClcd(clCd);
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

    @Override
    public String activateChildren(List<Sytm1010Dto> dtos) {

        // 기준 지점
        String baseJijum =
                dtos.get(0).getJijumcd();


        // 공통 파라미터
        String coid =
                dtos.get(0).getCoid();

        String ntnid =
                dtos.get(0).getNtnid();

        String updpn =
                dtos.get(0).getUpdpn();


        // 분류 리스트
        List<String> clcds =
                dtos.stream()
                        .map(Sytm1010Dto::getClcd)
                        .toList();


        // 작업 ID 생성
        String jobId =
                UUID.randomUUID().toString();



        TemplateActivateMessage message =
                new TemplateActivateMessage();


        message.setJobId(jobId);

        message.setJijumcd(baseJijum);

        message.setCoid(coid);

        message.setNtnid(ntnid);

        message.setUpdpn(updpn);

        message.setClcds(clcds);



        templateProducer.send(message);

        // 프론트가 SSE 구독할 수 있도록 반환
        return jobId;
    }

    @Override
    public void addClassification(Sytm1000Dto dto) {
        mapper.insertClassification(dto);
    }

    @Override
    public void updateClassification(Sytm1000Dto dto) {
        mapper.updateClassification(dto);
    }

    @Override
    public void deleteClassification(List<String> clcds) {
        mapper.deleteActiveClassification(clcds);
        mapper.deleteClassification(clcds);
    }

}