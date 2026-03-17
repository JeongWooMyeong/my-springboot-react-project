package com.example.springbootproject.pms.login.service.impl;

import com.example.springbootproject.pms.login.dto.Syep1000VO;
import com.example.springbootproject.pms.login.dto.Syep4000VO;
import com.example.springbootproject.pms.login.service.LoginService;
import com.example.springbootproject.pms.login.service.dao.LoginMapper;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {
    private final LoginMapper loginMapper;

    public LoginServiceImpl(LoginMapper loginMapper){
        this.loginMapper = loginMapper;
    }

    @Override
    public Syep1000VO test(String userid){
        Syep1000VO test = loginMapper.findtest(userid);
        return test;
    }

    @Override
    public Syep4000VO getUserInfo(Syep4000VO vo){
        Syep4000VO test = loginMapper.getUserInfo(vo);
        return test;
    }

}
