package com.example.springbootproject.pms.pp.po.controller;

import com.example.springbootproject.pms.pp.po.service.pdf.PdfNotifyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/pppo2000")
@RequiredArgsConstructor
public class PdfNotifyController {


    private final PdfNotifyService pdfNotifyService;


    @GetMapping(
            value = "/pdf/subscribe/{jobid}",
            produces = "text/event-stream"
    )
    public SseEmitter subscribe(
            @PathVariable String jobid
    ){

        return pdfNotifyService.subscribe(jobid);

    }

}