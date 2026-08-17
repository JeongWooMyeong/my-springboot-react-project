package com.example.springbootproject.pms.pp.po.kafka.consumer;

import com.example.springbootproject.pms.pp.po.kafka.event.ApprovalHistoryEvent;
import com.example.springbootproject.pms.pp.po.service.approval.ApprovalHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ApprovalHistoryConsumer {


    private final ApprovalHistoryService service;


    @KafkaListener(
            topics = "approval-history-topic",
            groupId = "approval-history-group"
    )
    public void consume(ApprovalHistoryEvent event){

        System.out.println(
                "승인 이력 저장 : "
                        + event.getOrdno()
        );


        service.saveHistory(event);

    }

}