package com.example.springbootproject.pms.pp.po.service;

import com.example.springbootproject.pms.pp.po.dto.Pppo1000Dto;

public interface Pppo1000Service {
    void save(Pppo1000Dto dto);
    Pppo1000Dto find(String ordNo);
}
