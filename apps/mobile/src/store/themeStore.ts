import { create } from 'zustand';
import { storage, STORAGE_KEYS } from '../utils/storage';
import { useColorScheme } from 'react-native';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  getEffectiveTheme: (systemColorScheme: 'light' | 'dark' | null | undefined) => 'light' | 'dark';
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: (storage.getString(STORAGE_KEYS.THEME) as ThemeMode) || 'system',
  setMode: (mode) => {
    storage.set(STORAGE_KEYS.THEME, mode);
    set({ mode });
  },
  getEffectiveTheme: (systemColorScheme) => {
    const { mode } = get();
    if (mode === 'system') {
      return systemColorScheme || 'light';
    }
    return mode;
  },
}));

export const theme = {
  light: {
    colors: {
      primary: '#007AFF',
      background: '#FFFFFF',
      card: '#F2F2F2',
      text: '#000000',
      border: '#C7C7CC',
      notification: '#FF3B30',
      error: '#FF3B30',
      success: '#34C759',
    },
    spacing: {
      xs: 4,
      s: 8,
      m: 16,
      l: 24,
      xl: 32,
    },
  },
  dark: {
    colors: {
      primary: '#0A84FF',
      background: '#000000',
      card: '#1C1C1E',
      text: '#FFFFFF',
      border: '#38383A',
      notification: '#FF453A',
      error: '#FF453A',
      success: '#30D158',
    },
    spacing: {
      xs: 4,
      s: 8,
      m: 16,
      l: 24,
      xl: 32,
    },
  },
};
