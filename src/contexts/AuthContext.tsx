import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';
import { mockAdminUser } from '@/data/mock';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, _password: string) => {
    if (email === 'admin@modastore.com') {
      setUser(mockAdminUser);
      localStorage.setItem('auth_user', JSON.stringify(mockAdminUser));
      return true;
    }
    // Customer login
    const customer: User = { id: 'cust-login', name: email.split('@')[0], email, role: 'customer', createdAt: new Date().toISOString() };
    setUser(customer);
    localStorage.setItem('auth_user', JSON.stringify(customer));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const isAdmin = user?.role === 'admin' || user?.role === 'manager';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
