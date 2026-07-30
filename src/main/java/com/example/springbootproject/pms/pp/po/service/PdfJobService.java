package com.example.springbootproject.pms.pp.po.service;

import com.example.springbootproject.pms.pp.po.dto.PdfJobDto;

public interface PdfJobService {

    void insertJob(
            PdfJobDto dto
    );

    void saveResult(
            String jobid,
            byte[] result
    );


    void updateStatus(
            String jobid,
            String status
    );

    PdfJobDto findByJobid(
            String jobid
    );

}