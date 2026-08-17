package com.example.springbootproject.pms.pp.po.kafka.consumer;

import com.example.springbootproject.pms.pp.po.kafka.event.ApprovalEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class ApprovalConsumer {


    @KafkaListener(
            topics = "approval-topic",
            groupId = "approval-group"
    )
    public void consume(ApprovalEvent event){

        System.out.println("====================");
        System.out.println("Kafka 이벤트 수신");
        System.out.println("주문번호 : " + event.getOrdnos());
        System.out.println("상태 : " + event.getOrdstate());
        System.out.println("====================");

    }

}