package com.example.springbootproject.pms.pp.po.service.pdf;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface PdfNotifyService {


    SseEmitter subscribe(
            String jobid
    );


    void sendComplete(
            String jobid,
            String downloadUrl
    );


    void sendFail(
            String jobid,
            String message
    );

}