import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('herjourney_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [currentMember, setCurrentMember] = useState(() => {
    const saved = localStorage.getItem('herjourney_member');
    return saved ? JSON.parse(saved) : null;
  });

  const [currentPartner, setCurrentPartner] = useState(() => {
    const saved = localStorage.getItem('herjourney_partner');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Initialize with Priya by default if no user stored
  useEffect(() => {
    if (!currentUser) {
      loginAs('MEMBER', 'priya');
    }
  }, []);

  const loginWithCredentials = async (email, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const data = await api.login(email, password);
      setCurrentUser(data.user);
      setCurrentMember(data.member);
      setCurrentPartner(data.partner);

      localStorage.setItem('herjourney_user', JSON.stringify(data.user));
      if (data.member) localStorage.setItem('herjourney_member', JSON.stringify(data.member));
      if (data.partner) localStorage.setItem('herjourney_partner', JSON.stringify(data.partner));
      if (data.token) localStorage.setItem('herjourney_token', data.token);

      return data;
    } catch (err) {
      console.error('Credential login error:', err);
      setAuthError(err.message || 'Invalid credentials');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginAs = async (role, memberKey = 'priya', email = null) => {
    setLoading(true);
    setAuthError(null);
    try {
      const data = await api.demoLogin(email, role, memberKey);
      setCurrentUser(data.user);
      setCurrentMember(data.member);
      setCurrentPartner(data.partner);

      localStorage.setItem('herjourney_user', JSON.stringify(data.user));
      if (data.member) localStorage.setItem('herjourney_member', JSON.stringify(data.member));
      if (data.partner) localStorage.setItem('herjourney_partner', JSON.stringify(data.partner));
      if (data.token) localStorage.setItem('herjourney_token', data.token);

      return data;
    } catch (err) {
      console.error('Demo login error:', err);
      setAuthError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchMember = async (memberKey) => {
    return loginAs('MEMBER', memberKey);
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentMember(null);
    setCurrentPartner(null);
    localStorage.removeItem('herjourney_user');
    localStorage.removeItem('herjourney_member');
    localStorage.removeItem('herjourney_partner');
    localStorage.removeItem('herjourney_token');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentMember,
        currentPartner,
        role: currentUser?.role || 'MEMBER',
        loading,
        authError,
        loginWithCredentials,
        loginAs,
        switchMember,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
