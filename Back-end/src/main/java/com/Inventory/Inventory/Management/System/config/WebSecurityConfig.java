package com.Inventory.Inventory.Management.System.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Basic security configuration for development.
 * Currently permits all /api/** endpoints and allows access to Swagger UI.
 * Replace with role-based JWT/session security for production.
 */
@Configuration
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/**", "/api/docs/**", "/api/swagger-ui.html", "/swagger-ui/**", "/images/**", "/", "/index.html", "/static/**").permitAll()
            .anyRequest().authenticated()
        )
                .httpBasic(Customizer.withDefaults());
        return http.build();
    }
}
