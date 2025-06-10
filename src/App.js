import React, { useState, useEffect } from 'react';
import AuthLayout from './components/AuthLayout';
import DashboardLayout from './components/DashboardLayout';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Aquí podrías verificar si hay un token de autenticación en localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthSuccess = () => {
    // Simulación de guardar token
    localStorage.setItem('authToken', 'simulated_token');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Simulación de eliminar token
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <DashboardLayout onLogout={handleLogout} />
      ) : (
        <AuthLayout onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  );
};

export default App;

// DONE