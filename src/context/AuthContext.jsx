import { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as authApi from "@/api/auth.api";
import * as usersApi from "@/api/users.api";

const AuthContext = createContext(null);

const STORAGE_KEY = "subtrack.user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setIsLoading(false);
      return;
    }
    const cached = JSON.parse(stored);
    // Re-validate against the server: the JWT lives in an httpOnly cookie,
    // so this is the only way to know the session is still valid.
    usersApi
      .getUser(cached._id)
      .then((freshUser) => {
        setUser(freshUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(freshUser));
      })
      .catch(() => {
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const persistUser = (nextUser) => {
    setUser(nextUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
  };

  const login = useCallback(async (credentials) => {
    const result = await authApi.signIn(credentials);
    persistUser(result.user);
    return result.user;
  }, []);

  const register = useCallback(async (payload) => {
    const result = await authApi.signUp(payload);
    persistUser(result.user);
    return result.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.signOut();
    } finally {
      localStorage.removeItem(STORAGE_KEY);
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated: !!user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
