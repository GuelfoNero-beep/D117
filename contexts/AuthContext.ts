
import { createContext } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  login: (nickname: string, password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: () => false,
  logout: () => {},
});
