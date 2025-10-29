import { useState, useEffect, useCallback, useRef } from 'react';
import { AuthState, login as authLogin, logout as authLogout, getAuthState, refreshSession } from '../utils/auth';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(() => getAuthState());
  const [isLoading, setIsLoading] = useState(false);
  const isInitialMount = useRef(true);

  // Check auth state on mount and set up session refresh
  useEffect(() => {
    const checkAuthState = () => {
      const currentState = getAuthState();
      setAuthState(currentState);
    };

    // Only check on storage changes, not on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }

    // Set up periodic session refresh (every 30 minutes)
    const refreshInterval = setInterval(() => {
      const currentState = getAuthState();
      if (currentState.isAuthenticated) {
        const refreshed = refreshSession();
        if (!refreshed) {
          // Session expired, force logout
          handleLogout();
        }
      }
    }, 30 * 60 * 1000); // 30 minutes

    // Listen for storage changes (logout from another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'soft_projects_auth_token' || e.key === 'soft_projects_user_data') {
        checkAuthState();
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
    
    // Force page reload to ensure clean state
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }, []);

  return {
    ...authState,
    isLoading,
    login: handleLogin,
    logout: handleLogout
  };
};