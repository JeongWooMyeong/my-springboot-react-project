package com.example.springbootproject.pms.sy.ep.service;

import com.example.springbootproject.pms.sy.ep.dto.Syep4000Dto;
import com.example.springbootproject.pms.sy.sm.dto.Sysm2000Dto;
import com.example.springbootproject.pms.sy.sm.dto.Sysm2020Dto;

import java.util.List;

public interface Syep4000Service {
    List<Syep4000Dto> getAllUsers(Syep4000Dto searchDto);
    List<Sysm2020Dto> getUserRoles(String userId);
    List<Sysm2000Dto> getAllRoles();
    // ⭐ 사용자 등록
    void registerUser(Syep4000Dto user);
    //아이디 중복 확인
    boolean checkUserId(String userid);
    // ⭐ 추가
    void updateUser(String userid, Syep4000Dto user);

    void deleteUsers(List<String> userIds);

    void saveUserRoles(String userid, List<String> rolenos);
}
