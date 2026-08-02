package com.example.springbootproject.pms.pp.po.dto;

public class Pppo1100Dto {
    private String ordno;      // FK
    private Long templateid;

    private String data;       // JSON string (productData)

    private Integer seq;

    public Integer getSeq() {
        return seq;
    }

    public void setSeq(Integer seq) {
        this.seq = seq;
    }

    public String getOrdno() {
        return ordno;
    }

    public void setOrdno(String ordno) {
        this.ordno = ordno;
    }

    public Long getTemplateid() {
        return templateid;
    }

    public void setTemplateid(Long templateid) {
        this.templateid = templateid;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
}
