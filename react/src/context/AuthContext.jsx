import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// AuthProvider component to wrap around App
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load from localStorage on first load
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Login function — stores user in state and localStorage
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token); // Optional: store token if needed
    setUser(userData);
  };

  // Logout function — clears localStorage and state
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  // Optional: auto-sync if user manually changes localStorage in devtools
  useEffect(() => {
    const syncUser = () => {
      const savedUser = localStorage.getItem('user');
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);
