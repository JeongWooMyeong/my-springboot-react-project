package com.example.springbootproject.pms.sy.tm.service;

import com.example.springbootproject.pms.sy.tm.dto.Sytm2000Dto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface Sytm2000Service {
    Long create(Sytm2000Dto dto, MultipartFile thumbnail) throws Exception;

    List<Sytm2000Dto> list();

    Sytm2000Dto get(Long id);

    int update(Sytm2000Dto dto, MultipartFile thumbnail) throws Exception;

    int delete(Long id);
}
