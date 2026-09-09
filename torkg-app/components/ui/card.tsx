import { View } from "react-native";

import type {
    ColorValue,
    DimensionValue,
} from "react-native";
import type { ReactNode } from "react";

interface CardProps {
    width: DimensionValue;
    height: DimensionValue;
    borderColor: ColorValue;
    children: ReactNode;
}

export default function Card({
    width,
    height,
    borderColor,
    children,
}: CardProps) {
    return (
        <View
            style={{
                width,
                height,
                minHeight: 180,
                padding: 18,
                position: "relative",
                overflow: "hidden",
                borderWidth: 1,
                borderColor,
                borderRadius: 24,
                backgroundColor: "#15181b",
            }}
        >
            {/* Elemento decorativo equivalente ao ::after */}
            <View
                pointerEvents="none"
                style={{
                    position: "absolute",
                    width: 210,
                    height: 210,
                    right: -93,
                    bottom: -110,
                    borderWidth: 34,
                    borderColor: "rgba(255, 78, 0, 0.08)",
                    borderRadius: 105,
                }}
            />

            <View
                style={{
                    flex: 1,
                    zIndex: 1,
                }}
            >
                {children}
            </View>
        </View>
    );
}
