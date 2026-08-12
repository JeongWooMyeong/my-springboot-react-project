package com.example.springbootproject.pms.pp.po.service.impl;

import com.example.springbootproject.pms.pp.po.dto.PdfJobDto;
import com.example.springbootproject.pms.pp.po.enums.PdfJobStatus;
import com.example.springbootproject.pms.pp.po.service.PdfJobService;
import com.example.springbootproject.pms.pp.po.service.dao.mssql.PdfJobMapper;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PdfJobServiceImpl implements PdfJobService {

    private final PdfJobMapper pdfJobMapper;

    private final MinioClient minioClient;

    @Value("${storage.bucket}")
    private String bucketName;


    @Override
    public void insertJob(
            PdfJobDto dto
    ) {

        pdfJobMapper.insertJob(dto);

    }


    @Override
    public void saveResult(
            String jobid,
            byte[] result,
            String extension
    ) {

        try {

            /*
             * 파일명 생성
             */
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
                            .substring(0, 6)
                            + extension;


            /*
             * MinIO Object 경로
             *
             * bucket
             *   └── pdf/
             *       └── PDF_xxx.pdf
             */
            String objectName =
                    "pdf/" + filename;


            /*
             * byte[] → MinIO 업로드
             */
            try (ByteArrayInputStream inputStream =
                         new ByteArrayInputStream(result)) {

                minioClient.putObject(
                        PutObjectArgs.builder()
                                .bucket(bucketName)
                                .object(objectName)
                                .stream(
                                        inputStream,
                                        (long)result.length,
                                (long)10 * 1024 * 1024
                                )
                                .contentType(
                                        getContentType(extension)
                                )
                                .build()
                );

            }


            /*
             * DB에는 실제 파일 자체가 아니라
             * MinIO Object 정보 저장
             */
            pdfJobMapper.updateResult(
                    jobid,
                    objectName,
                    filename
            );


        } catch (Exception e) {

            throw new RuntimeException(
                    "PDF 파일 MinIO 저장 실패",
                    e
            );

        }

    }


    /**
     * 확장자에 따른 Content-Type
     */
    private String getContentType(
            String extension
    ) {

        if (".pdf".equalsIgnoreCase(extension)) {

            return "application/pdf";

        }

        if (".zip".equalsIgnoreCase(extension)) {

            return "application/zip";

        }

        return "application/octet-stream";

    }


    @Override
    public void start(
            String jobid
    ) {

        pdfJobMapper.updateStart(
                jobid,
                PdfJobStatus.PROCESSING.name()
        );

    }


    @Override
    public void complete(
            String jobid
    ) {

        pdfJobMapper.updateComplete(
                jobid,
                PdfJobStatus.COMPLETE.name()
        );

    }


    @Override
    public void fail(
            String jobid,
            String errorMessage
    ) {

        pdfJobMapper.updateFail(
                jobid,
                PdfJobStatus.FAIL.name(),
                errorMessage
        );

    }


    @Override
    public PdfJobDto findByJobid(
            String jobid
    ) {

        return pdfJobMapper.selectJob(
                jobid
        );

    }


    @Override
    public List<PdfJobDto> findTimeoutJobs() {

        return pdfJobMapper.findTimeoutJobs();

    }


    @Override
    public void updateHeartbeat(
            String jobid
    ) {

        pdfJobMapper.updateHeartbeat(
                jobid
        );

    }

}