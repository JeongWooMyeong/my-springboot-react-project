package com.example.springbootproject.pms.login.service;

import com.example.springbootproject.pms.login.dto.Syep1000VO;
import com.example.springbootproject.pms.login.dto.Syep4000VO;

public interface LoginService {
    Syep1000VO test(String userid);
    Syep4000VO getUserInfo(Syep4000VO vo);
}
