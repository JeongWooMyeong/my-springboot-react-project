package com.example.springbootproject.pms.login.service.impl;

import com.example.springbootproject.pms.login.dto.Syep1000VO;
import com.example.springbootproject.pms.login.dto.Syep4000VO;
import com.example.springbootproject.pms.login.entity.Syep4000Entity;
import com.example.springbootproject.pms.login.repository.Syep4000Repository;
import com.example.springbootproject.pms.login.service.LoginService;
import com.example.springbootproject.pms.login.service.dao.mssql.LoginMapper;
import com.example.springbootproject.pms.sy.sm.dto.Sysm2000Dto;
import com.example.springbootproject.pms.sy.sm.dto.Sysm2010Dto;
import com.example.springbootproject.pms.sy.sm.service.dao.mssql.Sysm2000Mapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginServiceImpl implements LoginService {
    private final LoginMapper loginMapper;
    private final Sysm2000Mapper sysm2000Mapper; // ✅ 주입받기
    private final Syep4000Repository syep4000Repository;

    public LoginServiceImpl(LoginMapper loginMapper, Sysm2000Mapper sysm2000Mapper, Syep4000Repository syep4000Repository){
        this.loginMapper = loginMapper;
        this.sysm2000Mapper = sysm2000Mapper;
        this.syep4000Repository = syep4000Repository;
    }

    @Override
    public Syep1000VO test(String userid){
        Syep1000VO test = loginMapper.findtest(userid);
        return test;
    }

    @Override
    public Syep4000VO getUserInfo(Syep4000VO vo){
        Syep4000VO test = loginMapper.getUserInfo(vo);
        List<Sysm2000Dto> roles = sysm2000Mapper.getUserRoles(test.getUserid());

        for (Sysm2000Dto role : roles) {
            List<Sysm2010Dto> perms = sysm2000Mapper.getPermissionsByRole(role.getRoleno());
            role.setPermissions(perms);
        }

        test.setRoles(roles);

        return test;
    }

    @Override
    public Syep4000VO getUserInfoByUserid(String userid) {

        Syep4000Entity entity =
                syep4000Repository.findById(userid)
                        .orElseThrow(() ->
                                new RuntimeException("사용자 없음"));

        Syep4000VO vo = new Syep4000VO();

        vo.setUserid(entity.getUserid());
        vo.setUsername(entity.getUsername());
        vo.setJijumcd(entity.getJijumcd());
        vo.setCoid(entity.getCoid());

        // roles 조회
        List<Sysm2000Dto> roles =
                sysm2000Mapper.getUserRoles(userid);

        // 필요하면 권한도 같이 조회
        for (Sysm2000Dto role : roles) {
            List<Sysm2010Dto> perms =
                    sysm2000Mapper.getPermissionsByRole(role.getRoleno());

            role.setPermissions(perms);
        }

        vo.setRoles(roles);

        return vo;
    }

}
