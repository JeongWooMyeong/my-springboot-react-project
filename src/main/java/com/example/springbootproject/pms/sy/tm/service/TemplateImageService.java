package com.example.springbootproject.pms.sy.tm.service;

import org.springframework.web.multipart.MultipartFile;

public interface TemplateImageService {


    String uploadImage(
            MultipartFile file
    ) throws Exception;


}