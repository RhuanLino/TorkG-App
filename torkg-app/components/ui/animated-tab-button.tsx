import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import { useRef } from 'react';
import { Animated } from 'react-native';

export function AnimatedTabButton({
  style,
  onPressIn,
  onPressOut,
  ...props
}: BottomTabBarButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (toValue: number, duration: number) => {
    Animated.timing(scale, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ flex: 1, alignItems: "center", justifyContent: "center", transform: [{ scale }] }}>
      <PlatformPressable
        {...props}
        style={style}
        onPressIn={(event) => {
          animateTo(0.96, 65);
          onPressIn?.(event);
        }}
        onPressOut={(event) => {
          animateTo(1, 90);
          onPressOut?.(event);
        }}
      />
    </Animated.View>
  );
}
