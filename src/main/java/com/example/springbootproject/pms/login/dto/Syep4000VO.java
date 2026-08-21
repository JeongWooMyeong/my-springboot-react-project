package com.example.springbootproject.pms.login.dto;


import com.example.springbootproject.pms.sy.sm.dto.Sysm2000Dto;
import com.example.springbootproject.pms.sy.sm.dto.Sysm2010Dto;

import java.util.List;

public class Syep4000VO {
    private String userid;
    private String password;
    private String username;
    private String token;

    // ✅ 추가
    private String roleno;                  // 역할 번호
    private String roleName;                // 역할 이름
    private List<Sysm2000Dto> roles;  // 메뉴별 권한 리스트
    private String jijumcd;
    private String coid;
    private String refreshToken;

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getCoid() {
        return coid;
    }

    public void setCoid(String coid) {
        this.coid = coid;
    }

    public String getJijumcd() {
        return jijumcd;
    }

    public void setJijumcd(String jijumcd) {
        this.jijumcd = jijumcd;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRoleno() {
        return roleno;
    }

    public void setRoleno(String roleno) {
        this.roleno = roleno;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public List<Sysm2000Dto> getRoles() {
        return roles;
    }

    public void setRoles(List<Sysm2000Dto> roles) {
        this.roles = roles;
    }
}
