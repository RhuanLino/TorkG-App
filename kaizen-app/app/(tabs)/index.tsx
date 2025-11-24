import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme.web';
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import { Button, ScrollView, Text, View } from 'react-native';
import ProductContainer from '@/components/productContainer';

import Carousel from '@/components/carousel';

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

  return (
    <View style={{ flex: 1 }}>
      <ThemedView style={{ height: 60, flexDirection: "row", alignItems: "center", justifyContent: "center", borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
        <Image source={require('@/assets/logos/logo_kzn.png')} style={{ width: 130, height: 50 }}></Image>
      </ThemedView>

      <ScrollView style={{ margin: 20 }}>
        <View style={{ marginTop: 20 }}>
          <ThemedText style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 30 }}>Bem-vindo!</ThemedText>
          <Carousel data={anuncios} />
        </View>

        <Text style={{ marginTop: 30, fontWeight: "bold", fontSize: 30, textAlign: "center", color: "rgba(0,165,172,0.8)" }}>Produtos</Text>

        <ThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center", borderTopRightRadius: 15, borderTopLeftRadius: 15, marginTop: 20, padding: 20 }}>
          <ProductContainer products={products} />
        </ThemedView>

        <View style={{
          alignItems: "center",
          justifyContent: "center",
          height: 50,
          backgroundColor: "rgba(0,165,172,0.8)",
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15
        }}>
          <Button title="Mais Produtos" onPress={() => router.push("/products")} color="rgba(0,0,0,0)"/>
        </View>
      </ScrollView>
    </View>
  );
}
