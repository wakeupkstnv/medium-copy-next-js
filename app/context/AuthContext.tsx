"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Retrieved token:", token); // Логирование токена
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('https://dummyjson.com/auth/users')
        .then(response => {
          setUser(response.data);
          setIsAuthenticated(true);
        })
        .catch(error => {
          console.error("Error during token validation:", error); // Логирование ошибки
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          router.push('/login');
        });
    } else {
      router.push('/login');
    }
  }, [router]);

  const login = (username: string, password: string) => {
    axios.post('https://dummyjson.com/auth/login', { username, password })
      .then(response => {
        const token = response.data.token;
        localStorage.setItem('token', token);
        console.log("Stored token:", token); // Логирование сохраненного токена
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(response.data.user);
        setIsAuthenticated(true);
        router.push('/'); // Перенаправление на главную страницу после успешного логина
      })
      .catch(error => {
        console.error("Login error:", error); // Логирование ошибки при логине
        alert('Invalid credentials');
      });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    router.push('/login');
  };

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
