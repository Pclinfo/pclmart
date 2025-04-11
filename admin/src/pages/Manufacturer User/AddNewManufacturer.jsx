import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import ManufacturerRegistrationForm from '../../components/ManufacturerRegistrationForm';

const AddNewManufacturer = () => {
  const [activeContent, setActiveContent] = useState(' ');

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          < ManufacturerRegistrationForm />
          
        </div>
      </div>
    </div>
  );
};

export default AddNewManufacturer;