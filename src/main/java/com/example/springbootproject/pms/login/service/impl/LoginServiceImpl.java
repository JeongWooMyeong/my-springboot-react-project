package com.example.springbootproject.pms.login.service.impl;

import com.example.springbootproject.pms.login.dto.Syep1000VO;
import com.example.springbootproject.pms.login.dto.Syep4000VO;
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

    public LoginServiceImpl(LoginMapper loginMapper, Sysm2000Mapper sysm2000Mapper){
        this.loginMapper = loginMapper;
        this.sysm2000Mapper = sysm2000Mapper;
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

}
