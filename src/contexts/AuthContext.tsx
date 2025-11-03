import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { AuthState, login as authLogin, logout as authLogout, getAuthState, refreshSession, User } from '../utils/auth';

interface AuthContextType extends AuthState {
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => getAuthState());
  const [isLoading, setIsLoading] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }

    const refreshInterval = setInterval(() => {
      const currentState = getAuthState();
      if (currentState.isAuthenticated) {
        const refreshed = refreshSession();
        if (!refreshed) {
          handleLogout();
        }
      }
    }, 30 * 60 * 1000);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'soft_projects_auth_token' || e.key === 'soft_projects_user_data') {
        const currentState = getAuthState();
        setAuthState(currentState);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(refreshInterval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogin = useCallback(async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      const result = await authLogin(username, password);

      if (result.success && result.user && result.token) {
        setAuthState({
          isAuthenticated: true,
          user: result.user,
          token: result.token
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    authLogout();
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null
    });

    setTimeout(() => {
      window.location.reload();
    }, 100);
  }, []);

  const value: AuthContextType = {
    ...authState,
    isLoading,
    login: handleLogin,
    logout: handleLogout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
