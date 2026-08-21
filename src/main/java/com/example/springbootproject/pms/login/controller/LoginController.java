package com.example.springbootproject.pms.login.controller;

import com.example.springbootproject.pms.config.JwtConfig;
import com.example.springbootproject.pms.login.component.RefreshTokenStore;
import com.example.springbootproject.pms.login.dto.Syep1000VO;
import com.example.springbootproject.pms.login.dto.Syep4000VO;
import com.example.springbootproject.pms.login.service.LoginService;
import com.example.springbootproject.pms.util.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.example.springbootproject.pms.util.JwtUtil.*;

@RestController
@RequestMapping("/api")
public class LoginController {

    private final LoginService loginService;
    private final RefreshTokenStore refreshTokenStore;

    public LoginController(LoginService loginService, RefreshTokenStore refreshTokenStore){

        this.loginService = loginService;
        this.refreshTokenStore = refreshTokenStore;
    }

    @PostMapping("/login")
    public Syep4000VO login(@RequestBody Syep4000VO vo) {

        Syep4000VO userinfo = loginService.getUserInfo(vo);

        // Access Token 생성
        String accessToken =
                JwtUtil.createAccessToken(userinfo);

        // Refresh Token 생성
        String refreshToken =
                JwtUtil.createRefreshToken(userinfo.getUserid());

        // 서버에 Refresh Token 저장
        refreshTokenStore.save(
                userinfo.getUserid(),
                refreshToken
        );

        // 응답
        userinfo.setToken(accessToken);
        userinfo.setRefreshToken(refreshToken);

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

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {

        String userid = authentication.getName();

        return ResponseEntity.ok(userid);
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<?> refresh(@RequestBody Syep4000VO vo) {

        String refreshToken = vo.getRefreshToken();

        System.out.println("=================================");
        System.out.println("[REFRESH] 요청 들어옴");
        System.out.println("[REFRESH] refreshToken = " + refreshToken);

        if (refreshToken == null) {
            System.out.println("[REFRESH] refreshToken 없음");
            return ResponseEntity.status(401).build();
        }

        try {

            Claims claims = Jwts.parser()
                    .verifyWith(JwtConfig.getSecretKey())
                    .build()
                    .parseSignedClaims(refreshToken)
                    .getPayload();

            String userid = claims.getSubject();

            System.out.println("[REFRESH] userid = " + userid);

            String savedToken = refreshTokenStore.get(userid);

            if (savedToken == null) {
                System.out.println("[REFRESH] 서버에 저장된 Refresh Token 없음");
                return ResponseEntity.status(401).build();
            }

            if (!savedToken.equals(refreshToken)) {
                System.out.println("[REFRESH] Refresh Token 불일치");
                return ResponseEntity.status(401).build();
            }

            System.out.println("[REFRESH] Refresh Token 검증 성공");

            Syep4000VO userinfo =
                    loginService.getUserInfoByUserid(userid);

            System.out.println("[REFRESH] 사용자 조회 성공");
            System.out.println("[REFRESH] userid = " + userinfo.getUserid());

            String newAccessToken =
                    JwtUtil.createAccessToken(userinfo);

            System.out.println("[REFRESH] 새로운 Access Token 발급");
            System.out.println("[REFRESH] newAccessToken = " + newAccessToken);

            userinfo.setToken(newAccessToken);

            System.out.println("[REFRESH] 완료");
            System.out.println("=================================");

            return ResponseEntity.ok(userinfo);

        } catch (Exception e) {

            System.out.println("[REFRESH] 실패");
            e.printStackTrace();

            return ResponseEntity.status(401).build();
        }
    }



}
