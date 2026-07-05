package com.example.springbootproject.pms.sy.ep.service;

import com.example.springbootproject.pms.sy.ep.dto.Syep2000Dto;

import java.util.List;

public interface Syep2000Service {
    List<Syep2000Dto> getAllCompanies();
    Syep2000Dto getCompanyById(String coid);
    void insertCompany(Syep2000Dto dto);
    void updateCompany(Syep2000Dto dto);
    void deleteCompany(String coid);
}
