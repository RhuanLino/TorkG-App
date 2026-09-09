import { ThemedText } from "@/components/themed-text";
import { View, Text, ScrollView } from "react-native";

export default function Cart() {
    return (
        <ScrollView style={{ flex: 1, margin: 20 }}>
            <View>
                <ThemedText>Esta é a página do Carrinho!</ThemedText>
            </View>
        </ScrollView>
    );
}
