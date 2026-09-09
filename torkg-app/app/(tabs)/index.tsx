import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme.web';
import { Image } from 'expo-image';
import { useRouter, type Href } from "expo-router";
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Bell, CarFront, FileSearchCorner, Gauge, Package, Wrench } from "lucide-react-native";

import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import CountBadge from '@/components/ui/count-badge';

export default function HomeScreen() {

    const colorScheme = useColorScheme();
    const router = useRouter();

    const anuncios = [
        {
            id: 1,
            image: require('@/assets/images/ads/pecas_velhas.jpg'),
            url: 'https://kaizen.com.br',
            title: 'Peças Kaizen com Desconto'
        },
        {
            id: 2,
            image: require('@/assets/images/ads/fixing.jpg'),
            url: 'https://kaizen.com.br',
            title: 'Serviços de Manutenção'
        },
        {
            id: 3,
            image: require('@/assets/images/ads/unidade_kzn.webp'),
            url: 'https://kaizen.com.br',
            title: 'Visite Nossa Loja Física'
        }
    ];

    const products = [
        {
            id: 1,
            name: 'Amortecedor',
            image: require('@/assets/images/products/amortecedor.png'),
            price: "399,90"
        },
        {
            id: 2,
            name: 'Pastilha de Freio',
            image: require('@/assets/images/products/pastilha.png'),
            price: "299,90"
        },
        {
            id: 3,
            name: 'Limpador de Parabrisa',
            image: require('@/assets/images/products/limpador_parabrisa.png'),
            price: "85,99"
        },
        {
            id: 4,
            name: 'Disco de Freio',
            image: require('@/assets/images/products/disco_freio.png'),
            price: "249,90"
        },
    ];

    const acessoRapido = [
        {
            title: 'Catálogo de peças',
            icon: 'package',
            route: '/products' as Href
        },
        {
            title: 'Histórico de manutenção',
            icon: 'wrench',
            route: '/maintenance-history' as Href
        },
        {
            title: 'Ficha técnica',
            icon: 'file-search-corner',
            route: '/technical-sheet' as Href
        }
    ]

    const vehicle = {
        id: '...',
        user_id: '...',
        vehicle_version: 'Vectra GLS 2.0 8V',
        nickname: 'Meu Vectra',
        plate: 'ABC1D23',
        manufacture_year: 2000,
        model_year: 2000,
        color: 'Prata',
        mileage: 168450,
        is_primary: true,
        photo_path: null,
        created_at: '...',
        updated_at: '...',
    };

    const manutencao = {
        id: '4a6759be-2e88-4b84-8371-9712052c8b12',
        vehicle_id: 'c0b52e36-1f78-48a6-b64c-9c6ad1d53209',
        category_id: '1fc47c4d-5821-422b-a03d-ecf45cc483d1',
        title: 'Troca de óleo',
        description: 'Troca de óleo do motor e filtro de óleo.',
        performed_at: '2026-07-10',
        mileage: 165950,
        cost: 245.9,
        workshop_name: 'Oficina Kaizen',
        next_due_date: '2027-01-10',
        next_due_mileage: 170950,
        created_at: '2026-07-10T14:30:00.000Z',
        updated_at: '2026-07-10T14:30:00.000Z',
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ margin: 20 }}>
                <View style={{ position: "absolute", right: 0, top: 0, zIndex: 1 }}>
                    <Button
                        width={60}
                        height={60}
                        borderColor="#424242"
                        onPress={() => router.push("/notifications")}
                    >
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <CountBadge count={2} />
                            <Bell size={20} color="#ffffff" strokeWidth={1.7} />
                        </View>
                    </Button>
                </View>

                <ThemedText style={{ fontSize: 16, marginLeft: 10, color: "#a9abad" }}>Olá, Rhuan!</ThemedText>
                <Image source={require('@/assets/logos/logo.png')} style={{ width: 170, height: 60, marginVertical: 5 }}></Image>
                <Card width={'auto'} height={200} borderColor="#ff4e00">
                    {/* Elemento decorativo equivalente ao ::after */}
                    <View
                        pointerEvents="none"
                        style={{
                            position: "absolute",
                            width: 260,
                            height: 260,
                            right: -93,
                            bottom: -110,
                            borderWidth: 34,
                            borderColor: "rgba(255, 78, 0, 0.08)",
                            borderRadius: 150,
                        }}
                    />
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            gap: 12,
                        }}
                    >
                        <View style={{ flex: 1 }}>
                            <Text
                                style={{
                                    color: "#a9abad",
                                    fontSize: 12,
                                    fontWeight: "500",
                                    marginBottom: 4,
                                }}
                            >
                                {vehicle.nickname} • {vehicle.manufacture_year}
                            </Text>

                            <Text
                                style={{
                                    color: "#ffffff",
                                    fontSize: 21,
                                    fontWeight: "700",
                                }}
                            >
                                {vehicle.vehicle_version}
                            </Text>
                        </View>

                        <Pressable
                            onPress={() => router.push("/")}
                            hitSlop={12}
                            style={({ pressed }) => ({
                                paddingVertical: 4,
                                paddingHorizontal: 6,
                                borderRadius: 8,
                                opacity: pressed ? 0.6 : 1,
                            })}
                        >
                            <Text
                                style={{
                                    color: "#ff6b2b",
                                    fontSize: 13,
                                    fontWeight: "600",
                                }}
                            >
                                Ver ficha
                            </Text>
                        </Pressable>
                    </View>

                    <View
                        style={{
                            flex: 1,
                            minHeight: 70,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <CarFront size={58} color="#ff4e00" strokeWidth={1.7} />
                    </View>

                    <View
                        style={{
                            alignSelf: "flex-start",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 7,
                        }}
                    >
                        <Gauge size={18} color="#ff8a52" />

                        <Text
                            style={{
                                color: "#ffffff",
                                fontSize: 14,
                                fontWeight: "700",
                            }}
                        >
                            {vehicle.mileage.toLocaleString()} km
                        </Text>
                    </View>
                </Card>
                {/* <View style={{ marginTop: 20 }}>
                    <ThemedText style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 30 }}>Bem-vindo!</ThemedText>
                    <Carousel data={anuncios} />
                </View> */}

                <ThemedText style={{ marginVertical: 30, fontWeight: "bold", fontSize: 18 }}>Acesso rápido</ThemedText>

                {/* Slider acesso rápido */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ height: 160, flexGrow: 0, flexShrink: 0 }}
                    contentContainerStyle={{ gap: 10 }}
                >
                    {acessoRapido.map((item) => (
                        <Button
                            width={126}
                            height={160}
                            borderColor="#424242"
                            onPress={() => router.push(item.route)}
                            key={typeof item.route === 'string' ? item.route : item.route.pathname}
                        >
                            <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "flex-start" }}>
                                <Card width={60} height={60} backgroundColor="#ff4d0028">
                                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                        {item.icon === 'package' && <Package size={30} color="#ff4e00" strokeWidth={1.7} />}
                                        {item.icon === 'wrench' && <Wrench size={30} color="#ff4e00" strokeWidth={1.7} />}
                                        {item.icon === 'file-search-corner' && <FileSearchCorner size={30} color="#ff4e00" strokeWidth={1.7} />}
                                    </View>
                                </Card>
                            </View>
                            <ThemedText style={{ fontSize: 14, fontWeight: "bold" }}>{item.title}</ThemedText>
                        </Button>
                    ))}
                </ScrollView>

                {/* Próxima manutenção container */}
                <View>
                    <ThemedText style={{ marginVertical: 30, fontWeight: "bold", fontSize: 18 }}>Próxima manutenção</ThemedText>

                    <Card width={'auto'} height={'auto'} borderColor="#ff8800">
                        <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start" }}>

                            <Card width={60} height={60} backgroundColor="#ff880025">
                                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                    <FileSearchCorner size={30} color="#ff8800" strokeWidth={1.7} />
                                </View>
                            </Card>
                            <View style={{ flex: 1, marginLeft: 15, justifyContent: "center", alignItems: "flex-start" }}>
                                <ThemedText style={{ fontSize: 14, fontWeight: "bold", marginBottom: 5 }}>{manutencao.title}</ThemedText>
                                <ThemedText style={{ fontSize: 12, color: "#a9abad" }}>{manutencao.description}</ThemedText>
                            </View>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
                                <ThemedText style={{ fontSize: 14, fontWeight: "bold", color: "#ff8800" }}>{manutencao.next_due_mileage}km</ThemedText>
                                <ThemedText style={{ fontSize: 12, color: "#ff8800" }}>para nova troca</ThemedText>
                            </View>
                        </View>
                    </Card>
                </View>

                {/* Para seu {veículo} */}
                <View>
                    <ThemedText style={{ marginVertical: 30, fontWeight: "bold", fontSize: 18 }}>Para seu {vehicle.nickname}</ThemedText>

                    <Card width={'auto'} height={'auto'} borderColor="#ff8800">
                        <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start" }}>

                            <Card width={60} height={60} backgroundColor="#ff880025">
                                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                    <FileSearchCorner size={30} color="#ff8800" strokeWidth={1.7} />
                                </View>
                            </Card>
                            <View style={{ flex: 1, marginLeft: 15, justifyContent: "center", alignItems: "flex-start" }}>
                                <ThemedText style={{ fontSize: 14, fontWeight: "bold", marginBottom: 5 }}>Kit pastilha de freio dianteira</ThemedText>
                                <ThemedText style={{ fontSize: 12, color: "#a9abad" }}>Compatível com Vectra GLS 2.0 8V</ThemedText>
                            </View>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
                                <ThemedText style={{ fontSize: 14, fontWeight: "bold", color: "#ff8800" }}>R$ 189,00</ThemedText>
                            </View>
                        </View>
                    </Card>
                </View>
            </ScrollView>
        </View>
    );
}
