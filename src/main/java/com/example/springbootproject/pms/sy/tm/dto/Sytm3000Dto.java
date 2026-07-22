package com.example.springbootproject.pms.sy.tm.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class Sytm3000Dto {
    private Integer fontid;


    private String fontfamily;


    private String fontfilename;

    private String fontfullname;


    private String fontfilepath;


    private Integer fontweight;


    private String fontstyle;


    private String useyn;


    private String regid;


    private LocalDateTime regdt;

}
