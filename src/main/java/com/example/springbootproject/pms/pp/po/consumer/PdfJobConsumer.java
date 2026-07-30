package com.example.springbootproject.pms.pp.po.consumer;

import com.example.springbootproject.pms.pp.po.event.PdfGenerateJob;
import com.example.springbootproject.pms.pp.po.service.PdfJobService;
import com.example.springbootproject.pms.pp.po.service.PdfNotifyService;
import com.example.springbootproject.pms.pp.po.service.Pppo2000Service;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PdfJobConsumer {


    private final Pppo2000Service pdfService;

    private final PdfJobService pdfJobService;

    private final PdfNotifyService pdfNotifyService;


    @KafkaListener(
            topics = "pdf-generate-request",
            groupId = "pdf-worker"
    )
    public void consume(PdfGenerateJob job){


        try {


            // 작업 시작
            pdfJobService.updateStatus(
                    job.getJobid(),
                    "PROCESSING"
            );


            byte[] result;


            if(job.getType() == PdfGenerateJob.GenerateType.PDF){


                result =
                        pdfService.generatePdf(
                                job.getOrdnos().get(0)
                        );


            } else {


                result =
                        pdfService.generateZip(
                                job.getOrdnos()
                        );

            }

            String extension =
                    job.getType() == PdfGenerateJob.GenerateType.PDF
                            ? ".pdf"
                            : ".zip";


            // 결과 저장
            pdfJobService.saveResult(
                    job.getJobid(),
                    result,
                    extension
            );


            // 완료 처리
            pdfJobService.updateStatus(
                    job.getJobid(),
                    "COMPLETE"
            );

            pdfNotifyService.sendComplete(
                    job.getJobid(),
                    "/api/pppo2000/pdf/download/" + job.getJobid()
            );


        } catch(Exception e){


            pdfJobService.updateStatus(
                    job.getJobid(),
                    "FAIL"
            );

            pdfNotifyService.sendFail(
                    job.getJobid(),
                    "PDF 생성 실패"
            );


            throw new RuntimeException(
                    "PDF 생성 실패",
                    e
            );

        }

    }

}