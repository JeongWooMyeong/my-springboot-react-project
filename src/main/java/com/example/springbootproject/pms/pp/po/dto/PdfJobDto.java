package com.example.springbootproject.pms.pp.po.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PdfJobDto {

    private String jobid;

    private String status;

    private String filepath;

    private String filename;

    private LocalDateTime createdAt;

    private LocalDateTime completedAt;

}