package com.example.springbootproject.pms.pp.po.service.impl;

import com.example.springbootproject.pms.pp.po.dto.PdfJobDto;
import com.example.springbootproject.pms.pp.po.enums.PdfJobStatus;
import com.example.springbootproject.pms.pp.po.service.PdfJobService;
import com.example.springbootproject.pms.pp.po.service.dao.PdfJobMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class PdfJobServiceImpl implements PdfJobService {


    private final PdfJobMapper pdfJobMapper;


    private static final String PDF_PATH =
            "/upload/pdf/";


    @Override
    public void insertJob(
            PdfJobDto dto
    ){

        pdfJobMapper.insertJob(dto);

    }


    @Override
    public void saveResult(
            String jobid,
            byte[] result,
            String extension
    ){

        try {

            File dir = new File(PDF_PATH);

            if(!dir.exists()){
                dir.mkdirs();
            }


            String filename =
                    "PDF_"
                            + LocalDateTime.now()
                            .format(
                                    DateTimeFormatter.ofPattern(
                                            "yyyyMMdd_HHmmss"
                                    )
                            )
                            + "_"
                            + UUID.randomUUID()
                            .toString()
                            .substring(0,6)
                            + extension;


            String filepath =
                    PDF_PATH + filename;


            try(FileOutputStream fos =
                        new FileOutputStream(filepath)){

                fos.write(result);

            }


            pdfJobMapper.updateResult(
                    jobid,
                    filepath,
                    filename
            );


        } catch(Exception e){

            throw new RuntimeException(
                    "PDF 파일 저장 실패",
                    e
            );

        }

    }


    @Override
    public void start(
            String jobid
    ){

        pdfJobMapper.updateStart(
                jobid,
                PdfJobStatus.PROCESSING.name()
        );

    }


    @Override
    public void complete(
            String jobid
    ){

        pdfJobMapper.updateComplete(
                jobid,
                PdfJobStatus.COMPLETE.name()
        );

    }


    @Override
    public void fail(
            String jobid,
            String errorMessage
    ){

        pdfJobMapper.updateFail(
                jobid,
                PdfJobStatus.FAIL.name(),
                errorMessage
        );

    }


    @Override
    public PdfJobDto findByJobid(
            String jobid
    ){

        return pdfJobMapper.selectJob(
                jobid
        );

    }

    @Override
    public List<PdfJobDto> findTimeoutJobs(){

        return pdfJobMapper.findTimeoutJobs();

    }

    @Override
    public void updateHeartbeat(String jobid){

        pdfJobMapper.updateHeartbeat(
                jobid
        );

    }

}