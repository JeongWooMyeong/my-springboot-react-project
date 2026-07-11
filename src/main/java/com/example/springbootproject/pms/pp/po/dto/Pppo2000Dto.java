package com.example.springbootproject.pms.pp.po.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Pppo2000Dto {
    private String ordno;        // 주문번호
    private String ordstate;     // 주문상태
    private String rgdate;       // 등록일자
    private String rgr;          // 등록자
    private String upddate;      // 수정일자
    private String updpn;        // 수정자
    private String autoapvean;   // 자동승인여부
    private String jijumcd;      // 지점코드
    private String coid;         // 회사ID
    private String ntnid;        // 국가ID
    private String memo;         // 메모
    private String ordnore;      // 원주문번호
}
