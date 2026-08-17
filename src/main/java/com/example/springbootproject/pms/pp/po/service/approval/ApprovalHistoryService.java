package com.example.springbootproject.pms.pp.po.service.approval;

import com.example.springbootproject.pms.pp.po.kafka.event.ApprovalHistoryEvent;

public interface ApprovalHistoryService {

    void saveHistory(ApprovalHistoryEvent event);

}