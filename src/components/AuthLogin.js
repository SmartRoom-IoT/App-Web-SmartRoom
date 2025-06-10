import React, { useState } from 'react';

const Login = ({ onAuthSuccess, toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Aquí iría la lógica de conexión al backend para autenticar
    console.log('Intentando iniciar sesión con:', email, password);
    // Simulación de autenticación exitosa
    setTimeout(() => {
      onAuthSuccess();
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Correo Electrónico"
        className="w-full px-5 py-3 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out text-gray-800 placeholder-gray-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="w-full px-5 py-3 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out text-gray-800 placeholder-gray-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-200 ease-in-out transform hover:-translate-y-0.5"
      >
        Iniciar Sesión
      </button>
      <p className="text-center mt-4 text-gray-700">
        ¿No tienes cuenta?{' '}
        <button onClick={toggleForm} className="text-blue-700 font-semibold hover:underline focus:outline-none">
          Regístrate aquí
        </button>
      </p>
    </div>
  );
};

export default Login;