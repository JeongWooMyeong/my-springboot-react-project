package com.example.springbootproject.pms.sy.tm.service.impl;

import com.example.springbootproject.pms.sy.tm.dto.Sytm2000Dto;
import com.example.springbootproject.pms.sy.tm.service.Sytm2000Service;
import com.example.springbootproject.pms.sy.tm.service.dao.Sytm2000Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class Sytm2000ServiceImpl implements Sytm2000Service {

    private final Sytm2000Mapper mapper;

    @Override
    public Long create(Map<String, Object> param) {

        param.put("createdAt", LocalDateTime.now());
        param.put("updatedAt", LocalDateTime.now());

        mapper.insert(param);

        return Long.valueOf(param.get("id").toString());
    }

    @Override
    public List<Sytm2000Dto> list() {
        return mapper.selectList();
    }

    @Override
    public Sytm2000Dto get(Long id) {
        return mapper.selectById(id);
    }

    @Override
    public int update(Long id, Map<String, Object> param) {

        param.put("id", id);
        param.put("updatedAt", LocalDateTime.now());

        return mapper.update(param);
    }

    @Override
    public int delete(Long id) {
        return mapper.delete(id);
    }
}