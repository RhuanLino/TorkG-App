import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider, useAuth } from '@/providers/auth-provider';

export const unstable_settings = {
    anchor: '(tabs)',
};

export default function RootLayout() {
    return (
        <AuthProvider>
            <RootNavigator />
        </AuthProvider>
    );
}

function RootNavigator() {
    const colorScheme = useColorScheme();
    const { isLoading, session } = useAuth();

    if (isLoading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#ff4e00" />
            </View>
        );
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Protected guard={!session}>
                    <Stack.Screen name="login" options={{ headerShown: false }} />
                </Stack.Protected>
                <Stack.Protected guard={!!session}>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
                    <Stack.Screen
                        name="(modals)/notifications"
                        options={{
                            title: 'Notificações',
                            presentation: 'modal',
                            animation: 'slide_from_bottom',
                        }}
                    />
                </Stack.Protected>
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
