package com.example.springbootproject.pms.pp.po.controller;

import com.example.springbootproject.pms.pp.po.dto.PdfJobDto;
import com.example.springbootproject.pms.pp.po.dto.Pppo2000DetailDto;
import com.example.springbootproject.pms.pp.po.dto.Pppo2000Dto;
import com.example.springbootproject.pms.pp.po.event.PdfGenerateJob;
import com.example.springbootproject.pms.pp.po.producer.PdfJobProducer;
import com.example.springbootproject.pms.pp.po.service.PdfJobService;
import com.example.springbootproject.pms.pp.po.service.Pppo2000Service;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.Arrays;
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

    //신청 내역 리스트
    @GetMapping("/list")
    public List<Pppo2000Dto> getRequestList() {
        return pppo2000Service.getRequestList();
    }

    // 특정 신청 건 상세 (템플릿 데이터 포함)
    @GetMapping("/{ordno}")
    public Pppo2000DetailDto getRequestDetail(@PathVariable String ordno) {
        return pppo2000Service.getRequestDetail(ordno);
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
    ){

        PdfJobDto job =
                pdfJobService.findByJobid(jobid);


        if(job == null){

            return ResponseEntity.notFound().build();

        }


        File file =
                new File(
                        job.getFilepath()
                );


        if(!file.exists()){

            return ResponseEntity.notFound().build();

        }


        Resource resource =
                new FileSystemResource(file);


        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + file.getName() + "\""
                )
                .contentType(
                        MediaType.APPLICATION_OCTET_STREAM
                )
                .body(resource);

    }

}
