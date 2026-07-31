package com.example.springbootproject.pms.pp.po.service;

import com.example.springbootproject.pms.pp.po.event.PdfGenerateJob;

public interface PdfJobProcessor {

    void process(PdfGenerateJob job);

}