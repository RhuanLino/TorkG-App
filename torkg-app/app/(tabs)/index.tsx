import { ThemedText } from '@/components/themed-text';
import { Image } from 'expo-image';
import { useRouter, type Href } from "expo-router";
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { Bell, CarFront, FileSearchCorner, Gauge, Package, Wrench } from "lucide-react-native";

import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import CountBadge from '@/components/ui/count-badge';
import { getPrimaryVehicle, type PrimaryVehicle } from '@/lib/api';
import { getVehiclePhotoUrl } from '@/lib/supabase';
import { useAuth } from '@/providers/auth-provider';

export default function HomeScreen() {

    const router = useRouter();
    const { session, user } = useAuth();
    const [primaryVehicle, setPrimaryVehicle] = useState<PrimaryVehicle | null>(null);
    const [isLoadingVehicle, setIsLoadingVehicle] = useState(true);

    useEffect(() => {
        let isCurrent = true;

        const loadPrimaryVehicle = async () => {
            if (!session?.access_token) {
                return;
            }

            setIsLoadingVehicle(true);
            try {
                const nextVehicle = await getPrimaryVehicle(session.access_token);
                if (isCurrent) {
                    setPrimaryVehicle(nextVehicle);
                }
            } catch {
                if (isCurrent) {
                    setPrimaryVehicle(null);
                }
            } finally {
                if (isCurrent) {
                    setIsLoadingVehicle(false);
                }
            }
        };

        void loadPrimaryVehicle();
        return () => {
            isCurrent = false;
        };
    }, [session?.access_token]);

    const acessoRapido = [
        { title: 'Catálogo de peças', icon: 'package', route: '/products' as Href },
        { title: 'Histórico de manutenção', icon: 'wrench', route: '/maintenance-history' as Href },
        { title: 'Ficha técnica', icon: 'file-search-corner', route: '/my-car' as Href },
    ];

    const vehicle = primaryVehicle
        ? {
            nickname: primaryVehicle.nickname ?? 'Meu veículo',
            manufactureYear: primaryVehicle.manufactureYear ?? primaryVehicle.modelYear,
            vehicleVersion: [primaryVehicle.brandName, primaryVehicle.modelName, primaryVehicle.vehicleVersion]
                .filter(Boolean)
                .join(' '),
            mileage: primaryVehicle.mileage,
            photoUrl: getVehiclePhotoUrl(primaryVehicle.photoPath),
        }
        : null;

    const firstName = user?.user_metadata.full_name?.split(' ')[0] ?? user?.email?.split('@')[0] ?? 'motorista';
    const manutencao = {
        title: 'Troca de óleo',
        description: 'Troca de óleo do motor e filtro de óleo.',
        nextDueMileage: 170950,
    };
    const recommendedProduct = {
        name: 'Kit pastilha de freio dianteira',
        description: 'Compatível com Vectra GLS 2.0 8V',
        price: 'R$ 189,00',
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

                <ThemedText style={{ fontSize: 16, marginLeft: 10, color: "#a9abad" }}>Olá, {firstName}!</ThemedText>
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
                    {isLoadingVehicle ? (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                            <ActivityIndicator color="#ff4e00" />
                            <Text style={{ color: '#a9abad' }}>Carregando seu veículo...</Text>
                        </View>
                    ) : vehicle ? (
                        <>
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
                                        {vehicle.nickname}{vehicle.manufactureYear ? ` • ${vehicle.manufactureYear}` : ''}
                                    </Text>

                                    <Text
                                        style={{
                                            color: "#ffffff",
                                            fontSize: 21,
                                            fontWeight: "700",
                                        }}
                                    >
                                        {vehicle.vehicleVersion || 'Veículo sem versão cadastrada'}
                                    </Text>
                                </View>

                                <Pressable
                                    onPress={() => router.push("/my-car")}
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
                                {vehicle.photoUrl ? (
                                    <Image
                                        source={{ uri: vehicle.photoUrl }}
                                        contentFit="cover"
                                        style={{ width: 110, height: 72, borderRadius: 10 }}
                                    />
                                ) : (
                                    <CarFront size={58} color="#ff4e00" strokeWidth={1.7} />
                                )}
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
                        </>
                    ) : (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                            <CarFront size={52} color="#ff4e00" strokeWidth={1.7} />
                            <Text style={{ color: '#ffffff', fontSize: 17, fontWeight: '700' }}>Nenhum veículo principal</Text>
                            <Text style={{ color: '#a9abad', textAlign: 'center' }}>Cadastre um veículo e defina-o como principal para vê-lo aqui.</Text>
                        </View>
                    )}
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
                                <ThemedText style={{ fontSize: 14, fontWeight: "bold", color: "#ff8800" }}>{manutencao.nextDueMileage}km</ThemedText>
                                <ThemedText style={{ fontSize: 12, color: "#ff8800" }}>para nova troca</ThemedText>
                            </View>
                        </View>
                    </Card>
                </View>

                {/* Para seu {veículo} */}
                <View>
                    <ThemedText style={{ marginVertical: 30, fontWeight: "bold", fontSize: 18 }}>Para seu {vehicle?.nickname ?? 'veículo'}</ThemedText>

                    <Card width={'auto'} height={'auto'} borderColor="#ff8800">
                        <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start" }}>

                            <Card width={60} height={60} backgroundColor="#ff880025">
                                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                    <FileSearchCorner size={30} color="#ff8800" strokeWidth={1.7} />
                                </View>
                            </Card>
                            <View style={{ flex: 1, marginLeft: 15, justifyContent: "center", alignItems: "flex-start" }}>
                                <ThemedText style={{ fontSize: 14, fontWeight: "bold", marginBottom: 5 }}>{recommendedProduct.name}</ThemedText>
                                <ThemedText style={{ fontSize: 12, color: "#a9abad" }}>{recommendedProduct.description}</ThemedText>
                            </View>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
                                <ThemedText style={{ fontSize: 14, fontWeight: "bold", color: "#ff8800" }}>{recommendedProduct.price}</ThemedText>
                            </View>
                        </View>
                    </Card>
                </View>
            </ScrollView>
        </View>
    );
}
