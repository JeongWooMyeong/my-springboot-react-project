package com.example.springbootproject.pms.sy.ep.controller;

import com.example.springbootproject.pms.sy.ep.dto.Syep1000Dto;
import com.example.springbootproject.pms.sy.ep.service.Syep1000Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jijum")
public class Syep1000Controller {

    private final Syep1000Service syep1000Service;

    public Syep1000Controller(Syep1000Service syep1000Service) {
        this.syep1000Service = syep1000Service;
    }

    // ✅ coid 파라미터가 있으면 해당 고객사 지점만 조회
    @GetMapping
    public List<Syep1000Dto> getJijums(@RequestParam(required = false) String coid) {
        if (coid != null) {
            return syep1000Service.getJijumByCoId(coid);
        }
        return syep1000Service.getAllJijum();
    }

    // ✅ 단건 조회
    @GetMapping("/{jijumCd}")
    public Syep1000Dto getJijum(@PathVariable String jijumCd) {
        return syep1000Service.getJijumById(jijumCd);
    }

    // ✅ 등록
    @PostMapping
    public void createJijum(@RequestBody Syep1000Dto dto) {
        syep1000Service.insertJijum(dto);
    }

    // ✅ 수정
    @PutMapping("/{jijumCd}")
    public void updateJijum(@PathVariable String jijumCd, @RequestBody Syep1000Dto dto) {
        dto.setJijumcd(jijumCd); // PathVariable로 받은 코드 세팅
        syep1000Service.updateJijum(dto);
    }

    // ✅ 삭제
    @DeleteMapping("/{jijumCd}")
    public void deleteJijum(@PathVariable String jijumCd, @RequestParam String coid) {
        syep1000Service.deleteJijum(jijumCd, coid);
    }

}