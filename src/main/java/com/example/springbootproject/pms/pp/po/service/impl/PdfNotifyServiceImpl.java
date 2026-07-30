package com.example.springbootproject.pms.pp.po.service.impl;

import com.example.springbootproject.pms.pp.po.service.PdfNotifyService;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class PdfNotifyServiceImpl
        implements PdfNotifyService {


    private final Map<String, SseEmitter> emitters =
            new ConcurrentHashMap<>();



    @Override
    public SseEmitter subscribe(
            String jobid
    ){


        SseEmitter emitter =
                new SseEmitter(
                        60 * 60 * 1000L
                );


        emitters.put(
                jobid,
                emitter
        );



        emitter.onCompletion(() -> {

            emitters.remove(jobid);

        });



        emitter.onTimeout(() -> {

            emitters.remove(jobid);

        });



        return emitter;

    }




    @Override
    public void sendComplete(
            String jobid,
            String downloadUrl
    ){


        SseEmitter emitter =
                emitters.get(jobid);



        if(emitter == null){
            return;
        }



        try {


            emitter.send(
                    SseEmitter.event()
                            .name("PDF_COMPLETE")
                            .data(
                                    Map.of(
                                            "status",
                                            "COMPLETE",

                                            "jobid",
                                            jobid,

                                            "downloadUrl",
                                            downloadUrl
                                    )
                            )
            );


            emitter.complete();


        }catch(Exception e){

            emitter.completeWithError(e);

        }


    }





    @Override
    public void sendFail(
            String jobid,
            String message
    ){


        SseEmitter emitter =
                emitters.get(jobid);



        if(emitter == null){
            return;
        }



        try {


            emitter.send(
                    SseEmitter.event()
                            .name("PDF_FAIL")
                            .data(
                                    Map.of(
                                            "status",
                                            "FAIL",

                                            "message",
                                            message
                                    )
                            )
            );


            emitter.complete();


        }catch(Exception e){

            emitter.completeWithError(e);

        }

    }

}