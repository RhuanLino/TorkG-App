import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, type SupportedStorage } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const vehicleImageBucket = process.env.EXPO_PUBLIC_SUPABASE_VEHICLE_BUCKET ?? 'vehicle-images';

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    'Defina EXPO_PUBLIC_SUPABASE_URL e EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY no arquivo .env do app.'
  );
}

// A renderizacao estatica do Expo Router roda sem `window`.
// No navegador e no dispositivo, a sessao permanece no AsyncStorage.
const serverStorage: SupportedStorage = {
  getItem: async () => null,
  setItem: async () => undefined,
  removeItem: async () => undefined,
};

const storage = typeof window === 'undefined' ? serverStorage : AsyncStorage;

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

/** Converte o valor armazenado em vehicles.photo_path em uma URL exibível. */
export function getVehiclePhotoUrl(photoPath: string | null): string | null {
  if (!photoPath) {
    return null;
  }

  if (/^https?:\/\//i.test(photoPath)) {
    return photoPath;
  }

  return supabase.storage.from(vehicleImageBucket).getPublicUrl(photoPath).data.publicUrl;
}
