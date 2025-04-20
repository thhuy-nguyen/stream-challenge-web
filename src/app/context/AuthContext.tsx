'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { AuthService } from '../services/authService';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

// Type definitions
type User = {
  id?: string;
  email: string;
  displayName?: string;
  profileImageUrl?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => void;
  socialLogin: (provider: 'google' | 'twitch') => Promise<void>;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  socialLogin: async () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component that wraps the app and makes auth object available
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get token from cookie instead of localStorage
        const token = getCookie('token');
        
        if (token) {
          // If we have a token, fetch user data
          const userData = await AuthService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Authentication initialization error:', error);
        // Clear any invalid tokens
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login handler
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await AuthService.login(email, password);
      
      // Store tokens in cookies instead of localStorage
      setCookie('token', data.token, { maxAge: 60 * 60 * 24 }); // 1 day
      setCookie('refreshToken', data.refreshToken, { maxAge: 60 * 60 * 24 * 7 }); // 7 days
      
      // Set user data
      setUser({
        email: data.userEmail,
        displayName: data.displayName,
        profileImageUrl: data.profileImageUrl,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Register handler
  const register = async (email: string, password: string, displayName: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await AuthService.register(email, password, displayName);
      
      // Store tokens in cookies instead of localStorage
      setCookie('token', data.token, { maxAge: 60 * 60 * 24 }); // 1 day
      setCookie('refreshToken', data.refreshToken, { maxAge: 60 * 60 * 24 * 7 }); // 7 days
      
      // Set user data
      setUser({
        email: data.userEmail,
        displayName: data.displayName,
        profileImageUrl: data.profileImageUrl,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Social login handler
  const socialLogin = async (provider: 'google' | 'twitch') => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get the OAuth URL from the backend
      const redirectUrl = window.location.origin + '/auth/callback';
      const authUrl = await AuthService.getOAuthUrl(provider, redirectUrl);
      
      // Redirect to the authentication provider
      window.location.href = authUrl;
    } catch (err: any) {
      setError(err.response?.data?.message || `${provider} login failed. Please try again.`);
      setIsLoading(false);
      throw err;
    }
  };

  // Logout handler
  const logout = () => {
    // Clear cookies instead of localStorage
    deleteCookie('token');
    deleteCookie('refreshToken');
    setUser(null);
  };

  // Context value
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    socialLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}