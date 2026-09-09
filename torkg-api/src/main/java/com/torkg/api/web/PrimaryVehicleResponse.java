package com.torkg.api.web;

import java.util.UUID;

public record PrimaryVehicleResponse(
        UUID id,
        String nickname,
        String plate,
        Short manufactureYear,
        Short modelYear,
        String color,
        Integer mileage,
        String photoPath,
        String brandName,
        String modelName,
        String vehicleVersion
) {
}
