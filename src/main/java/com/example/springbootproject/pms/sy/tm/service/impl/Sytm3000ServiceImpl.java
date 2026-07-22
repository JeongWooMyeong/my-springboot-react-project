package com.example.springbootproject.pms.sy.tm.service.impl;

import com.example.springbootproject.pms.sy.tm.dto.Sytm3000Dto;
import com.example.springbootproject.pms.sy.tm.service.Sytm3000Service;
import com.example.springbootproject.pms.sy.tm.service.dao.Sytm3000Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class Sytm3000ServiceImpl
        implements Sytm3000Service {



    private final Sytm3000Mapper sytm3000Mapper;

    @Value("${font.upload.path}")
    private String uploadPath;





    @Override
    public List<Sytm3000Dto> getFontList(){


        return sytm3000Mapper.selectFontList();

    }





    @Override
    public void uploadFont(MultipartFile file) throws Exception {


        // 폴더 없으면 생성
        File uploadDir = new File(uploadPath);

        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }


        String filename = file.getOriginalFilename();


        // 실제 저장 파일
        File saveFile = new File(
                uploadDir,
                filename
        );


        // 실제 파일 저장
        file.transferTo(saveFile);



        Sytm3000Dto dto = new Sytm3000Dto();


        dto.setFontfilename(filename);


        dto.setFontfamily(
                extractFontFamily(filename)
        );


        // DB 저장 경로
//        dto.setFontfilepath(
//                saveFile.getAbsolutePath()
//        );
        dto.setFontfilepath("/upload/fonts/" + filename);


        dto.setFontweight(400);

        dto.setFontstyle("NORMAL");

        dto.setRegid("SYSTEM");


        sytm3000Mapper.insertFont(dto);

    }


    @Override
    public void deleteFont(
            Integer fontid
    ){


        sytm3000Mapper.deleteFont(
                fontid
        );

    }





    private String extractFontFamily(
            String filename
    ){


        return filename
                .replace(".ttf","")
                .replace(".otf","");


    }



}