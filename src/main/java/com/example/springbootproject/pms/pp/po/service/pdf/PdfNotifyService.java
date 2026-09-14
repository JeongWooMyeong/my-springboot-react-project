package com.example.springbootproject.pms.pp.po.service.pdf;

import com.example.springbootproject.pms.pp.po.kafka.event.PdfPreviewFile;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

public interface PdfNotifyService {


    SseEmitter subscribe(
            String jobid
    );


    void sendComplete(
            String jobid,
            String downloadUrl,
            List<PdfPreviewFile> files
    );


    void sendFail(
            String jobid,
            String message
    );

}