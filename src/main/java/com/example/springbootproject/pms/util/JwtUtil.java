package com.example.springbootproject.pms.util;

import com.example.springbootproject.pms.config.JwtConfig;
import com.example.springbootproject.pms.login.dto.Syep4000VO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;

public class JwtUtil {
    public static Syep4000VO parseToken(String token) {
        Jws<Claims> claims = Jwts.parser()
                .verifyWith(JwtConfig.getSecretKey())
                .build()
                .parseSignedClaims(token);

        Syep4000VO vo = new Syep4000VO();
        vo.setUserid(claims.getPayload().getSubject());
        vo.setUsername(claims.getPayload().get("username", String.class));
        vo.setJijumcd(claims.getPayload().get("jijumcd", String.class));
        vo.setCoid(claims.getPayload().get("coid", String.class));
        // roles도 꺼내서 세팅
        return vo;
    }
}
