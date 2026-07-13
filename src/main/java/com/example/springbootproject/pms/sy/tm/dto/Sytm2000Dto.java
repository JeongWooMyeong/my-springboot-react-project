package com.example.springbootproject.pms.sy.tm.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class Sytm2000Dto {

    private Long id;

    private String title;

    private String canvasData;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String thumbnailpath;

    // template_active 테이블 컬럼 추가
    private Long tmpno;           // template_active.TmpNo (FK → Template.id)
    private String upddate;       // template_active.UpdDate
    private String updpn;         // template_active.Updpn
    private Long clcd;            // template_active.ClCd

    // ✅ 용지 크기 관련 필드 추가
    private String papersize;     // "A4", "Letter" 등 문자열
    private Double paperwidth;  // mm 단위 너비
    private Double paperheight; // mm 단위 높이


}