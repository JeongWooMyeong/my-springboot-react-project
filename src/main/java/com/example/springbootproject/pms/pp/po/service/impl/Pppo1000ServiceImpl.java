package com.example.springbootproject.pms.pp.po.service.impl;

import com.example.springbootproject.pms.pp.po.dto.Pppo1000Dto;
import com.example.springbootproject.pms.pp.po.dto.Pppo1100Dto;
import com.example.springbootproject.pms.pp.po.service.Pppo1000Service;
import com.example.springbootproject.pms.pp.po.service.dao.Pppo1000Mapper;
import com.example.springbootproject.pms.pp.po.service.dao.Pppo1100Mapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class Pppo1000ServiceImpl implements Pppo1000Service {

    private final Pppo1000Mapper p1000Mapper;
    private final Pppo1100Mapper p1100Mapper;
    private final ObjectMapper objectMapper;

    @Override
    @Transactional
    public void save(Pppo1000Dto dto) {

        // ------------------------
        // 1. 1000 저장 (헤더)
        // ------------------------
        p1000Mapper.insert(dto);

        // ------------------------
        // 2. 1100 저장 (JSON)
        // ------------------------
        try {
            Pppo1100Dto d = new Pppo1100Dto();

            d.setOrdno(dto.getOrdno());
            d.setTemplateid(dto.getTemplateid());

            // Map → JSON String
            d.setData(
                    objectMapper.writeValueAsString(dto.getData())
            );

            p1100Mapper.insert(d);

        } catch (Exception e) {
            throw new RuntimeException("1100 저장 실패", e);
        }
    }

    @Override
    public Pppo1000Dto find(String ordNo) {

        // 1. header
        Pppo1000Dto dto = p1000Mapper.select(ordNo);

        // 2. detail
        Pppo1100Dto d = p1100Mapper.findByOrdNo(ordNo);

        if (d != null) {
            try {
                dto.setTemplateid(d.getTemplateid());
                dto.setData(
                        objectMapper.readValue(d.getData(), Map.class)
                );
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        return dto;
    }
}