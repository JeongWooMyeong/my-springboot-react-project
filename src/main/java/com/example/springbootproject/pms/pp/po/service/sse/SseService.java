package com.example.springbootproject.pms.pp.po.service.sse;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface SseService {

    SseEmitter subscribe(String key);

    void send(
            String key,
            String eventName,
            Object data
    );
}