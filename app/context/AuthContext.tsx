"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Spinner from '../components/Animations/Spinner';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
        setIsAuthenticated(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
    setLoading(false);
  }, [router]);

  const login = (username: string, password: string) => {
    axios.post('https://dummyjson.com/auth/login', { username, password })
      .then(response => {
        const { token, ...user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(user);
        setIsAuthenticated(true);
        router.push('/');
      })
      .catch(error => {
        console.error("Login error:", error);
        alert('Invalid credentials');
      });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    router.push('/login');
  };

  if (loading) {
    return <Spinner />; // You can replace this with a better loading spinner
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
