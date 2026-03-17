package com.example.springbootproject.pms.login.controller;

import com.example.springbootproject.pms.config.JwtConfig;
import com.example.springbootproject.pms.login.dto.Syep1000VO;
import com.example.springbootproject.pms.login.dto.Syep4000VO;
import com.example.springbootproject.pms.login.service.LoginService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Key;
import java.util.Date;

@RestController
@RequestMapping("/api")
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService){
        this.loginService = loginService;
    }

    @PostMapping("/login")
    //public Syep4000VO login(@RequestParam String userid, @RequestParam String password){
    public Syep4000VO login(@RequestBody Syep4000VO vo){
        //System.out.println("vvv:" + vo.getJijumcd());
//        Syep4000VO vo = new Syep4000VO();
//        vo.setUserid(userid);
//        vo.setPassword(password);

        //Syep1000VO test = loginService.test(vo.getJijumcd());
        Syep4000VO userinfo = loginService.getUserInfo(vo);
        System.out.println("user:" + userinfo.getUserid());

        //2. jwt 토큰 생성
        String token = Jwts.builder()
                .subject(userinfo.getUserid()) // subject
                .claim("username", userinfo.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(JwtConfig.getSecretKey())
                .compact();
        //토큰을 VO담아서 반환
        userinfo.setToken(token);

        return userinfo;
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            System.out.println(token);
            Jws<Claims> claims = Jwts.parser()   // 최신 버전에서도 parser() 사용 가능
                    .verifyWith(JwtConfig.getSecretKey()) // ✅ setSigningKey → verifyWith
                    .build()
                    .parseSignedClaims(token);   // ✅ parseClaimsJws → parseSignedClaims

            // 필요하다면 payload에서 사용자 정보 꺼내기
            String userid = claims.getPayload().getSubject();
            String role = claims.getPayload().get("role", String.class);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }



}
