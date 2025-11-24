// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  // Navegação / Essencial
  'house.fill': 'home',
  'house': 'home-outlined',
  'magnifyingglass': 'search',
  'bell.fill': 'notifications',
  'bell': 'notifications-none',
  'gearshape.fill': 'settings',
  'gearshape': 'settings-outlined',

  // Usuário
  'person.fill': 'person',
  'person': 'person-outline',
  'person.2.fill': 'group',
  'person.crop.circle.fill': 'account-circle',

  // Ações Comuns
  'plus.circle.fill': 'add-circle',
  'plus': 'add',
  'trash.fill': 'delete',
  'trash': 'delete-outline',
  'pencil': 'edit',
  'pencil.circle.fill': 'edit',
  'checkmark.circle.fill': 'check-circle',
  'xmark.circle.fill': 'cancel',
  'square.and.arrow.up.fill': 'share',

  // Listas / Organização
  'line.3.horizontal': 'menu',
  'list.bullet': 'list',
  'slider.horizontal.3': 'tune',
  'arrow.up.arrow.down': 'swap-vert',
  'chevron.left': 'chevron-left',
  'chevron.right': 'chevron-right',
  'chevron.up': 'expand-less',
  'chevron.down': 'expand-more',

  // Loja / Vendas
  'cart.fill': 'shopping-cart',
  'bag.fill': 'shopping-bag',
  'creditcard.fill': 'credit-card',
  'tag.fill': 'local-offer',
  'gift.fill': 'card-giftcard',
  'barcode.viewfinder': 'qr-code-scanner',

  // Negócios / Dashboard
  'chart.bar.fill': 'bar-chart',
  'chart.line.uptrend.xyaxis': 'show-chart',
  'chart.pie.fill': 'pie-chart',
  'banknote.fill': 'payments',
  'wallet.pass.fill': 'account-balance-wallet',

  // Tempo / Datas
  'calendar': 'calendar-month',
  'clock.fill': 'access-time',
  'timer': 'timer',
  'hourglass': 'hourglass-empty',

  // Localização
  'mappin.and.ellipse': 'location-on',
  'map.fill': 'map',
  'globe': 'public',

  // Comunicação
  'envelope.fill': 'mail',
  'phone.fill': 'phone',
  'paperplane.fill': 'send',

  // Arquivos / Mídia
  'photo.fill': 'photo',
  'video.fill': 'videocam',
  'doc.fill': 'insert-drive-file',
  'folder.fill': 'folder',
  'camera.fill': 'photo-camera',
  'mic.fill': 'mic',
  'speaker.wave.3.fill': 'volume-up',

  // Segurança
  'lock.fill': 'lock',
  'lock.open.fill': 'lock-open',
  'shield.fill': 'security',

  // Sistema
  'wifi': 'wifi',
  'wifi.exclamationmark': 'wifi-off',
  'battery.100': 'battery-full',
  'battery.25': 'battery-1-bar',
};


/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name] as ComponentProps<typeof MaterialIcons>['name']} style={style} />;
}
