import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import CountBadge from '@/components/ui/count-badge';
import { useRouter } from 'expo-router';
import {
  CircleGauge,
  Cog,
  Filter,
  Plus,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIES = ['Todos', 'Motor', 'Freios', 'Filtros', 'Suspensão'];

const PRODUCTS = [
  {
    id: 1,
    name: 'Pastilha de freio Bosch',
    description: 'Dianteira · Vectra 97–05',
    code: 'BOSCH-PF-9705',
    category: 'Freios',
    price: '189,90',
    icon: CircleGauge,
  },
  {
    id: 2,
    name: 'Filtro de óleo Tecfil',
    description: 'Motor 2.0 8V · PSL55',
    code: 'PSL55',
    category: 'Filtros',
    price: '34,90',
    icon: Filter,
  },
  {
    id: 3,
    name: 'Kit correia dentada',
    description: 'Contitech · CT874K1',
    code: 'CT874K1',
    category: 'Motor',
    price: '329,00',
    icon: Cog,
  },
  {
    id: 4,
    name: 'Jogo de velas NGK',
    description: 'BPR6EY · 4 unidades',
    code: 'BPR6EY',
    category: 'Motor',
    price: '112,50',
    icon: Sparkles,
  },
];

export default function ProductsScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('pt-BR');

    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLocaleLowerCase('pt-BR').includes(normalizedSearch) ||
        product.description.toLocaleLowerCase('pt-BR').includes(normalizedSearch) ||
        product.code.toLocaleLowerCase('pt-BR').includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#090d0f' }} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 16, paddingBottom: 30 }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text style={{ color: '#9aa6b2', fontSize: 12 }}>
              Compatíveis com seu veículo
            </Text>
            <Text
              style={{
                color: '#ffffff',
                fontSize: 23,
                lineHeight: 29,
                fontWeight: '800',
                marginTop: 4,
              }}
            >
              Catálogo de peças
            </Text>
          </View>

          <Button
            width={44}
            height={44}
            padding={0}
            borderRadius={14}
            borderColor="#30383e"
            backgroundColor="#151a1e"
            onPress={() => router.push('/cart')}
          >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ position: 'relative' }}>
                <ShoppingCart size={20} color="#ffffff" strokeWidth={1.8} />
                <CountBadge count={2} />
              </View>
            </View>
          </Button>
        </View>

        <View
          style={{
            height: 50,
            marginTop: 12,
            paddingHorizontal: 14,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#2c3439',
            backgroundColor: '#151a1e',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Search size={19} color="#89939c" strokeWidth={1.7} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Buscar peça, marca ou código"
            placeholderTextColor="#7f8992"
            selectionColor="#ff4e00"
            style={{ flex: 1, color: '#ffffff', fontSize: 13, marginLeft: 12 }}
          />
          <SlidersHorizontal size={18} color="#7f8992" strokeWidth={1.5} />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0, marginTop: 12 }}
          contentContainerStyle={{ gap: 8, paddingRight: 8 }}
        >
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;

            return (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={({ pressed }) => ({
                  height: 38,
                  minWidth: 60,
                  paddingHorizontal: 16,
                  borderRadius: 14,
                  borderWidth: 1,
                  borderColor: isSelected ? '#ff4e00' : '#2c3439',
                  backgroundColor: isSelected ? '#190d09' : '#12171b',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: pressed ? 0.75 : 1,
                })}
              >
                <Text
                  style={{
                    color: isSelected ? '#ffffff' : '#9ba6af',
                    fontSize: 12,
                    fontWeight: isSelected ? '700' : '400',
                  }}
                >
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View
          style={{
            marginTop: 18,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          {filteredProducts.map((product) => {
            const ProductIcon = product.icon;

            return (
              <View key={product.id} style={{ width: '48.5%' }}>
                <Card
                  width="100%"
                  height={240}
                  borderColor="#2b3338"
                  backgroundColor="#111619"
                >
                  <View
                    style={{
                      height: 104,
                      borderRadius: 15,
                      backgroundColor: '#20262a',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ProductIcon size={19} color="#8d99a3" strokeWidth={1.3} />
                  </View>

                  <Text
                    numberOfLines={2}
                    style={{
                      color: '#ffffff',
                      fontSize: 13,
                      lineHeight: 17,
                      fontWeight: '800',
                      marginTop: 14,
                    }}
                  >
                    {product.name}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={{ color: '#92a2b2', fontSize: 9, marginTop: 12 }}
                  >
                    {product.description}
                  </Text>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '800' }}>
                      R$ {product.price}
                    </Text>

                    <Button
                      width={36}
                      height={36}
                      padding={0}
                      borderRadius={12}
                      backgroundColor="#ff3d0a"
                    >
                      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Plus size={20} color="#ffffff" strokeWidth={1.8} />
                      </View>
                    </Button>
                  </View>
                </Card>
              </View>
            );
          })}

          {filteredProducts.length === 0 && (
            <View style={{ width: '100%', paddingVertical: 50, alignItems: 'center' }}>
              <Text style={{ color: '#8e99a2', fontSize: 14 }}>
                Nenhuma peça encontrada.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
