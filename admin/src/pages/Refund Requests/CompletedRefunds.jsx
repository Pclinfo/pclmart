import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const CompletedRefunds = () => {
  const [activeContent, setActiveContent] = useState(' ');

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          
        </div>
      </div>
    </div>
  );
};

export default CompletedRefunds;