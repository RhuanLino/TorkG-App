import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { CarFront, House, Package, ShoppingCart } from 'lucide-react-native';
import { AnimatedTabButton } from '@/components/ui/animated-tab-button';
import CountBadge from '@/components/ui/count-badge';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ff4e00",
        headerShown: false,
        tabBarButton: (props) => <AnimatedTabButton {...props} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, focused }) => (
            <House size={20} color={color} strokeWidth={1.7} />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Peças',
          tabBarIcon: ({ color, focused }) => (
            <Package size={20} color={color} strokeWidth={1.7} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-car"
        options={{
          title: 'Meu carro',
          tabBarIcon: ({ color, focused }) => (
            <CarFront size={20} color={color} strokeWidth={1.7} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Carrinho',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ position: "relative" }}>
              <ShoppingCart size={20} color={color} strokeWidth={1.7} />
              <CountBadge count={2} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
