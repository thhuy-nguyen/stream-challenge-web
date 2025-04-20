'use client';

// API client for authentication-related requests
import axios from 'axios';
import { getCookie } from 'cookies-next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include the auth token in requests
authApi.interceptors.request.use(
  (config) => {
    const token = getCookie('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const AuthService = {
  // Register a new user
  register: async (email: string, password: string, displayName: string) => {
    const response = await authApi.post('/api/auth/register', {
      email,
      password,
      displayName,
    });
    return response.data;
  },

  // Login with email and password
  login: async (email: string, password: string) => {
    const response = await authApi.post('/api/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  // Get current user information
  getCurrentUser: async () => {
    const response = await authApi.get('/api/user/me');
    return response.data;
  },

  // Get OAuth URL for social login
  getOAuthUrl: async (provider: 'google' | 'twitch', redirectTo: string) => {
    try {
      // Try the oauth endpoint first
      const response = await authApi.get(`/api/auth/oauth/${provider}?redirectTo=${redirectTo}`);
      return response.data;
    } catch (error) {
      // If that fails, try the oauth2 endpoint
      console.log('Falling back to oauth2 endpoint');
      const fallbackResponse = await authApi.get(`/api/auth/oauth2/url/${provider}`);
      return fallbackResponse.data;
    }
  },
};