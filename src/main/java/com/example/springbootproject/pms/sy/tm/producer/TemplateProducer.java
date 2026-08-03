package com.example.springbootproject.pms.sy.tm.producer;

import com.example.springbootproject.pms.config.RabbitConfig;
import com.example.springbootproject.pms.sy.tm.dto.TemplateActivateMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class TemplateProducer {


    private final RabbitTemplate rabbitTemplate;


    public TemplateProducer(
            RabbitTemplate rabbitTemplate
    ){
        this.rabbitTemplate = rabbitTemplate;
    }



    public void send(
            TemplateActivateMessage message
    ){

        rabbitTemplate.convertAndSend(
                RabbitConfig.TEMPLATE_QUEUE,
                message
        );

    }
}