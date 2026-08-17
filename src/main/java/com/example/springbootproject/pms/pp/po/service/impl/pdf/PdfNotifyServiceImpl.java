package com.example.springbootproject.pms.pp.po.service.impl.pdf;

import com.example.springbootproject.pms.pp.po.service.pdf.PdfNotifyService;
import com.example.springbootproject.pms.pp.po.service.sse.SseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class PdfNotifyServiceImpl
        implements PdfNotifyService {

    private final SseService sseService;

    @Override
    public SseEmitter subscribe(String jobid) {
        return sseService.subscribe(jobid);
    }

    @Override
    public void sendComplete(
            String jobid,
            String downloadUrl
    ) {

        sseService.send(
                jobid,
                "PDF_COMPLETE",
                Map.of(
                        "status", "COMPLETE",
                        "jobid", jobid,
                        "downloadUrl", downloadUrl
                )
        );
    }

    @Override
    public void sendFail(
            String jobid,
            String message
    ) {

        sseService.send(
                jobid,
                "PDF_FAIL",
                Map.of(
                        "status", "FAIL",
                        "message", message
                )
        );
    }
}