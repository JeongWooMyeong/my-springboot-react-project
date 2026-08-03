package com.example.springbootproject.pms.sy.tm.consumer;

import com.example.springbootproject.pms.config.RabbitConfig;
import com.example.springbootproject.pms.sy.tm.dto.TemplateActivateMessage;
import com.example.springbootproject.pms.sy.tm.dto.TemplateActivateStatusMessage;
import com.example.springbootproject.pms.sy.tm.service.dao.Sytm1000Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class TemplateConsumer {


    private final Sytm1000Mapper mapper;

    private final RabbitTemplate rabbitTemplate;



    @Transactional
    @RabbitListener(
            queues = RabbitConfig.TEMPLATE_QUEUE
    )
    public void consume(
            TemplateActivateMessage message
    ){

        // 시작 이벤트
        sendStatus(
                message.getJobId(),
                "START",
                "템플릿 활성화 중입니다."
        );


        try {

            mapper.deleteActiveChildren(
                    message.getJijumcd()
            );


            mapper.insertActiveChildren(
                    message.getJijumcd(),
                    message.getCoid(),
                    message.getNtnid(),
                    message.getUpdpn(),
                    message.getClcds()
            );

            System.out.println("SUCCESS EVENT SEND : " + message.getJobId());

            // 완료 이벤트
            sendStatus(
                    message.getJobId(),
                    "SUCCESS",
                    "템플릿 활성화 완료되었습니다."
            );


        } catch(Exception e) {


            sendStatus(
                    message.getJobId(),
                    "FAIL",
                    "템플릿 활성화 실패"
            );


            throw e;
        }

    }



    private void sendStatus(
            String jobId,
            String status,
            String message
    ){

        rabbitTemplate.convertAndSend(
                RabbitConfig.TEMPLATE_STATUS_QUEUE,
                new TemplateActivateStatusMessage(
                        jobId,
                        status,
                        message
                )
        );

    }

}