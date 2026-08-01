package com.example.springbootproject.pms.sy.tm.controller;

import com.example.springbootproject.pms.sy.tm.service.TemplateImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/template/image")
@RequiredArgsConstructor
public class TemplateImageController {


    private final TemplateImageService templateImageService;



    @PostMapping("/upload")
    public ResponseEntity<?> upload(
            @RequestParam("file") MultipartFile file
    ) throws Exception {


        String url =
                templateImageService.uploadImage(file);


        return ResponseEntity.ok(
                Map.of(
                        "url", url
                )
        );

    }

}