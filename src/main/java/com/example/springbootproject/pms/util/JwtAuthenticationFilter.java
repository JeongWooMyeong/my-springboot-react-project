package com.example.springbootproject.pms.util;

import com.example.springbootproject.pms.config.JwtConfig;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authHeader =
                request.getHeader("Authorization");

        // JWT가 없으면 그냥 다음 필터로
        if (authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        String token =
                authHeader.substring(7);

        try {

            // JWT 검증
            Jws<Claims> claims =
                    Jwts.parser()
                            .verifyWith(JwtConfig.getSecretKey())
                            .build()
                            .parseSignedClaims(token);

            // JWT subject = userid
            String userid =
                    claims.getPayload().getSubject();

            // 인증 객체 생성
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            userid,
                            null,
                            Collections.emptyList()
                    );

            // ⭐ Spring Security에게 인증 완료라고 알려줌
            SecurityContextHolder
                    .getContext()
                    .setAuthentication(authentication);

        } catch (Exception e) {

            // JWT가 잘못되었으면 인증 정보 제거
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }
}