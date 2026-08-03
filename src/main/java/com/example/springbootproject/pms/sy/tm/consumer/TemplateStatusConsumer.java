package com.example.springbootproject.pms.sy.tm.consumer;

import com.example.springbootproject.pms.config.RabbitConfig;
import com.example.springbootproject.pms.sy.tm.dto.TemplateActivateStatusMessage;
import com.example.springbootproject.pms.sy.tm.service.TemplateNotifyService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TemplateStatusConsumer {

    private final TemplateNotifyService templateNotifyService;


    @RabbitListener(
            queues = RabbitConfig.TEMPLATE_STATUS_QUEUE
    )
    public void consume(
            TemplateActivateStatusMessage message
    ){

        System.out.println(
                message.getMessage()
        );

        templateNotifyService.send(
                message.getJobId(),
                message
        );

    }

}