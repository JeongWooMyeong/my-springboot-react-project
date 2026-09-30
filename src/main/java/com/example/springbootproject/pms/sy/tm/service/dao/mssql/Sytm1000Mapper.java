package com.example.springbootproject.pms.sy.tm.service.dao.mssql;

import com.example.springbootproject.pms.sy.tm.dto.Sytm1000Dto;
import com.example.springbootproject.pms.sy.tm.dto.Sytm1010Dto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface Sytm1000Mapper {
    List<Sytm1000Dto> selectAll();
    void insert(Sytm1000Dto dto);
    void update(@Param("clCd") String clCd, @Param("dto") Sytm1000Dto dto);
    void delete(@Param("clCd") String clCd);
    void deleteActiveClcd(@Param("clCd") String clCd);

    List<Sytm1010Dto> selectActiveByJijum(@Param("jijumcd") String jijumcd);
    void insertActive(Sytm1010Dto dto);
    void deleteActive(@Param("clcd") String clcd, @Param("jijumcd") String jijumcd);

    List<String> findChildren(@Param("jijumcd") String jijumcd);

    void deleteActiveBatch(@Param("jijums") List<String> jijums,
                           @Param("clcds") List<String> clcds);

    void insertActiveBatch(@Param("list") List<Sytm1010Dto> list);

    void deleteActiveChildren(@Param("jijumcd") String jijumcd);

    void insertActiveChildren(@Param("jijumcd") String jijumcd,
                              @Param("coid") String coid,
                              @Param("ntnid") String ntnid,
                              @Param("updpn") String updpn,
                              @Param("clcds") List<String> clcds);

    void insertClassification(Sytm1000Dto dto);
    void updateClassification(Sytm1000Dto dto);
    void deleteClassification(@Param("clcds") List<String> clcds);
}