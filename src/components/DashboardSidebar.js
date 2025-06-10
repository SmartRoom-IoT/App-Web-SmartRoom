import React from 'react';

const DashboardSidebar = ({ setCurrentPage, onLogout }) => {
  const menuItems = [
    { id: 'accessLog', name: 'Registro de Acceso' },
    { id: 'roomInfo', name: 'Información de Habitación' },
    { id: 'lightControl', name: 'Control de Luz' },
    { id: 'stats', name: 'Estadísticas' },
  ];

  return (
    <div className="w-64 bg-white shadow-xl p-6 flex flex-col justify-between border-r border-gray-200">
      <div>
        <h3 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">SmartRoom</h3>
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={item.id} className="mb-4">
                <button
                  onClick={() => setCurrentPage(item.id)}
                  className="w-full text-left text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 ease-in-out focus:outline-none"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <button
        onClick={onLogout}
        className="w-full text-left text-red-600 hover:text-red-800 font-semibold transition-colors duration-200 ease-in-out focus:outline-none border border-red-600 rounded-md px-4 py-2 hover:bg-red-50"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default DashboardSidebar;

// DONE