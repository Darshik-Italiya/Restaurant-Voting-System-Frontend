import React, { createContext, useContext, useMemo, useState } from 'react';
import api from '../lib/api';
import { setToken, clearToken, setUser, clearUser, getUser, getToken } from '../lib/auth';

/**
 * AuthContext provides:
 *  - user: object or null
 *  - token: string
 *  - login({email,password}) -> calls /auth/login, stores token
 *  - register({name,email,password}) -> calls /auth/register then auto-login
 *  - logout()
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUserState] = useState(getUser());
    const [token, setTokenState] = useState(getToken());
    const [loading, setLoading] = useState(false);
    const value = useMemo(() => ({ user, token, loading }), [user, token, loading]);

    async function login(credentials) {
        setLoading(true);
        try {
            // Expected response shape: { access_token: "...", token_type: "bearer", user: {...} }
            const { data } = await api.post('/auth/login', credentials);
            const tok = data?.access_token || data?.token || data?.accessToken;
            if (!tok) throw new Error('Token not found in response');
            setToken(tok);
            setTokenState(tok);
            setUser(data?.user || { email: credentials.email });
            setUserState(data?.user || { email: credentials.email });
            return true;
        } finally {
            setLoading(false);
        }
    }

    async function register(payload) {
        setLoading(true);
        try {
            await api.post('/auth/register', payload);
            // Optional: auto-login after register
            if (payload.email && payload.password) {
                await login({ email: payload.email, password: payload.password });
            }
            return true;
        } finally {
            setLoading(false);
        }
    }

    function logout() {
        clearToken(); clearUser();
        setTokenState(''); setUserState(null);
    }

    return (
        <AuthContext.Provider value={{ ...value, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
    return ctx;
}
