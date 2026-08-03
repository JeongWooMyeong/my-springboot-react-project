package com.example.springbootproject.pms.sy.tm.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TemplateActivateStatusMessage {

    private String jobId;

    private String status;

    private String message;


    public TemplateActivateStatusMessage(
            String jobId,
            String status,
            String message
    ){
        this.jobId = jobId;
        this.status = status;
        this.message = message;
    }

}