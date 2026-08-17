package com.example.springbootproject.pms.pp.po.service.dao.mssql;

import com.example.springbootproject.pms.pp.po.kafka.event.ApprovalHistoryEvent;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ApprovalHistoryMapper {


    void insertHistory(ApprovalHistoryEvent event);


}