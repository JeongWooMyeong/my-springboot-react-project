package com.example.springbootproject.pms.sy.ep.service.dao;

import com.example.springbootproject.pms.sy.ep.dto.Syep4000Dto;
import com.example.springbootproject.pms.sy.sm.dto.Sysm2000Dto;
import com.example.springbootproject.pms.sy.sm.dto.Sysm2020Dto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface Syep4000Mapper {
    List<Syep4000Dto> selectAll(Syep4000Dto searchDto);
    List<Sysm2020Dto> selectUserRoles(String userId);
    List<Sysm2000Dto> getAllRoles();
    // ⭐ 사용자 등록
    void insertUser(Syep4000Dto user);
    int countUserId(String userid);
    // ⭐ 추가
    void updateUser(@Param("userid") String userid, @Param("user") Syep4000Dto user);
    void deleteUsers(@Param("userIds") List<String> userIds);
}