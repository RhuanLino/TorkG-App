import { router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import Card from "@/components/ui/card";
import { CarFront, Engine, Gauge, Radius, Cog, Fuel, RulerDimensionLine, Weight, LifeBuoy, RectangleEllipsis, Pen, ChevronLeft } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import Button from '@/components/ui/button';

export default function MyCar() {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, margin: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: 20, gap: 15 }}>
                <Button
                    width={60}
                    height={60}
                    borderColor="#424242"
                    onPress={() => router.back()}
                >
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <ChevronLeft size={50} color="#ffffff" strokeWidth={1.7} />
                    </View>
                </Button>
                <View style={{ gap: 4 }}>
                    <ThemedText style={{ fontSize: 16, color: "#a9abad" }}>Meu veículo</ThemedText>
                    <ThemedText style={{ fontSize: 24, fontWeight: "700" }}>Ficha técnica</ThemedText>
                </View>
            </ View>
            <View style={{ position: "absolute", right: 0, top: 0, zIndex: 1 }}>
                <Button
                    width={60}
                    height={60}
                    borderColor="#424242"
                    onPress={() => console.log("Editar veículo")}
                >
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Pen size={20} color="#ffffff" strokeWidth={1.7} />
                    </View>
                </Button>
            </View>
            <View style={{marginBottom: 10}}>
                <Card width={'auto'} height={200} borderColor="#424242">
                    {/* Elemento decorativo equivalente ao ::after */}
                    <View style={{ flex: 3, alignItems: "center", justifyContent: "center" }}>
                        <CarFront size={40} color="#424242" strokeWidth={1.7} />
                    </View>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", gap: 2 }}>
                        <Text
                            style={{
                                color: "#ffffff",
                                fontSize: 21,
                                fontWeight: "700",
                            }}
                        >
                            Chevrolet Vectra GLS
                        </Text>
                        <Text
                            style={{
                                color: "#a9abad",
                                fontSize: 12,
                                fontWeight: "500",
                                marginBottom: 4,
                            }}
                        >
                            2.0 MPFI 8V • 2000 • Gasolina
                        </Text>
                    </View>
                </Card>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    gap: 12,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        marginTop: 10,
                        gap: 10
                    }}
                >
                    <Card width={'100%'} height={'22%'} borderColor="#424242">
                        <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center" }}>
                            <Engine size={30} color="#ff4e00" strokeWidth={1.7} />
                            <ThemedText style={{ fontSize: 12, color: "#a9abad", marginTop: 8 }}>Potência</ThemedText>
                            <ThemedText style={{ fontSize: 16, fontWeight: "500" }}>110 cv @ 5.200 rpm</ThemedText>
                        </View>
                    </Card>
                    <Card width={'100%'} height={'22%'} borderColor="#424242">
                        <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center" }}>
                            <Cog size={30} color="#ff4e00" strokeWidth={1.7} />
                            <ThemedText style={{ fontSize: 12, color: "#a9abad", marginTop: 8 }}>Câmbio</ThemedText>
                            <ThemedText style={{ fontSize: 16, fontWeight: "500" }}>Manual • 5 marchas</ThemedText>
                        </View>
                    </Card>
                    <Card width={'100%'} height={'22%'} borderColor="#424242">
                        <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center" }}>
                            <RulerDimensionLine size={30} color="#ff4e00" strokeWidth={1.7} />
                            <ThemedText style={{ fontSize: 12, color: "#a9abad", marginTop: 8 }}>Comprimento</ThemedText>
                            <ThemedText style={{ fontSize: 16, fontWeight: "500" }}>4.477 mm</ThemedText>
                        </View>
                    </Card>
                    <Card width={'100%'} height={'22%'} borderColor="#424242">
                        <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center" }}>
                            <LifeBuoy size={30} color="#ff4e00" strokeWidth={1.7} />
                            <ThemedText style={{ fontSize: 12, color: "#a9abad", marginTop: 8 }}>Pneus</ThemedText>
                            <ThemedText style={{ fontSize: 16, fontWeight: "500" }}>195/65 R15</ThemedText>
                        </View>
                    </Card>
                </View>

                <View
                    style={{
                        flex: 1,
                        marginTop: 10,
                        gap: 10
                    }}
                >
                    <Card width={'100%'} height={'22%'} borderColor="#424242">
                        <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center"}}>
                            <Radius size={30} color="#ff4e00" strokeWidth={1.7} />
                            <ThemedText style={{ fontSize: 12, color: "#a9abad", marginTop: 8 }}>Torque</ThemedText>
                            <ThemedText style={{ fontSize: 16, fontWeight: "500" }}>17,3 kgfm @ 2.600</ThemedText>
                        </View>
                    </Card>
                    <Card width={'100%'} height={'22%'} borderColor="#424242">
                        <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center"}}>
                            <Fuel size={30} color="#ff4e00" strokeWidth={1.7} />
                            <ThemedText style={{ fontSize: 12, color: "#a9abad", marginTop: 8 }}>Tanque</ThemedText>
                            <ThemedText style={{ fontSize: 16, fontWeight: "500" }}>57 litros</ThemedText>
                        </View>
                    </Card>
                    <Card width={'100%'} height={'22%'} borderColor="#424242">
                        <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center"}}>
                            <Weight size={30} color="#ff4e00" strokeWidth={1.7} />
                            <ThemedText style={{ fontSize: 12, color: "#a9abad", marginTop: 8 }}>Peso</ThemedText>
                            <ThemedText style={{ fontSize: 16, fontWeight: "500" }}>1.250 kg</ThemedText>
                        </View>
                    </Card>
                    <Card width={'100%'} height={'22%'} borderColor="#424242">
                        <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center"}}>
                            <RectangleEllipsis size={30} color="#ff4e00" strokeWidth={1.7} />
                            <ThemedText style={{ fontSize: 12, color: "#a9abad", marginTop: 8 }}>Placa</ThemedText>
                            <ThemedText style={{ fontSize: 16, fontWeight: "500" }}>ABC-1D23</ThemedText>
                        </View>
                    </Card>
                </View>
            </View>
        </ScrollView>
    );
}
