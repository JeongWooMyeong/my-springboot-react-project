package com.example.springbootproject.pms.pp.po.service.dao;

import com.example.springbootproject.pms.pp.po.event.ApprovalHistoryEvent;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ApprovalHistoryMapper {


    void insertHistory(ApprovalHistoryEvent event);


}