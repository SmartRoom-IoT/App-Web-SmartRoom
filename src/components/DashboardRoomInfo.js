import React, { useState, useEffect } from 'react';
import { roomSensors } from '../mock/roomSensors';

const DashboardRoomInfo = () => {
  const [sensorData, setSensorData] = useState({});

  useEffect(() => {
    // En una app real, aquí se haría la conexión MQTT/WebSocket para recibir datos en tiempo real
    // Simulación de datos recibidos
    setSensorData(roomSensors);
  }, []);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-200">
      <h3 className="text-3xl font-bold text-gray-800 mb-8">Información de Habitación</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
          <h4 className="text-xl font-semibold text-blue-800 mb-3">Temperatura</h4>
          <p className="text-5xl font-extrabold text-blue-900">{sensorData.temperature}°C</p>
        </div>
        <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
          <h4 className="text-xl font-semibold text-green-800 mb-3">Calidad del Aire</h4>
          <p className="text-5xl font-extrabold text-green-900">{sensorData.airQuality} PPM</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardRoomInfo;