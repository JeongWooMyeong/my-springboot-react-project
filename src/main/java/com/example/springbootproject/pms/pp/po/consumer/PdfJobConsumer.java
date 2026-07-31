package com.example.springbootproject.pms.pp.po.consumer;

import com.example.springbootproject.pms.pp.po.event.PdfGenerateJob;
import com.example.springbootproject.pms.pp.po.service.PdfJobProcessor;
import com.example.springbootproject.pms.pp.po.service.PdfJobService;
import com.example.springbootproject.pms.pp.po.service.PdfNotifyService;
import com.example.springbootproject.pms.pp.po.service.Pppo2000Service;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PdfJobConsumer {


    private final PdfJobProcessor pdfJobProcessor;


    @KafkaListener(
            topics = "pdf-generate-request",
            groupId = "pdf-worker"
    )
    public void consume(PdfGenerateJob job) {
        pdfJobProcessor.process(job);
    }
}