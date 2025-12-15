import { create } from 'zustand';
import * as Keychain from 'react-native-keychain';

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  signIn: (token: string, user: User) => Promise<void>;
  signOut: () => Promise<void>;
  restoreToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isLoading: true,
  signIn: async (token, user) => {
    await Keychain.setGenericPassword('auth_token', token);
    set({ token, user, isLoading: false });
  },
  signOut: async () => {
    await Keychain.resetGenericPassword();
    set({ token: null, user: null, isLoading: false });
  },
  restoreToken: async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        // Here you would typically validate the token or fetch the user profile
        // For now, we just restore the token. In a real app, we'd fetch user data.
        set({ token: credentials.password, isLoading: false });
      } else {
        set({ token: null, isLoading: false });
      }
    } catch (e) {
      set({ token: null, isLoading: false });
    }
  },
}));
