import React, { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardAccessLog from './DashboardAccessLog';
import DashboardRoomInfo from './DashboardRoomInfo';
import DashboardLightControl from './DashboardLightControl';
import DashboardStats from './DashboardStats';

const DashboardLayout = ({ onLogout }) => {
  const [currentPage, setCurrentPage] = useState('accessLog');

  const renderPage = () => {
    switch (currentPage) {
      case 'accessLog':
        return <DashboardAccessLog />;
      case 'roomInfo':
        return <DashboardRoomInfo />;
      case 'lightControl':
        return <DashboardLightControl />;
      case 'stats':
        return <DashboardStats />;
      default:
        return <DashboardAccessLog />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar setCurrentPage={setCurrentPage} onLogout={onLogout} />
      <div className="flex-1 p-8 overflow-y-auto">
        {renderPage()}
      </div>
    </div>
  );
};

export default DashboardLayout;