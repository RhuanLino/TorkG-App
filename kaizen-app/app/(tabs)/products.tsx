import { ScrollView, TextInput, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme.web';

import ProductContainer from '@/components/productContainer';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedView } from '@/components/themed-view';

export default function ProductsScreen() {

  const colorScheme = useColorScheme();

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
    {
      id: 5,
      name: 'Óleo Motor',
      image: require('@/assets/images/products/oleo.png'),
      price: "49,90"
    },
  ];

  return (
    <ScrollView style={{ flex: 1, margin: 20 }}>
      <ThemedView style={{ borderRadius: 15, marginBottom: 20, padding: 20 }}>
        <ThemedText style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 30 }}>Produtos Kaizen</ThemedText>
        <IconSymbol
          size={25}
          color="#808080"
          name="magnifyingglass"
          style={{
            position: 'absolute',
            left: 34,
            top: 82,
            zIndex: 10
          }}
        />
        <TextInput placeholder='Buscar por produtos' placeholderTextColor="rgba(156, 156, 156, 0.6)" style={{
          backgroundColor: colorScheme === 'dark' ? "rgba(43, 43, 43, 0.53)" : "rgba(230, 230, 230, 1)",
          borderRadius: 50,
          height: 40,
          paddingLeft: 48,
          fontSize: 16,
        }}></TextInput>
        {/* Badge de filtros */}
        <View
          style={{
            marginTop: 15,
            alignSelf: 'flex-start',
            backgroundColor:
              colorScheme === 'dark' ? 'rgba(43, 43, 43, 0.53)' : '#e5e5e5',
            paddingVertical: 6,
            paddingHorizontal: 14,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <IconSymbol name="slider.horizontal.3" size={18} color="#808080" />
          <ThemedText style={{ fontSize: 14, color: '#808080', marginLeft: 6 }}>
            Filtros
          </ThemedText>
        </View>
      </ThemedView>
      
      <ThemedView style={{ flex: 1, borderRadius: 15, marginTop: 10 }}>
        <ProductContainer products={products} />
      </ThemedView>
    </ScrollView>
  );
}
