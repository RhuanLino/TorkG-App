package com.torkg.api.config;

import java.util.List;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jose.jws.SignatureAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableConfigurationProperties(SupabaseProperties.class)
public class SecurityConfiguration {

    private static final List<String> PUBLIC_ENDPOINTS = List.of(
            "/actuator/health",
            "/api/v1/public/**"
    );

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(PUBLIC_ENDPOINTS.toArray(String[]::new)).permitAll()
                        .requestMatchers("/api/**").authenticated()
                        .anyRequest().denyAll())
                .oauth2ResourceServer(resourceServer -> resourceServer.jwt(Customizer.withDefaults()))
                .build();
    }

    /**
     * Valida access tokens do Supabase por meio das chaves publicas JWKS.
     * Requer que o projeto use uma chave de assinatura assimetrica (RSA/ECC).
     */
    @Bean
    JwtDecoder jwtDecoder(SupabaseProperties properties) {
        String supabaseUrl = requireSupabaseUrl(properties.url());
        NimbusJwtDecoder decoder = NimbusJwtDecoder.withJwkSetUri(
                supabaseUrl + "/auth/v1/.well-known/jwks.json"
        )
                // O Spring aceita RS256 por padrao; o Supabase recomenda ES256.
                // Os dois algoritmos assimetricos permitem rotacao de chave sem indisponibilidade.
                .jwsAlgorithms(algorithms -> {
                    algorithms.add(SignatureAlgorithm.ES256);
                    algorithms.add(SignatureAlgorithm.RS256);
                })
                .build();
        decoder.setJwtValidator(JwtValidators.createDefaultWithIssuer(supabaseUrl + "/auth/v1"));
        return decoder;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(SupabaseProperties properties) {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(properties.corsAllowedOrigins());
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));
        configuration.setExposedHeaders(List.of("Location"));
        configuration.setAllowCredentials(false);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }

    private String requireSupabaseUrl(String url) {
        if (url == null || url.isBlank() || url.contains("seu-project-ref")) {
            throw new IllegalStateException("Defina SUPABASE_URL com a URL do projeto Supabase antes de iniciar a API.");
        }
        return url.replaceAll("/$", "");
    }
}
