package com.example.springbootproject.pms.sy.bs.controller;

import com.example.springbootproject.pms.sy.bs.dto.Sybs1000Dto;
import com.example.springbootproject.pms.sy.bs.service.Sybs1000Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sybs1000")
@RequiredArgsConstructor
public class Sybs1000Controller {


    private final Sybs1000Service sybs1000Service;


    /**
     * 공지사항 목록 조회
     */
    @GetMapping("/list")
    public ResponseEntity<List<Sybs1000Dto>> selectList() {

        return ResponseEntity.ok(
                sybs1000Service.select_list()
        );
    }


    /**
     * 공지사항 상세 조회
     */
    @GetMapping("/{noticeId}")
    public ResponseEntity<Sybs1000Dto> selectOne(
            @PathVariable Long noticeId
    ) {

        return ResponseEntity.ok(
                sybs1000Service.select_one(noticeId)
        );
    }


    /**
     * 공지사항 등록
     */
    @PostMapping
    public ResponseEntity<Integer> insert(
            @RequestBody Sybs1000Dto dto
    ) {

        return ResponseEntity.ok(
                sybs1000Service.insert(dto)
        );
    }


    /**
     * 공지사항 수정
     */
    @PutMapping
    public ResponseEntity<Integer> update(
            @RequestBody Sybs1000Dto dto
    ) {

        return ResponseEntity.ok(
                sybs1000Service.update(dto)
        );
    }


    /**
     * 공지사항 삭제
     */
    @DeleteMapping("/{noticeId}")
    public ResponseEntity<Integer> delete(
            @PathVariable Long noticeId
    ) {

        return ResponseEntity.ok(
                sybs1000Service.delete(noticeId)
        );
    }

    @GetMapping("/mainList")
    public ResponseEntity<?> selectMainList(){

        return ResponseEntity.ok(
                sybs1000Service.selectMainList()
        );

    }
}