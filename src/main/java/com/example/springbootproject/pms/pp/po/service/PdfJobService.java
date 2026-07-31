package com.example.springbootproject.pms.pp.po.service;

import com.example.springbootproject.pms.pp.po.dto.PdfJobDto;

import java.util.List;

public interface PdfJobService {

    void insertJob(
            PdfJobDto dto
    );


    void saveResult(
            String jobid,
            byte[] result,
            String extension
    );


    void start(
            String jobid
    );


    void complete(
            String jobid
    );


    void fail(
            String jobid,
            String errorMessage
    );


    PdfJobDto findByJobid(
            String jobid
    );

    List<PdfJobDto> findTimeoutJobs();

    void updateHeartbeat(
            String jobid
    );

}