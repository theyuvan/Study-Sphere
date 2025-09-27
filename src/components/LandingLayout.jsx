import React from 'react';
import { Outlet } from 'react-router-dom';
import LandingNavigation from './LandingNavigation';

const LandingLayout = () => {
  return (
    <div className="min-h-screen">
      <LandingNavigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default LandingLayout;