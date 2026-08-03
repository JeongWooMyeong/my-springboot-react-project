package com.example.springbootproject.pms.sy.tm.service.impl;

import com.example.springbootproject.pms.sy.tm.service.TemplateNotifyService;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@Service
public class TemplateNotifyServiceImpl
        implements TemplateNotifyService {


    private final Map<String, List<SseEmitter>> emitters =
            new ConcurrentHashMap<>();



    @Override
    public SseEmitter subscribe(
            String jobId
    ){

        SseEmitter emitter =
                new SseEmitter(
                        60 * 60 * 1000L
                );


        emitters
                .computeIfAbsent(
                        jobId,
                        key -> new ArrayList<>()
                )
                .add(emitter);



        emitter.onCompletion(
                () -> remove(
                        jobId,
                        emitter
                )
        );


        emitter.onTimeout(
                () -> remove(
                        jobId,
                        emitter
                )
        );


        return emitter;

    }



    @Override
    public void send(
            String jobId,
            Object message
    ){

        List<SseEmitter> list =
                emitters.get(jobId);



        if(list == null)
            return;



        for(SseEmitter emitter : list){

            try {

                emitter.send(
                        message
                );


            } catch(Exception e){

                remove(
                        jobId,
                        emitter
                );

            }

        }

    }



    private void remove(
            String jobId,
            SseEmitter emitter
    ){

        List<SseEmitter> list =
                emitters.get(jobId);


        if(list != null){

            list.remove(
                    emitter
            );


            if(list.isEmpty()){

                emitters.remove(
                        jobId
                );

            }

        }

    }

}