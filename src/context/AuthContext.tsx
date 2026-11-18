'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  isWholesale?: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  login: (email: string, name?: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: UserProfile) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Load user session from localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('roshan_auth_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (_) {}
  }, []);

  const login = async (email: string, name?: string) => {
    const profile: UserProfile = {
      name: name || email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim() || 'Valued Customer',
      email,
    };
    setUser(profile);
    try {
      localStorage.setItem('roshan_auth_user', JSON.stringify(profile));
    } catch (_) {}
    setIsAuthOpen(false);
    return { success: true };
  };

  const register = async (data: UserProfile) => {
    setUser(data);
    try {
      localStorage.setItem('roshan_auth_user', JSON.stringify(data));
    } catch (_) {}
    setIsAuthOpen(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('roshan_auth_user');
    } catch (_) {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthOpen,
        setIsAuthOpen,
        authMode,
        setAuthMode,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

