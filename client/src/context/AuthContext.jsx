import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const login = (data) => { setToken(data.token); setUser(data.user); localStorage.setItem('token', data.token); localStorage.setItem('user', JSON.stringify(data.user)); };
  const logout = () => { setToken(null); setUser(null); localStorage.clear(); };
  const value = useMemo(() => ({ token, user, login, logout, isAuthenticated: !!token }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
