package com.example.springbootproject.pms.sy.tm.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Sytm1010Dto {
    private String clcd;      // 분류 코드
    private String jijumcd;   // 지점 코드 (ALL 포함)
    private String coid;      // 회사 ID
    private String ntnid;     // 국가 ID
    private String upddate;   // 수정일자
    private String updpn;     // 수정자

    private List<String> clcds;
}
