package com.example.springbootproject.pms.util;

import com.example.springbootproject.pms.config.JwtConfig;
import com.example.springbootproject.pms.login.dto.Syep4000VO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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

    public static String createAccessToken(Syep4000VO userinfo) {

        List<String> rolenoList = userinfo.getRoles()
                .stream()
                .map(r -> r.getRoleno())
                .collect(Collectors.toList());

        return Jwts.builder()
                .subject(userinfo.getUserid())
                .claim("username", userinfo.getUsername())
                .claim("jijumcd", userinfo.getJijumcd())
                .claim("coid", userinfo.getCoid())
                .claim("roles", rolenoList)
                .issuedAt(new Date())
                .expiration(
//                        new Date(System.currentTimeMillis()
//                                + 1000L * 60 * 10)
                        //new Date(System.currentTimeMillis() + 1000L * 10)
                        new Date(System.currentTimeMillis()
                                + 1000L * 60 * 10)  //10분
                )
                .signWith(JwtConfig.getSecretKey())
                .compact();
    }

    public static String createRefreshToken(String userid) {

        return Jwts.builder()
                .subject(userid)
                .issuedAt(new Date())
                .expiration(
                        //10분
                        //new Date(System.currentTimeMillis() + 1000L * 60 * 10)
                        //7일
                        new Date(System.currentTimeMillis()
                                + 1000L * 60 * 60 * 24 * 7)
                )
                .signWith(JwtConfig.getSecretKey())
                .compact();
    }

}
