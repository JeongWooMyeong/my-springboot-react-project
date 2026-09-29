package com.example.springbootproject.pms.sy.bs.service;

import com.example.springbootproject.pms.sy.bs.dto.NoticeFileDto;
import com.example.springbootproject.pms.sy.bs.dto.Sybs1000Dto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface Sybs1000Service {
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
    Long insert(Sybs1000Dto sybs1000Dto, List<MultipartFile> files) throws Exception;


    /**
     * 공지사항 수정
     */
    Long update (
            Sybs1000Dto dto,
            List<MultipartFile> files
    ) throws Exception;

    /**
     * 공지사항 삭제
     */
    int delete(Long notice_id);

    List<Sybs1000Dto> selectMainList();

    NoticeFileDto select_file(Long fileId);
}
