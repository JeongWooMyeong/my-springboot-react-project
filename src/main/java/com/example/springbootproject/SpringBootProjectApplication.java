package com.example.springbootproject;

import com.example.springbootproject.pms.util.NetWorkUtil;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(scanBasePackages = "com.example")
@EnableScheduling
@EnableRabbit
@EnableCaching
public class SpringBootProjectApplication {

    public static void main(String[] args) throws Exception{
        String ip = NetWorkUtil.getWifiIp();

        System.out.println("현재 서버 IP : " + ip);

        System.setProperty("server-host", ip);

        SpringApplication.run(SpringBootProjectApplication.class, args);
    }

}
