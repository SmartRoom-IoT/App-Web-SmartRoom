import React, { useState, useEffect } from 'react';
import { accessStats, sensorStats } from '../mock/stats';

const DashboardStats = () => {
  const [accessData, setAccessData] = useState([]);
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    // En una app real, aquí se obtendrían los datos para las gráficas
    setAccessData(accessStats);
    setSensorData(sensorStats);
  }, []);

  // Simulación de renderizado de gráficas (en una app real usarías una librería)
  const renderAccessChart = () => {
    return (
      <div className="bg-gray-50 p-6 rounded-xl shadow-inner h-64 flex items-center justify-center text-gray-600 text-lg font-medium">
        Gráfica de Ingresos (Simulación)
      </div>
    );
  };

  const renderSensorChart = () => {
    return (
      <div className="bg-gray-50 p-6 rounded-xl shadow-inner h-64 flex items-center justify-center text-gray-600 text-lg font-medium">
        Gráfica de Sensores (Simulación)
      </div>
    );
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-200">
      <h3 className="text-3xl font-bold text-gray-800 mb-8">Estadísticas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Estadísticas de Acceso</h4>
          {renderAccessChart()}
        </div>
        <div>
          <h4 className="text-xl font-semibold text-gray-700 mb-4">Estadísticas de Sensores</h4>
          {renderSensorChart()}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;

// DONE