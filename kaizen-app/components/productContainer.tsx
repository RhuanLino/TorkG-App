import { Image } from "expo-image";
import { FlatList, View } from "react-native";
import { ThemedView } from "./themed-view";
import { ThemedText } from "./themed-text";

interface ProductProps {
    id: number;
    name: string;
    image: any;
    price: string;
}

export default function ProductContainer({ products }: { products: ProductProps[] }) {
    return (
        <View>
            <FlatList<ProductProps>
                data={products}
                numColumns={2}
                scrollEnabled={false}
                style={{ flex: 1, width: "100%" }}
                keyExtractor={(product) => product.id.toString()}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            width: "48%",
                            height: 200,
                            borderRadius: 12,
                            marginBottom: 10,
                        }}
                    >
                        <Image source={item.image} style={{ width: 150, height: 150 }}></Image>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <ThemedText style={{ textAlign: "center", marginTop: 2 }}>{item.name}</ThemedText>
                        </View>
                        <ThemedText style={{ textAlign: "center", fontWeight: "bold", fontSize: 23, marginTop: 20 }}>R$ {item.price}</ThemedText>*
                    </View>
                )}
            />
        </View>
    );
}