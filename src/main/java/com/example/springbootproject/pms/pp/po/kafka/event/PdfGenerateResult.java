package com.example.springbootproject.pms.pp.po.kafka.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PdfGenerateResult {

    private String jobid;

    private String status;

    private String downloadUrl;

    private String message;

    private List<PdfPreviewFile> files;

}