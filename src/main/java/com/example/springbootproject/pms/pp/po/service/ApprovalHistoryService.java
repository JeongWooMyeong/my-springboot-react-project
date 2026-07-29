package com.example.springbootproject.pms.pp.po.service;

import com.example.springbootproject.pms.pp.po.event.ApprovalHistoryEvent;

public interface ApprovalHistoryService {

    void saveHistory(ApprovalHistoryEvent event);

}