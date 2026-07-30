package com.example.springbootproject.pms.pp.po.service.dao;

import com.example.springbootproject.pms.pp.po.dto.PdfJobDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PdfJobMapper {


    void insertJob(
            PdfJobDto dto
    );


    void updateStatus(
            @Param("jobid") String jobid,
            @Param("status") String status
    );


    void updateResult(
            @Param("jobid") String jobid,
            @Param("filepath") String filepath,
            @Param("filename") String filename
    );

    PdfJobDto selectJob(
            @Param("jobid")
            String jobid
    );

}