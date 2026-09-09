package com.torkg.api.web;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/vehicles")
public class VehicleController {

    private static final String PRIMARY_VEHICLE_QUERY = """
            select v.id,
                   v.nickname,
                   v.plate,
                   v.manufacture_year,
                   v.model_year,
                   v.color,
                   v.mileage,
                   v.photo_path,
                   vb.name as brand_name,
                   vm.name as model_name,
                   vv.name as vehicle_version
              from public.vehicles v
              left join public.vehicle_versions vv on vv.id = v.vehicle_version_id
              left join public.vehicle_models vm on vm.id = vv.model_id
              left join public.vehicle_brands vb on vb.id = vm.brand_id
             where v.user_id = ?
               and v.is_primary = true
             order by v.created_at asc
             limit 1
            """;

    private final JdbcTemplate jdbcTemplate;

    public VehicleController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/primary")
    public ResponseEntity<PrimaryVehicleResponse> primaryVehicle(@AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(jwt.getSubject());

        return jdbcTemplate.query(PRIMARY_VEHICLE_QUERY, primaryVehicleRowMapper(), userId)
                .stream()
                .findFirst()
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    private RowMapper<PrimaryVehicleResponse> primaryVehicleRowMapper() {
        return this::mapPrimaryVehicle;
    }

    private PrimaryVehicleResponse mapPrimaryVehicle(ResultSet resultSet, int rowNumber) throws SQLException {
        return new PrimaryVehicleResponse(
                resultSet.getObject("id", UUID.class),
                resultSet.getString("nickname"),
                resultSet.getString("plate"),
                resultSet.getObject("manufacture_year", Short.class),
                resultSet.getObject("model_year", Short.class),
                resultSet.getString("color"),
                resultSet.getObject("mileage", Integer.class),
                resultSet.getString("photo_path"),
                resultSet.getString("brand_name"),
                resultSet.getString("model_name"),
                resultSet.getString("vehicle_version")
        );
    }
}
