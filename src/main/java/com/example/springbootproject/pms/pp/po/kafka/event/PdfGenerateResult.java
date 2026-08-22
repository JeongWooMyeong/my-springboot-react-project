package com.example.springbootproject.pms.pp.po.kafka.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PdfGenerateResult {

    private String jobid;

    private String status;

    private String downloadUrl;

    private String message;

}