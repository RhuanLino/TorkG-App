import { Tabs } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { CarFront, House, Package, ShoppingCart } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "rgba(0,165,172,0.8)",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, focused }) => (
            <House size={20} color="#ff4e00" strokeWidth={1.7} />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Peças',
          tabBarIcon: ({ color, focused }) => (
            <Package size={20} color="#ff4e00" strokeWidth={1.7} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-car"
        options={{
          title: 'Meu carro',
          tabBarIcon: ({ color, focused }) => (
            <CarFront size={20} color="#ff4e00" strokeWidth={1.7} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Carrinho',
          tabBarIcon: ({ color, focused }) => (
            <ShoppingCart size={20} color="#ff4e00" strokeWidth={1.7} />
          ),
        }}
      />
    </Tabs>
  );
}
