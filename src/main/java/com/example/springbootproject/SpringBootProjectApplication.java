package com.example.springbootproject;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(scanBasePackages = "com.example")
@EnableScheduling
@MapperScan({
        "com.example.springbootproject.pms.login.service.dao",
        "com.example.springbootproject.pms.sy.sm.service.dao",
        "com.example.springbootproject.pms.sy.ep.service.dao",
        "com.example.springbootproject.pms.sy.tm.service.dao",
        "com.example.springbootproject.pms.pp.po.service.dao",
        "com.example.springbootproject.pms.sy.bs.service.dao",
})
public class SpringBootProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringBootProjectApplication.class, args);
    }

}
