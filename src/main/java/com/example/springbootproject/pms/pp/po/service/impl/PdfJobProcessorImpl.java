package com.example.springbootproject.pms.pp.po.service.impl;

import com.example.springbootproject.pms.pp.po.dto.PdfJobDto;
import com.example.springbootproject.pms.pp.po.event.PdfGenerateJob;
import com.example.springbootproject.pms.pp.po.service.PdfJobProcessor;
import com.example.springbootproject.pms.pp.po.service.PdfJobService;
import com.example.springbootproject.pms.pp.po.service.PdfNotifyService;
import com.example.springbootproject.pms.pp.po.service.Pppo2000Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class PdfJobProcessorImpl implements PdfJobProcessor {
    private final Pppo2000Service pdfService;

    private final PdfJobService pdfJobService;

    private final PdfNotifyService pdfNotifyService;

    private final ScheduledExecutorService heartbeatScheduler =
            Executors.newScheduledThreadPool(1);


    @Override
    public void process(PdfGenerateJob job) {


        String jobId = job.getJobid();

        ScheduledFuture<?> heartbeatTask = null;


        PdfJobDto currentJob =
                pdfJobService.findByJobid(jobId);


        if(currentJob == null){
            throw new RuntimeException(
                    "PDF JOB 없음"
            );
        }


        if("COMPLETE".equals(currentJob.getStatus())){

            log.info(
                    "이미 완료된 작업입니다. jobId={}",
                    jobId
            );

            return;
        }


        try {


            // 작업 시작
            pdfJobService.start(jobId);



            // heartbeat 시작
            heartbeatTask =
                    heartbeatScheduler.scheduleAtFixedRate(
                            () -> {

                                try {

                                    pdfJobService.updateHeartbeat(
                                            jobId
                                    );


                                    log.info(
                                            "PDF heartbeat update jobId={}",
                                            jobId
                                    );


                                } catch(Exception e){

                                    log.error(
                                            "heartbeat 실패 jobId={}",
                                            jobId,
                                            e
                                    );

                                }

                            },
                            5,
                            5,
                            TimeUnit.MINUTES
                    );



            byte[] result;


            if(job.getType()
                    == PdfGenerateJob.GenerateType.PDF){


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
                    job.getType()
                            == PdfGenerateJob.GenerateType.PDF
                            ? ".pdf"
                            : ".zip";



            pdfJobService.saveResult(
                    jobId,
                    result,
                    extension
            );



            pdfJobService.complete(jobId);



            pdfNotifyService.sendComplete(
                    jobId,
                    "/api/pppo2000/pdf/download/" + jobId
            );



        } catch(Exception e) {


            log.error(
                    "PDF 생성 실패 jobId={}",
                    jobId,
                    e
            );


            pdfJobService.fail(
                    jobId,
                    e.getMessage()
            );


            pdfNotifyService.sendFail(
                    jobId,
                    "PDF 생성 실패"
            );


            throw new RuntimeException(
                    "PDF 생성 실패",
                    e
            );


        } finally {


            // heartbeat 종료
            if(heartbeatTask != null){

                heartbeatTask.cancel(
                        true
                );

            }

        }

    }
}
