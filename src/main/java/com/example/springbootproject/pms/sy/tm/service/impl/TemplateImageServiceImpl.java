package com.example.springbootproject.pms.sy.tm.service.impl;

import com.example.springbootproject.pms.sy.tm.service.TemplateImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TemplateImageServiceImpl
        implements TemplateImageService {



    private final String uploadPath =
            "upload/template/";




    @Override
    public String uploadImage(
            MultipartFile file
    ) throws Exception {



        if(file == null ||
                file.isEmpty()){

            throw new RuntimeException(
                    "이미지 파일 없음"
            );

        }




        String originalName =
                file.getOriginalFilename();




        String extension = "";

        if(originalName != null){

            extension =
                    originalName.substring(
                            originalName.lastIndexOf(".")
                    );

        }




        String saveName =
                UUID.randomUUID()
                        + extension;





        File directory =
                new File(uploadPath);



        if(!directory.exists()){

            directory.mkdirs();

        }





        Path target =
                Paths.get(
                        uploadPath,
                        saveName
                );





        Files.copy(
                file.getInputStream(),
                target,
                StandardCopyOption.REPLACE_EXISTING
        );





        return
                "/upload/template/"
                        + saveName;


    }


}