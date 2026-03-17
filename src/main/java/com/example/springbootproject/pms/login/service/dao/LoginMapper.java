package com.example.springbootproject.pms.login.service.dao;

import com.example.springbootproject.pms.login.dto.Syep1000VO;
import com.example.springbootproject.pms.login.dto.Syep4000VO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LoginMapper {
    Syep1000VO findtest(@Param("userid") String userid);
    Syep4000VO getUserInfo(Syep4000VO vo);
}
