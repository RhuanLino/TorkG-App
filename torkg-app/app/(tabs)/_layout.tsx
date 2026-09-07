import { Tabs } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import {AnimatedTabIcon } from '@/components/ui/animatedTabIcon';

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
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon color={color} focused={focused} name="house.fill" />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Produtos',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon color={color} focused={focused} name="bag.fill" />
          ),
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon color={color} focused={focused} name="gearshape.fill" />
          ),
        }}
      />
    </Tabs>
  );
}
