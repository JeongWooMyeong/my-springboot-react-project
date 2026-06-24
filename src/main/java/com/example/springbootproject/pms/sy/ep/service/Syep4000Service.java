package com.example.springbootproject.pms.sy.ep.service;

import com.example.springbootproject.pms.sy.ep.dto.Syep4000Dto;
import com.example.springbootproject.pms.sy.sm.dto.Sysm2000Dto;
import com.example.springbootproject.pms.sy.sm.dto.Sysm2020Dto;

import java.util.List;

public interface Syep4000Service {
    List<Syep4000Dto> getAllUsers();
    List<Sysm2020Dto> getUserRoles(String userId);
    List<Sysm2000Dto> getAllRoles();
}
