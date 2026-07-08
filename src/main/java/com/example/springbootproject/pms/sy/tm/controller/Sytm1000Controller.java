package com.example.springbootproject.pms.sy.tm.controller;

import com.example.springbootproject.pms.login.dto.Syep4000VO;
import com.example.springbootproject.pms.sy.tm.dto.Sytm1000Dto;
import com.example.springbootproject.pms.sy.tm.dto.Sytm1010Dto;
import com.example.springbootproject.pms.sy.tm.service.Sytm1000Service;
import com.example.springbootproject.pms.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sytm1000")
public class Sytm1000Controller {

    private final Sytm1000Service sytm1000Service;

    public Sytm1000Controller(Sytm1000Service sytm1000Service) {
        this.sytm1000Service = sytm1000Service;
    }

    @GetMapping
    public List<Sytm1000Dto> getAll() {
        return sytm1000Service.getAll();
    }

    @PostMapping
    public void insert(@RequestBody Sytm1000Dto dto) {
        sytm1000Service.insert(dto);
    }

    @PutMapping("/{clcd}")
    public void update(@PathVariable String clCd, @RequestBody Sytm1000Dto dto) {
        sytm1000Service.update(clCd, dto);
    }

    @DeleteMapping("/{clcd}")
    public void delete(@PathVariable String clCd) {
        sytm1000Service.delete(clCd);
    }

    // 지점별 활성화된 분류 조회
    @GetMapping("/active")
    public List<Sytm1010Dto> getActive(@RequestParam String jijumcd) {
        return sytm1000Service.getActiveByJijum(jijumcd);
    }

    // 활성화 등록
    @PostMapping("/activate")
    public void activate(@RequestBody List<Sytm1010Dto> dtos, HttpServletRequest request) {
        sytm1000Service.activate(dtos);
    }

    // 비활성화
    @DeleteMapping("/deactivate")
    public void deactivate(@RequestParam String clcd, @RequestParam String jijumcd) {
        sytm1000Service.deactivate(clcd, jijumcd);
    }

    // 활성화 등록
    @PostMapping("/activate/children")
    public void activateChidren(@RequestBody List<Sytm1010Dto> dtos, HttpServletRequest request) {
        sytm1000Service.activateChildren(dtos);
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addClassification(@RequestBody Sytm1000Dto dto) {
        sytm1000Service.addClassification(dto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update")
    public ResponseEntity<Void> updateClassification(@RequestBody Sytm1000Dto dto) {
        sytm1000Service.updateClassification(dto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteClassification(@RequestBody Map<String, List<String>> body) {
        sytm1000Service.deleteClassification(body.get("clcds"));
        return ResponseEntity.ok().build();
    }
}