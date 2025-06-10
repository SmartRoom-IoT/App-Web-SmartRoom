import React, { useState } from 'react';
import Login from './AuthLogin';
import Register from './AuthRegister';

const AuthLayout = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          {isLogin ? 'Bienvenido de Nuevo' : 'Únete a SmartRoom'}
        </h2>
        {isLogin ? (
          <Login onAuthSuccess={onAuthSuccess} toggleForm={toggleForm} />
        ) : (
          <Register onAuthSuccess={onAuthSuccess} toggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default AuthLayout;