package com.example.springbootproject.pms.sy.tm.service.dao;

import com.example.springbootproject.pms.sy.tm.dto.Sytm3000Dto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface Sytm3000Mapper {



    List<Sytm3000Dto> selectFontList();




    int insertFont(
            Sytm3000Dto dto
    );




    int deleteFont(
            Integer fontid
    );

    Sytm3000Dto selectFontByFamily(
            String fontfamily
    );

}