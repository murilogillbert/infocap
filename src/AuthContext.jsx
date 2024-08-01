/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem('token', token); // Armazene o token, se necessário
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token'); // Remova o token, se necessário
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
