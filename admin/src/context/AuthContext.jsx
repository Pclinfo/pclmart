import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => { },
  logout: () => { },
  updateUser: () => { }
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);-
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {

        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    if (!userData || !userData.token || !userData.user) {
      throw new Error("Invalid user data");
    }

    const userToStore = userData.user;
    const token = userData.token;

    localStorage.setItem('user', JSON.stringify(userToStore));
    localStorage.setItem('token', token);

    setUser(userToStore);
    setIsAuthenticated(true);
  };

  const logout = () => {

    localStorage.removeItem('user');
    localStorage.removeItem('token');

    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updatedUserData) => {

    const updatedUser = { ...user, ...updatedUserData };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      logout,
      updateUser,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;