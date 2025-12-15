import { useColorScheme } from 'react-native';
import { useThemeStore, theme } from '../store/themeStore';

export const useAppTheme = () => {
  const systemScheme = useColorScheme();
  const getEffectiveTheme = useThemeStore((state) => state.getEffectiveTheme);
  const mode = getEffectiveTheme(systemScheme);

  return theme[mode];
};
