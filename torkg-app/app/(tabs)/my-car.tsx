import { ThemedText } from "@/components/themed-text";
import { ScrollView, Text, View } from "react-native";

export default function MyCar() {
    return (
        <ScrollView style={{ flex: 1, margin: 20 }}>
            <View>
                <ThemedText>Esta é a página do Seu Carro!</ThemedText>
            </View>
        </ScrollView>
    );
}
