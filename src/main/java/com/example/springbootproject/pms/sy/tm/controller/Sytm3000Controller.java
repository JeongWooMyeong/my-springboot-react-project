package com.example.springbootproject.pms.sy.tm.controller;

import com.example.springbootproject.pms.sy.tm.dto.Sytm3000Dto;
import com.example.springbootproject.pms.sy.tm.service.Sytm3000Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/sytm3000")
@RequiredArgsConstructor
public class Sytm3000Controller {


    private final Sytm3000Service sytm3000Service;



    /**
     * 폰트 목록
     */
    @GetMapping("/fonts")
    public List<Sytm3000Dto> getFontList(){


        return sytm3000Service.getFontList();

    }





    /**
     * 폰트 업로드
     */
    @PostMapping("/fonts/upload")
    public void uploadFont(
            @RequestParam("file")
            MultipartFile file
    ) throws Exception {

        System.out.println("UPLOAD START");


        System.out.println(
                file.getOriginalFilename()
        );


        sytm3000Service.uploadFont(file);


    }




    /**
     * 폰트 삭제
     */
    @DeleteMapping("/fonts/{fontId}")
    public void deleteFont(
            @PathVariable Integer fontId
    ){

        sytm3000Service.deleteFont(fontId);


    }


}