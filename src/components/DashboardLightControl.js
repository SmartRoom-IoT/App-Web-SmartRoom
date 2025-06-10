import React, { useState } from 'react';

const DashboardLightControl = () => {
  const [intensity, setIntensity] = useState(50);
  const [color, setColor] = useState('#ffffff');

  const handleIntensityChange = (e) => {
    setIntensity(e.target.value);
    // Aquí iría la lógica para enviar el comando de intensidad por MQTT/WebSocket
    console.log('Cambiando intensidad a:', e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
    // Aquí iría la lógica para enviar el comando de color por MQTT/WebSocket
    console.log('Cambiando color a:', e.target.value);
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-200">
      <h3 className="text-3xl font-bold text-gray-800 mb-8">Control de Luz</h3>
      <div className="flex flex-col gap-8">
        <div>
          <label className="block text-gray-700 font-semibold mb-3 text-lg">Intensidad:</label>
          <input
            type="range"
            min="0"
            max="100"
            value={intensity}
            onChange={handleIntensityChange}
            className="w-full h-3 bg-gradient-to-r from-gray-300 to-yellow-400 rounded-lg appearance-none cursor-pointer transition duration-200 ease-in-out"
            style={{ '--thumb-color': '#facc15' }} // Custom property for thumb color (requires extra CSS or JS for full cross-browser support)
          />
          <p className="text-center mt-3 text-gray-600 text-xl font-medium">{intensity}%</p>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-3 text-lg">Color:</label>
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="w-full h-12 rounded-lg cursor-pointer border border-gray-300 overflow-hidden"
          />
          <p className="text-center mt-3 text-gray-600 text-xl font-medium">{color}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardLightControl;