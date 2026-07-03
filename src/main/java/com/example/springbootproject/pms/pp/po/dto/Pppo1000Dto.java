package com.example.springbootproject.pms.pp.po.dto;

import java.util.Map;

public class Pppo1000Dto {
    private String ordno;
    private String ordstate;
    private String rgdate;
    private String rgr;
    private String upddate;
    private String updpn;
    private String autoapvean;
    private String jijumcd;
    private String coid;
    private String ntnid;
    private String memo;
    private String ordnore;

    private Long templateid;

    private Map<String, Object> data;      // JSON string (productData)


    public Long getTemplateid() {
        return templateid;
    }

    public void setTemplateid(Long templateid) {
        this.templateid = templateid;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }

    public String getOrdno() {
        return ordno;
    }

    public void setOrdno(String ordno) {
        this.ordno = ordno;
    }

    public String getOrdstate() {
        return ordstate;
    }

    public void setOrdstate(String ordstate) {
        this.ordstate = ordstate;
    }

    public String getRgdate() {
        return rgdate;
    }

    public void setRgdate(String rgdate) {
        this.rgdate = rgdate;
    }

    public String getRgr() {
        return rgr;
    }

    public void setRgr(String rgr) {
        this.rgr = rgr;
    }

    public String getUpddate() {
        return upddate;
    }

    public void setUpddate(String upddate) {
        this.upddate = upddate;
    }

    public String getUpdpn() {
        return updpn;
    }

    public void setUpdpn(String updpn) {
        this.updpn = updpn;
    }

    public String getAutoapvean() {
        return autoapvean;
    }

    public void setAutoapvean(String autoapvean) {
        this.autoapvean = autoapvean;
    }

    public String getJijumcd() {
        return jijumcd;
    }

    public void setJijumcd(String jijumcd) {
        this.jijumcd = jijumcd;
    }

    public String getCoid() {
        return coid;
    }

    public void setCoid(String coid) {
        this.coid = coid;
    }

    public String getNtnid() {
        return ntnid;
    }

    public void setNtnid(String ntnid) {
        this.ntnid = ntnid;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public String getOrdnore() {
        return ordnore;
    }

    public void setOrdnore(String ordnore) {
        this.ordnore = ordnore;
    }
}
