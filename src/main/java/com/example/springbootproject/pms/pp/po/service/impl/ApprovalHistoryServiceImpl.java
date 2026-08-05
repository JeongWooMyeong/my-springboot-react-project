package com.example.springbootproject.pms.pp.po.service.impl;

import com.example.springbootproject.pms.pp.po.event.ApprovalHistoryEvent;
import com.example.springbootproject.pms.pp.po.service.ApprovalHistoryService;
import com.example.springbootproject.pms.pp.po.service.dao.mssql.ApprovalHistoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ApprovalHistoryServiceImpl
        implements ApprovalHistoryService {


    private final ApprovalHistoryMapper approvalHistoryMapper;


    @Override
    public void saveHistory(ApprovalHistoryEvent event) {


        approvalHistoryMapper.insertHistory(event);


    }

}