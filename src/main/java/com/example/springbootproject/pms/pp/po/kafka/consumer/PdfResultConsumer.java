package com.example.springbootproject.pms.pp.po.kafka.consumer;

import com.example.springbootproject.pms.pp.po.kafka.event.PdfGenerateResult;
import com.example.springbootproject.pms.pp.po.service.pdf.PdfNotifyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PdfResultConsumer {

    private final PdfNotifyService pdfNotifyService;


    @KafkaListener(
            topics = "pdf-generate-result",
            groupId = "pdf-result-consumer"
    )
    public void consume(PdfGenerateResult result) {

        log.info(
                "PDF 결과 수신. jobId={}, status={}, downloadurl={}, alldownloadurl={}",
                result.getJobid(),
                result.getStatus(),
                result.getDownloadUrl(),
                result.getAllDownloadUrl()
        );


        if ("COMPLETE".equals(result.getStatus())) {

            pdfNotifyService.sendComplete(
                    result.getJobid(),
                    result.getDownloadUrl(),
                    result.getFiles(),
                    result.getAllDownloadUrl()
            );

        } else if ("FAIL".equals(result.getStatus())) {

            pdfNotifyService.sendFail(
                    result.getJobid(),
                    result.getMessage()
            );

        }

    }

}