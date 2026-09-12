package com.example.springbootproject.pms.config;

import com.example.springbootproject.pms.util.JwtAuthenticationFilter;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final
    JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .formLogin(form -> form.disable())

                .httpBasic(basic -> basic.disable())
                // ⭐ iframe 허용
                .headers(headers ->
                        headers.frameOptions(
                                frame -> frame.disable()
                        )
                )

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .exceptionHandling(exception ->
                        exception
                                .authenticationEntryPoint(
                                        (request, response, authException) ->
                                                response.sendError(
                                                        HttpServletResponse.SC_UNAUTHORIZED
                                                )
                                )
                )

                .authorizeHttpRequests(auth -> auth
                        // React 정적 리소스
                        .requestMatchers(
                                "/",
                                "/index.html",
                                "/assets/**",
                                "/upload/**"
                        ).permitAll()

                        // 로그인/토큰
                        .requestMatchers(
                                "/api/login",
                                "/api/auth/refresh"
                        ).permitAll()

                        .requestMatchers(
                                "/api/pppo2000/pdf/subscribe/**"
                        ).permitAll()

                        // API는 인증
                        .requestMatchers("/api/**").authenticated()

                        // 그 외
                        .anyRequest().permitAll()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}