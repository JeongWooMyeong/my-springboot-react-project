package com.example.springbootproject.pms.sy.tm.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface TemplateNotifyService {


    SseEmitter subscribe(
            String jobId
    );


    void send(
            String jobId,
            Object message
    );

}