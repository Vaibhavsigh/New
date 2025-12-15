import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const STORAGE_KEYS = {
  THEME: 'app.theme',
  USER_TOKEN: 'user.token',
};
