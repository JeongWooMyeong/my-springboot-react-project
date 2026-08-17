package com.example.springbootproject.pms.pp.po.service.impl.sse;

import com.example.springbootproject.pms.pp.po.service.sse.SseService;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SseServiceImpl implements SseService {

    private final Map<String, SseEmitter> emitters =
            new ConcurrentHashMap<>();

    @Override
    public SseEmitter subscribe(String key) {

        SseEmitter emitter =
                new SseEmitter(60 * 60 * 1000L);

        emitters.put(key, emitter);

        emitter.onCompletion(() ->
                emitters.remove(key)
        );

        emitter.onTimeout(() ->
                emitters.remove(key)
        );

        return emitter;
    }

    @Override
    public void send(
            String key,
            String eventName,
            Object data
    ) {

        SseEmitter emitter = emitters.get(key);

        if (emitter == null) {
            return;
        }

        try {

            emitter.send(
                    SseEmitter.event()
                            .name(eventName)
                            .data(data)
            );

            emitter.complete();

        } catch (Exception e) {

            emitter.completeWithError(e);

        }
    }
}