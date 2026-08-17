package com.example.springbootproject.pms.pp.po.kafka.producer;

import com.example.springbootproject.pms.pp.po.kafka.event.ApprovalHistoryEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ApprovalHistoryProducer {


    private final KafkaTemplate<String, ApprovalHistoryEvent> kafkaTemplate;


    public void send(ApprovalHistoryEvent event){

        kafkaTemplate.send(
                "approval-history-topic",
                event.getOrdno(),
                event
        );

    }

}