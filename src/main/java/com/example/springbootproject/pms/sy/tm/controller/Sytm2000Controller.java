package com.example.springbootproject.pms.sy.tm.controller;

import com.example.springbootproject.pms.sy.tm.dto.Sytm2000Dto;
import com.example.springbootproject.pms.sy.tm.service.Sytm2000Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sytm2000")
@RequiredArgsConstructor
public class Sytm2000Controller {

    private final Sytm2000Service service;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Long create(
            @RequestPart("template") Sytm2000Dto dto,
            @RequestPart(value = "thumbnail", required = false) MultipartFile thumbnail
    ) throws Exception {
        return service.create(dto, thumbnail);
    }

    @GetMapping
    public List<Sytm2000Dto> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public Sytm2000Dto get(@PathVariable Long id) {
        return service.get(id);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public int update(
            @PathVariable Long id,
            @RequestPart("template") Sytm2000Dto dto,
            @RequestPart(value = "thumbnail", required = false) MultipartFile thumbnail
    ) throws Exception {
        dto.setId(id);
        return service.update(dto, thumbnail);
    }

    @DeleteMapping("/{id}")
    public int delete(@PathVariable Long id) {
        return service.delete(id);
    }
}