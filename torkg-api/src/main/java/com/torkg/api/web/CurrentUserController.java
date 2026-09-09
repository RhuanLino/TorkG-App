package com.torkg.api.web;

import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class CurrentUserController {

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> me(@AuthenticationPrincipal Jwt jwt) {
        Map<String, Object> user = new LinkedHashMap<>();
        user.put("id", jwt.getSubject());
        user.put("email", jwt.getClaimAsString("email"));
        user.put("role", jwt.getClaimAsString("role"));
        user.put("appMetadata", jwt.getClaimAsMap("app_metadata"));
        return ResponseEntity.ok(user);
    }
}
