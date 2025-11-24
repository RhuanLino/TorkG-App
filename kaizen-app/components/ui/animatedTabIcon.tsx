import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface PropsIcon {
    color: string;
    name: keyof typeof IconSymbol;
    focused: boolean;
    size?: number;
}

export function AnimatedTabIcon({ color, name, focused, size = 28 }: PropsIcon) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: focused ? 1.2 : 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: focused ? 1 : 0.6,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale }], opacity }}>
      <IconSymbol size={size} name={name} color={color} />
    </Animated.View>
  );
}
