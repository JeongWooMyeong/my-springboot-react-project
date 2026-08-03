package com.example.springbootproject.pms.sy.tm.service;

import com.example.springbootproject.pms.sy.tm.dto.Sytm1000Dto;
import com.example.springbootproject.pms.sy.tm.dto.Sytm1010Dto;

import java.util.List;

public interface Sytm1000Service {
    List<Sytm1000Dto> getAll();
    void insert(Sytm1000Dto dto);
    void update(String clCd, Sytm1000Dto dto);
    void delete(String clCd);

    List<Sytm1010Dto> getActiveByJijum(String jijumcd);
    void activate(List<Sytm1010Dto> dtos);
    void deactivate(String clcd, String jijumcd);
    String activateChildren(List<Sytm1010Dto> dtos);

    void addClassification(Sytm1000Dto dto);
    void updateClassification(Sytm1000Dto dto);
    void deleteClassification(List<String> clcds);
}
