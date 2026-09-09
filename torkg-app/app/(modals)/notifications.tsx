import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export default function NotificationsScreen() {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 160,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 160,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  return (
    <ThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Animated.View style={{ opacity, transform: [{ translateY }] }}>
        <ThemedText style={{ fontSize: 20, fontWeight: "bold" }}>Notificações</ThemedText>
        <ThemedText style={{ fontSize: 16, marginTop: 10 }}>
          Aqui você verá todas as suas notificações.
        </ThemedText>
      </Animated.View>
    </ThemedView>
  );
}
