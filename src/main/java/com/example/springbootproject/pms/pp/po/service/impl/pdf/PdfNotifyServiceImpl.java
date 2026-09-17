package com.example.springbootproject.pms.pp.po.service.impl.pdf;

import com.example.springbootproject.pms.pp.po.kafka.event.PdfPreviewFile;
import com.example.springbootproject.pms.pp.po.service.pdf.PdfNotifyService;
import com.example.springbootproject.pms.pp.po.service.sse.SseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.HashMap;
import java.util.List;
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
            String downloadUrl,
            List<PdfPreviewFile> files,
            String allDownloadUrl
    ) {

        Map<String, Object> data = new HashMap<>();

        data.put("status", "COMPLETE");
        data.put("jobid", jobid);
        data.put("downloadUrl", downloadUrl);
        data.put("files", files);
        data.put("allDownloadUrl", allDownloadUrl);

        sseService.send(
                jobid,
                "PDF_COMPLETE",
                data
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