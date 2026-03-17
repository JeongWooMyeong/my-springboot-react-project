package com.example.springbootproject.pms.config;

import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;
import java.security.Key;

@Configuration
public class JwtConfig {
    private static SecretKey secretKey;

    @PostConstruct
    public void init(){
        //서버 시작할때마다 새로운 키 생성
        byte[] keyBytes = java.util.UUID.randomUUID().toString().getBytes();
        secretKey = Keys.hmacShaKeyFor(java.util.Arrays.copyOf(keyBytes, 32));   //초시ㅗ 2556 비트 필요
    }

    public static SecretKey getSecretKey(){
        return secretKey;
    }

}
