package com.example.springbootproject.pms.config;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
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

        return new Queue(
                TEMPLATE_QUEUE,
                true
        );
    }

    @Bean
    public Queue templateStatusQueue() {
        return new Queue(
                TEMPLATE_STATUS_QUEUE,
                true
        );
    }

    @Bean
    public Jackson2JsonMessageConverter jackson2JsonMessageConverter(){

        return new Jackson2JsonMessageConverter();

    }

}