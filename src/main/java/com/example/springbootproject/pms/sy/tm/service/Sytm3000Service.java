package com.example.springbootproject.pms.sy.tm.service;

import com.example.springbootproject.pms.sy.tm.dto.Sytm3000Dto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface Sytm3000Service {
    List<Sytm3000Dto> getFontList();



    void uploadFont(
            MultipartFile file
    ) throws Exception;



    void deleteFont(
            Integer fontId
    );
}
