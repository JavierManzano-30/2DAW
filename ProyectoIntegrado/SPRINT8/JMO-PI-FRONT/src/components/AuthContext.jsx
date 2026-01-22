import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'pi-auth';

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.localStorage.getItem(STORAGE_KEY) === 'true';
  });
  const [profile, setProfile] = useState({
    name: 'Javier',
    bio: 'Contadora de historias visuales',
    city: 'Sevilla',
    category: 'Urbano',
    avatar: '/assets/photos/foto-perfil.jpg',
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(isAuthenticated));
  }, [isAuthenticated]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      user: isAuthenticated ? { name: profile.name, role: 'user' } : null,
      profile,
      setProfile,
      login: () => setIsAuthenticated(true),
      logout: () => setIsAuthenticated(false),
    }),
    [isAuthenticated, profile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
