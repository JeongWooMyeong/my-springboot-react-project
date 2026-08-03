package com.example.springbootproject.pms.sy.tm.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TemplateActivateMessage {

    private String jijumcd;

    private String coid;

    private String ntnid;

    private String updpn;

    private List<String> clcds;

    private String jobId;
}