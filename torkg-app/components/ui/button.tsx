import { Animated, Pressable, View } from "react-native";

import type {
  ColorValue,
  DimensionValue,
  PressableProps,
} from "react-native";
import { useRef } from "react";
import type { ReactNode } from "react";

interface ButtonProps {
  width: DimensionValue;
  height: DimensionValue;
  backgroundColor?: ColorValue;
  borderColor?: ColorValue;
  borderRadius?: number;
  padding?: number;
  children: ReactNode;
  onPress?: PressableProps["onPress"];
}

export default function Button({
  width,
  height,
  backgroundColor = "#15181b",
  borderColor = "rgba(0,0,0,0)",
  borderRadius = 24,
  padding = 18,
  children,
  onPress,
}: ButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (toValue: number, duration: number) => {
    Animated.timing(scale, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={() => animateTo(0.96, 65)}
        onPressOut={() => animateTo(1, 90)}
        style={{
          width,
          height,
          padding,
          position: "relative",
          overflow: "hidden",
          borderWidth: 1,
          borderColor,
          borderRadius,
          backgroundColor,
        }}
      >
        <View style={{ flex: 1, zIndex: 1 }}>{children}</View>
      </Pressable>
    </Animated.View>
  );
}
