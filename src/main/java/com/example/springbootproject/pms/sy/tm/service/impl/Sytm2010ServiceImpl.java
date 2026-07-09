package com.example.springbootproject.pms.sy.tm.service.impl;

import com.example.springbootproject.pms.sy.tm.dto.Sytm2000Dto;
import com.example.springbootproject.pms.sy.tm.service.Sytm2010Service;
import com.example.springbootproject.pms.sy.tm.service.dao.Sytm2010Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class Sytm2010ServiceImpl implements Sytm2010Service {
    private final Sytm2010Mapper mapper;

    @Override
    public List<Sytm2000Dto> getTemplatesByCategory(Long clCd) {
        return mapper.selectTemplatesByCategory(clCd);
    }

    @Override
    public List<Sytm2000Dto> getActiveTemplatesByCategory(Long clCd) {
        return mapper.selectActiveTemplatesByCategory(clCd);
    }

    @Override
    public int setTemplateActive(Long templateId, Long clCd, boolean active) {
        if (active) {
            return mapper.insertTemplateActive(templateId, clCd);
        } else {
            return mapper.deleteTemplateActive(templateId, clCd);
        }
    }
}
