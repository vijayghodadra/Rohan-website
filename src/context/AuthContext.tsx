'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  role?: 'customer' | 'wholesale' | 'admin';
  businessName?: string;
  isWholesale?: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  login: (email: string, password?: string, name?: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: UserProfile, password?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isSupabaseLive: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isSupabaseLive, setIsSupabaseLive] = useState(false);

  // Initialize Supabase Auth Listener & fallback session
  useEffect(() => {
    const isConfigured = isSupabaseConfigured();
    setIsSupabaseLive(isConfigured);

    if (isConfigured) {
      const supabase = createClient();
      if (supabase) {
        // Fetch current active session
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session?.user) {
            setUser({
              id: session.user.id,
              name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Valued Customer',
              email: session.user.email || '',
              phone: session.user.user_metadata?.phone,
              role: session.user.user_metadata?.role || 'customer',
            });
          }
        });

        // Listen for auth changes (sign in, sign out, token refresh)
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          if (session?.user) {
            setUser({
              id: session.user.id,
              name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Valued Customer',
              email: session.user.email || '',
              phone: session.user.user_metadata?.phone,
              role: session.user.user_metadata?.role || 'customer',
            });
          } else {
            setUser(null);
          }
        });

        return () => subscription.unsubscribe();
      }
    }

    // Fallback: Read saved local user if Supabase is not yet configured
    try {
      const savedUser = localStorage.getItem('roshan_auth_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (_) {}
  }, []);

  const login = async (email: string, password?: string, name?: string) => {
    const supabase = createClient();

    if (supabase && password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          return { success: false, error: error.message };
        }

        if (data.user) {
          setUser({
            id: data.user.id,
            name: data.user.user_metadata?.name || name || email.split('@')[0],
            email: data.user.email || email,
            phone: data.user.user_metadata?.phone,
            role: data.user.user_metadata?.role || 'customer',
          });
        }
        setIsAuthOpen(false);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message || 'Login failed' };
      }
    }

    // Offline / Local Mock Fallback
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

  const register = async (data: UserProfile, password?: string) => {
    const supabase = createClient();

    if (supabase && password) {
      try {
        const { data: authData, error } = await supabase.auth.signUp({
          email: data.email,
          password,
          options: {
            data: {
              name: data.name,
              phone: data.phone,
              role: data.role || 'customer',
            },
          },
        });

        if (error) {
          return { success: false, error: error.message };
        }

        if (authData.user) {
          setUser({
            id: authData.user.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            role: data.role || 'customer',
          });
        }
        setIsAuthOpen(false);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message || 'Registration failed' };
      }
    }

    // Offline / Local Mock Fallback
    setUser(data);
    try {
      localStorage.setItem('roshan_auth_user', JSON.stringify(data));
    } catch (_) {}
    setIsAuthOpen(false);
    return { success: true };
  };

  const loginWithGoogle = async () => {
    const supabase = createClient();
    if (supabase) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/` : undefined,
        },
      });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    }

    // Fallback demo Google sign-in
    login('customer@example.com', undefined, 'Google Customer');
    setIsAuthOpen(false);
    return { success: true };
  };

  const logout = async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
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
        loginWithGoogle,
        logout,
        isSupabaseLive,
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
