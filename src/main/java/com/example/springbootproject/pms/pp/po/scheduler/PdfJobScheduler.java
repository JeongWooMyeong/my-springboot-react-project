package com.example.springbootproject.pms.pp.po.scheduler;

import com.example.springbootproject.pms.pp.po.dto.PdfJobDto;
import com.example.springbootproject.pms.pp.po.service.PdfJobService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class PdfJobScheduler {


    private final PdfJobService pdfJobService;


    @Scheduled(
            fixedDelay = 600000
    )
    public void checkTimeoutJob(){


        List<PdfJobDto> jobs =
                pdfJobService.findTimeoutJobs();


        for(PdfJobDto job : jobs){


            log.warn(
                    "PDF 작업 시간 초과 jobId={}",
                    job.getJobid()
            );


            pdfJobService.fail(
                    job.getJobid(),
                    "PDF 생성 시간 초과"
            );

        }

    }

}