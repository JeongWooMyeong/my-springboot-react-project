package com.example.springbootproject.pms.config;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.support.converter.JacksonJsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    public static final String TEMPLATE_QUEUE =
            "template.activate.queue";

    public static final String TEMPLATE_STATUS_QUEUE =
            "template.activate.status.queue";


    @Bean
    public Queue templateQueue() {

        return QueueBuilder
                .durable(TEMPLATE_QUEUE)
                .build();
    }


    @Bean
    public Queue templateStatusQueue() {

        return QueueBuilder
                .durable(TEMPLATE_STATUS_QUEUE)
                .build();
    }


    @Bean
    public JacksonJsonMessageConverter jacksonJsonMessageConverter() {

        return new JacksonJsonMessageConverter();
    }

}