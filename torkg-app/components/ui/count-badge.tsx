import { Text, View } from "react-native";

interface CountBadgeProps {
  count: number;
}

export default function CountBadge({ count }: CountBadgeProps) {
  if (count <= 0) {
    return null;
  }

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        top: -8,
        right: -10,
        zIndex: 1,
        minWidth: 17,
        height: 17,
        paddingHorizontal: 3,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ff4e00",
        borderWidth: 1,
        borderColor: "#15181b",
      }}
    >
      <Text style={{ color: "#ffffff", fontSize: 10, fontWeight: "700" }}>
        {count > 99 ? "99+" : count}
      </Text>
    </View>
  );
}
