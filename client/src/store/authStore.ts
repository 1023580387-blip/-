import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  login as loginApi,
  register as registerApi,
  getMe as getMeApi,
  updateMe as updateMeApi,
  type LoginData,
  type RegisterData,
  type UpdateMeData,
  type User,
} from '../api/modules/authApi';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  fetchMe: () => Promise<void>;
  updateMe: (data: UpdateMeData) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (data: LoginData) => {
        set({ isLoading: true });
        try {
          const response = await loginApi(data);
          const { token, user } = response.data;
          set({
            token,
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true });
        try {
          const response = await registerApi(data);
          const { token, user } = response.data;
          set({
            token,
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      fetchMe: async () => {
        set({ isLoading: true });
        try {
          const response = await getMeApi();
          set({
            user: response.data,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      updateMe: async (data: UpdateMeData) => {
        set({ isLoading: true });
        try {
          const response = await updateMeApi(data);
          set({
            user: response.data,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
