package com.example.springbootproject.pms.sy.tm.service.dao;

import com.example.springbootproject.pms.sy.tm.dto.Sytm2000Dto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface Sytm2010Mapper {
    List<Sytm2000Dto> selectTemplatesByCategory(Long clCd);
    List<Sytm2000Dto> selectActiveTemplatesByCategory(Long clCd);
    int insertTemplateActive(@Param("templateId") Long templateId, @Param("clCd") Long clCd);
    int deleteTemplateActive(@Param("templateId") Long templateId, @Param("clCd") Long clCd);
}