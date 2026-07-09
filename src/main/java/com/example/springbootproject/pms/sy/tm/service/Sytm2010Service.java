package com.example.springbootproject.pms.sy.tm.service;

import com.example.springbootproject.pms.sy.tm.dto.Sytm2000Dto;

import java.util.List;

public interface Sytm2010Service {
    List<Sytm2000Dto> getTemplatesByCategory(Long clCd);
    List<Sytm2000Dto> getActiveTemplatesByCategory(Long clCd);
    int setTemplateActive(Long templateId, Long clCd, boolean active);
}
