package com.example.springbootproject.pms.pp.po.producer;

import com.example.springbootproject.pms.pp.po.event.ApprovalEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ApprovalProducer {


    private final KafkaTemplate<String, ApprovalEvent> kafkaTemplate;


    public void send(ApprovalEvent event){

        kafkaTemplate.send(
                "approval-topic",
                event
        );

    }

}