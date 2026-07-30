package com.example.springbootproject.pms.pp.po.producer;

import com.example.springbootproject.pms.pp.po.event.PdfGenerateJob;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PdfJobProducer {

    private final KafkaTemplate<String, PdfGenerateJob> kafkaTemplate;


    public void send(PdfGenerateJob job){

        kafkaTemplate.send(
                "pdf-generate-request",
                job.getJobid(),
                job
        );

    }
}