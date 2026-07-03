package com.example.springbootproject.pms.pp.po.service;

import com.example.springbootproject.pms.pp.po.dto.Pppo1100Dto;

public interface Pppo1100Service {
    void save(Pppo1100Dto dto);
    Pppo1100Dto findByOrdNo(String ordNo);
}
