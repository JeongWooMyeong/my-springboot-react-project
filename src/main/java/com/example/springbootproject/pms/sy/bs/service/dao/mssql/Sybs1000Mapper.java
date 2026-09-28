package com.example.springbootproject.pms.sy.bs.service.dao.mssql;

import com.example.springbootproject.pms.sy.bs.dto.NoticeFileDto;
import com.example.springbootproject.pms.sy.bs.dto.Sybs1000Dto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface Sybs1000Mapper {


    /**
     * 공지사항 목록 조회
     */
    List<Sybs1000Dto> select_list();


    /**
     * 공지사항 상세 조회
     */
    Sybs1000Dto select_one(Long notice_id);


    /**
     * 공지사항 등록
     */
    int insert(Sybs1000Dto sybs1000Dto);


    /**
     * 공지사항 수정
     */
    int update(Sybs1000Dto sybs1000Dto);


    /**
     * 공지사항 삭제
     */
    int delete(Long notice_id);

    List<Sybs1000Dto> selectMainList();

    // 파일 정보 등록
    int insertFile(NoticeFileDto dto);

    List<NoticeFileDto> selectFiles(Long noticeId);

    NoticeFileDto select_file(Long fileId);

}