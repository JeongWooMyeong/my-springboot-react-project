package com.example.springbootproject.pms.sy.tm.service;

import com.example.springbootproject.pms.sy.tm.dto.Sytm2000Dto;

import java.util.List;
import java.util.Map;

public interface Sytm2000Service {
    Long create(Map<String, Object> param);

    List<Sytm2000Dto> list();

    Map<String, Object> get(Long id);

    int update(Long id, Map<String, Object> param);

    int delete(Long id);
}
