package com.example.springbootproject.pms.sy.sm.service.dao.mssql;

import com.example.springbootproject.pms.sy.sm.dto.Sysm2000Dto;
import com.example.springbootproject.pms.sy.sm.dto.Sysm2010Dto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface Sysm2000Mapper {
    List<Sysm2000Dto> selectAll();
    Sysm2000Dto selectByNo(String roleno);
    void insert(Sysm2000Dto dto);
    void update(Sysm2000Dto dto);
    void delete(String roleno);
    void deleteUserRole(String roleno);
    // ✅ 권한 조회 추가
    List<Sysm2010Dto> selectPermissions(@Param("roleno") String roleno,
                                        @Param("menuCds") List<String> menuCds);
    void savePermission(Sysm2010Dto dto);
    void deletePermission(Sysm2010Dto dto);

    // 사용자 ID로 역할 목록 조회
    List<Sysm2000Dto> getUserRoles(@Param("userid") String userid);

    // 역할 번호로 권한 목록 조회
    List<Sysm2010Dto> getPermissionsByRole(@Param("roleno") String roleno);
}
