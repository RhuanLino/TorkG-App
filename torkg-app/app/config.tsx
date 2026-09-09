import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image } from 'expo-image';
import { Linking, TouchableOpacity, View } from 'react-native';

export default function ConfigScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/transmission.jpg')}
          style={{ width: 600, height: 400, }}
          contentFit="contain"
        />
      }>
      <ThemedView>
        <View style={{ alignItems: "center", marginTop: 5, marginBottom: 30 }}>
          <Image source={require('@/assets/logos/logo.png')} style={{ width: 230, height: 80 }}></Image>
        </View>
        
        <ThemedView darkColor="rgba(43, 43, 43, 0.53)" style={{ alignItems: "center", flexDirection: "row", borderRadius: 15, padding: 15 }}>
          <IconSymbol
            size={35}
            color="rgba(201, 201, 201, 0.54)"
            name="pencil.circle.fill"
            style={{ marginRight: 15 }}
          />
          <View style={{ flexShrink: 1 }}>
            <ThemedText style={{ fontWeight: "bold", fontSize: 20, marginBottom: 4 }}>Alterar Tema</ThemedText>
            <ThemedText darkColor="rgba(201, 201, 201, 0.54)" style={{ fontWeight: "400", fontSize: 15, marginBottom: 10 }}>
              Altere o tema do seu aplicativo entre claro e escuro
            </ThemedText>
          </View>
        </ThemedView>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => Linking.openURL("https://www.kaizenautopecas.com.br/")}
        >
          <ThemedView darkColor="rgba(43, 43, 43, 0.53)" style={{ alignItems: "center", flexDirection: "row", borderRadius: 15, padding: 15, marginTop: 10 }}>
            <IconSymbol
              size={35}
              color="rgba(201, 201, 201, 0.54)"
              name="globe"
              style={{ marginRight: 15 }}
            />
            <View style={{ flexShrink: 1 }}>
              <ThemedText style={{ fontWeight: "bold", fontSize: 20, marginBottom: 4 }}>Site Oficial</ThemedText>
              <ThemedText darkColor="rgba(201, 201, 201, 0.54)" style={{ fontWeight: "400", fontSize: 15, marginBottom: 10 }}>
                Acesse o site oficial da Kaizen para mais informações sobre nossos produtos e serviços
              </ThemedText>
            </View>
          </ThemedView>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => Linking.openURL("https://wa.me/556137704000?text=Ol%C3%A1%2C+vim+pelo+site+da+Kaizen+e+gostaria+de+um+or%C3%A7amento+de+pe%C3%A7as")}
        >
          <ThemedView darkColor="rgba(43, 43, 43, 0.53)" style={{ alignItems: "center", flexDirection: "row", borderRadius: 15, padding: 15, marginTop: 10 }}>
            <IconSymbol
              size={35}
              color="rgba(201, 201, 201, 0.54)"
              name="paperplane.fill"
              style={{ marginRight: 15 }}
            />
            <View style={{ flexShrink: 1 }}>
              <ThemedText style={{ fontWeight: "bold", fontSize: 20, marginBottom: 4 }}>Contato</ThemedText>
              <ThemedText darkColor="rgba(201, 201, 201, 0.54)" style={{ fontWeight: "400", fontSize: 15, marginBottom: 10 }}>
                Entre em contato conosco para suporte ou dúvidas
              </ThemedText>
            </View>
          </ThemedView>
        </TouchableOpacity>

      </ThemedView>
    </ParallaxScrollView>
  );
}
