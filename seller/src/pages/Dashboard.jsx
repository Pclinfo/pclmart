import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [activeContent, setActiveContent] = useState(' ');

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <h1>Welcome PCL Seller Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;