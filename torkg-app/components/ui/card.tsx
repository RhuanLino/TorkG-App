import { View } from "react-native";

import type {
    ColorValue,
    DimensionValue,
} from "react-native";
import type { ReactNode } from "react";

interface CardProps {
    width: DimensionValue;
    height: DimensionValue;
    backgroundColor?: ColorValue;
    borderColor?: ColorValue;
    children: ReactNode;
}

export default function Card({
    width,
    height,
    backgroundColor = "#15181b",
    borderColor = "rgba(0,0,0,0)",
    children,
}: CardProps) {
    return (
        <View
            style={{
                width,
                height,
                padding: 18,
                position: "relative",
                overflow: "hidden",
                borderWidth: 1,
                borderColor,
                borderRadius: 24,
                backgroundColor,
            }}
        >
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
