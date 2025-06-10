import React, { useState, useEffect } from 'react';
import { accessLogs } from '../mock/accessLogs';

const DashboardAccessLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // En una app real, aquí se haría la llamada al backend para obtener los logs
    setLogs(accessLogs);
  }, []);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-200">
      <h3 className="text-3xl font-bold text-gray-800 mb-8">Registro de Acceso</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Persona
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Hora
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.person}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{log.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardAccessLog;