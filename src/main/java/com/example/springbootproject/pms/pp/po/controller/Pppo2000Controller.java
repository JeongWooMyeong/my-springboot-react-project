package com.example.springbootproject.pms.pp.po.controller;

import com.example.springbootproject.pms.pp.po.dto.PdfJobDto;
import com.example.springbootproject.pms.pp.po.dto.Pppo2000DetailDto;
import com.example.springbootproject.pms.pp.po.dto.Pppo2000Dto;
import com.example.springbootproject.pms.pp.po.dto.Pppo2000PreviewDto;
import com.example.springbootproject.pms.pp.po.event.PdfGenerateJob;
import com.example.springbootproject.pms.pp.po.producer.PdfJobProducer;
import com.example.springbootproject.pms.pp.po.service.PdfJobService;
import com.example.springbootproject.pms.pp.po.service.Pppo2000Service;
import com.example.springbootproject.pms.common.storage.service.MinioStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/pppo2000")
@RequiredArgsConstructor
public class Pppo2000Controller {
    private final Pppo2000Service pppo2000Service;
    private final PdfJobService pdfJobService;
    private final PdfJobProducer pdfJobProducer;
    private final MinioStorageService minioStorageService;

    //신청 내역 리스트
    @GetMapping("/list")
    public List<Pppo2000Dto> getRequestList() {
        return pppo2000Service.getRequestList();
    }

    // 특정 신청 건 상세 (템플릿 데이터 포함)
    @GetMapping("/{ordno}")
    public Pppo2000PreviewDto getRequestDetail(@PathVariable String ordno) {
        return pppo2000Service.getRequestDetailList(ordno);
    }

    // 조회 API (지점, 상태 필터)
    @GetMapping("/search")
    public List<Pppo2000Dto> searchRequests(
            @RequestParam(required = false) String jijumcd,
            @RequestParam(required = false) String status
    ) {
        return pppo2000Service.searchRequests(jijumcd, status);
    }

    // 단건 PDF 생성
    @PostMapping("/pdf")
    public ResponseEntity<?> generatePdf(
            @RequestBody Map<String, String> req
    ) {

        String ordno = req.get("ordno");


        String jobid =
                UUID.randomUUID().toString();


        PdfJobDto job =
                new PdfJobDto();

        job.setJobid(jobid);
        job.setStatus("REQUEST");


        pdfJobService.insertJob(job);



        PdfGenerateJob event =
                new PdfGenerateJob();

        event.setJobid(jobid);
        event.setOrdnos(
                List.of(ordno)
        );

        event.setType(
                PdfGenerateJob.GenerateType.PDF
        );


        pdfJobProducer.send(event);



        return ResponseEntity.ok(
                Map.of(
                        "jobid", jobid,
                        "status", "REQUEST"
                )
        );
    }

    // 여러건 PDF → ZIP 생성
    @PostMapping("/pdf/bulk")
    public ResponseEntity<?> generateZip(
            @RequestBody Map<String, List<String>> req
    ) {

        List<String> ordnos =
                req.get("ordnos");


        String jobid =
                UUID.randomUUID().toString();


        PdfJobDto job =
                new PdfJobDto();

        job.setJobid(jobid);
        job.setStatus("REQUEST");


        pdfJobService.insertJob(job);



        PdfGenerateJob event =
                new PdfGenerateJob();


        event.setJobid(jobid);

        event.setOrdnos(ordnos);


        event.setType(
                PdfGenerateJob.GenerateType.ZIP
        );


        pdfJobProducer.send(event);



        return ResponseEntity.ok(
                Map.of(
                        "jobid", jobid,
                        "status", "REQUEST"
                )
        );
    }

    // 승인/반려 처리 (여러 건 일괄 업데이트)
    @PostMapping("/update")
    public ResponseEntity<Map<String, Object>> updateOrdstate(@RequestBody Map<String, Object> req) {
        List<String> ordnos = (List<String>) req.get("ordnos");
        Integer ordstate = (Integer) req.get("ordstate");

        pppo2000Service.updateOrdstate(ordnos, ordstate);

        Map<String, Object> result = Map.of(
                "success", true,
                "message", "처리 완료"
        );

        return ResponseEntity.ok(result);
    }

    @GetMapping("/pdf/download/{jobid}")
    public ResponseEntity<Resource> downloadPdf(
            @PathVariable String jobid
    ) throws Exception {

        PdfJobDto job =
                pdfJobService.findByJobid(jobid);


        if (job == null) {

            return ResponseEntity.notFound().build();

        }


        /*
         * DB에 저장된 MinIO Object 경로
         *
         * 예:
         * pdf/PDF_20260813_123456_abc123.pdf
         */
        String objectName =
                job.getFilepath();


        if (objectName == null ||
                objectName.isBlank()) {

            return ResponseEntity.notFound().build();

        }


        /*
         * MinIO에서 파일 조회
         */
        InputStream resource =
                minioStorageService.getInputStream(
                        objectName
                );


        /*
         * 파일명
         */
        String filename =
                job.getFilepath();


        if (filename == null ||
                filename.isBlank()) {

            filename =
                    objectName.substring(
                            objectName.lastIndexOf("/") + 1
                    );
        }


        /*
         * PDF / ZIP Content-Type
         */
        MediaType mediaType =
                objectName.toLowerCase()
                        .endsWith(".zip")
                        ? MediaType.APPLICATION_OCTET_STREAM
                        : MediaType.APPLICATION_PDF;


        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" +
                                filename +
                                "\""
                )
                .contentType(mediaType)
                .body(
                        new InputStreamResource(
                                resource
                        )
                );

    }

}