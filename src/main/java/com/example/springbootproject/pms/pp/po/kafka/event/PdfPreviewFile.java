package com.example.springbootproject.pms.pp.po.kafka.event;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PdfPreviewFile {

    private String ordno;

    private String url;
}