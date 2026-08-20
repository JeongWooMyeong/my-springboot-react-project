package com.example.springbootproject.pms.pp.po.kafka.consumer;

import com.example.springbootproject.pms.pp.po.kafka.event.PdfGenerateJob;
import com.example.springbootproject.pms.pp.po.service.pdf.PdfJobProcessor;
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