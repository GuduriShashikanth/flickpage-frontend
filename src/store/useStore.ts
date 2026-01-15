import { create } from 'zustand';
import { authService } from '../services/auth.service';
import type { User } from '../types';

interface StoreState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useStore = create<StoreState>((set) => ({
  user: authService.getUser(),
  isAuthenticated: authService.isAuthenticated(),
  
  setUser: (user: User) => set({ user, isAuthenticated: true }),
  
  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false });
  },
}));
