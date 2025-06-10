import React, { useState } from 'react';

const Register = ({ onAuthSuccess, toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    // Aquí iría la lógica de conexión al backend para registrar
    console.log('Intentando registrar con:', email, password);
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    // Simulación de registro exitoso
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
      <input
        type="password"
        placeholder="Confirmar Contraseña"
        className="w-full px-5 py-3 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out text-gray-800 placeholder-gray-500"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        onClick={handleRegister}
        className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-200 ease-in-out transform hover:-translate-y-0.5"
      >
        Registrarse
      </button>
      <p className="text-center mt-4 text-gray-700">
        ¿Ya tienes cuenta?{' '}
        <button onClick={toggleForm} className="text-blue-700 font-semibold hover:underline focus:outline-none">
          Inicia sesión aquí
        </button>
      </p>
    </div>
  );
};

export default Register;