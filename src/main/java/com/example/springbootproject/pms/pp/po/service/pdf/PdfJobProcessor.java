package com.example.springbootproject.pms.pp.po.service.pdf;

import com.example.springbootproject.pms.pp.po.kafka.event.PdfGenerateJob;

public interface PdfJobProcessor {

    void process(PdfGenerateJob job);

}