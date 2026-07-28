package com.example.springbootproject.pms.sy.bs.service.impl;

import com.example.springbootproject.pms.sy.bs.dto.Sybs1000Dto;
import com.example.springbootproject.pms.sy.bs.service.Sybs1000Service;
import com.example.springbootproject.pms.sy.bs.service.dao.Sybs1000Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class Sybs1000ServiceImpl implements Sybs1000Service {


    private final Sybs1000Mapper sybs1000Mapper;


    @Override
    public List<Sybs1000Dto> select_list() {

        return sybs1000Mapper.select_list();
    }


    @Override
    public Sybs1000Dto select_one(Long notice_id) {

        return sybs1000Mapper.select_one(notice_id);
    }


    @Override
    public int insert(Sybs1000Dto sybs1000Dto) {

        return sybs1000Mapper.insert(sybs1000Dto);
    }


    @Override
    public int update(Sybs1000Dto sybs1000Dto) {

        return sybs1000Mapper.update(sybs1000Dto);
    }


    @Override
    public int delete(Long notice_id) {

        return sybs1000Mapper.delete(notice_id);
    }

    @Override
    public List<Sybs1000Dto> selectMainList(){

        return sybs1000Mapper.selectMainList();

    }

}