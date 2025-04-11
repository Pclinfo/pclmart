import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import config from '../../config';

const BusinessSetup = () => {
  const [isTemporaryClosed, setIsTemporaryClosed] = useState(false);
  const [minOrderAmount, setMinOrderAmount] = useState('500');
  const [freeDeliveryAmount, setFreeDeliveryAmount] = useState('1000');
  const [activeContent, setActiveContent] = useState(' ');
  const [loading, setLoading] = useState(true);
  const [bannerImage, setBannerImage] = useState('');

  // Fetch business setup data on component mount
  useEffect(() => {
    fetchBusinessSetup();
  }, []);

  const fetchBusinessSetup = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.apiUrl}/inhouse-settings-setup`);
      const data = response.data;
      
      setIsTemporaryClosed(data.isTemporaryClosed);
      setMinOrderAmount(data.minOrderAmount.toString());
      setBannerImage(data.bannerImage || '');
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching business setup:', error);
      setLoading(false);
    }
  };

  const handleToggleChange = async () => {
    try {
      // Update UI optimistically
      const newValue = !isTemporaryClosed;
      setIsTemporaryClosed(newValue);
      
      // Send update to server
      await axios.put(`${config.apiUrl}/inhouse-settings-setup`, {
        isTemporaryClosed: newValue,
        minOrderAmount: minOrderAmount,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
    } catch (error) {
      // Revert UI change if request fails
      setIsTemporaryClosed(!newValue);
      console.error('Error updating temporary close status:', error);
    }
  };

  const handleSaveSettings = async () => {
    try {
      await axios.put(`${config.apiUrl}/inhouse-settings-setup`, {
        isTemporaryClosed: isTemporaryClosed,
        minOrderAmount: minOrderAmount,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  const handleBannerUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('bannerImage', file);
    formData.append('isTemporaryClosed', isTemporaryClosed);
    formData.append('minOrderAmount', minOrderAmount);

    try {
      const response = await axios.put(`${config.apiUrl}/inhouse-settings-setup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update banner image in the UI
      if (response.data && response.data.bannerImage) {
        setBannerImage(response.data.bannerImage);
      } else {
        // If no banner image is returned in the response, refetch the data
        await fetchBusinessSetup();
      }
      
      alert('Banner uploaded successfully!');
    } catch (error) {
      console.error('Error uploading banner:', error);
      alert('Failed to upload banner. Please try again.');
    }
  };

  const handleVisitWebsite = () => {
    window.open('https://pclmart.pclinfotech.com', '_blank');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto p-4">
              {/* Header with icon */}
              <div className="flex items-center mb-4">
                <div className="bg-gray-700 p-2 rounded-md mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h1 className="text-xl font-semibold text-gray-800">Business Setup</h1>

                <div className="ml-auto">
                  <button className="text-blue-600 hover:text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Main content */}
              <div className="bg-white rounded-lg shadow-sm mb-6">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-medium">Temporary close</span>
                    <div className="relative inline-block w-12 align-middle select-none">
                      <input
                        type="checkbox"
                        id="toggle"
                        className="opacity-0 absolute h-0 w-0"
                        checked={isTemporaryClosed}
                        onChange={handleToggleChange}
                      />
                      <label
                        htmlFor="toggle"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer ${isTemporaryClosed ? 'bg-blue-600' : 'bg-gray-300'}`}
                      >
                        <span
                          className={`block h-5 w-5 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${isTemporaryClosed ? 'translate-x-6' : 'translate-x-0'} mt-0.5 ml-0.5`}
                        ></span>
                      </label>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    By turning on the "Temporary Close" Button admin can pause his shop activities and his shop will be shown as "Temporary Close" in the system. Customers will not be able to order or purchase from his shop
                  </p>
                </div>
              </div>

              {/* Shop Details Section */}
              <div className="bg-white rounded-lg shadow-sm mb-6">
                <div className="p-4">
                  <h2 className="text-lg font-medium text-gray-800">Shop Details</h2>
                  <p className="text-sm text-gray-600">Created at 13 Jun, 2023</p>

                  <div className="flex flex-col md:flex-row justify-between mt-4">
                    <div></div>
                    <div className="flex flex-col sm:flex-row gap-2 mt-2 md:mt-0">
                      <button className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
                        Go to Vacation Mode
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Edit shop
                      </button>
                    </div>
                  </div>
                </div>

                {/* Shop Banner */}
                <div className="relative h-40 bg-gray-700 overflow-hidden">
                  {/* Display uploaded banner image if available */}
                  {bannerImage && (
                    <img 
                      src={bannerImage.startsWith('http') ? bannerImage : `${config.apiUrl}${bannerImage}`} 
                      alt="Shop Banner"
                      className="w-full h-full object-cover"
                    />
                  )}
                  
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <div className="bg-blue-600 w-16 h-16 flex items-center justify-center rounded-md mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-2xl">PCL MART</h3>
                    <button 
                      className="mt-2 px-3 py-1 bg-white text-blue-600 rounded-md text-sm flex items-center"
                      onClick={handleVisitWebsite}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Visit website
                    </button>
                  </div>
                  <div className="absolute right-0 bottom-10 p-4 text-white">
                  </div>
                  
                  {/* Banner upload button */}
                  <div className="absolute top-2 right-2">
                    <label className="px-3 py-1 bg-white text-blue-600 rounded-md text-sm flex items-center cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                      </svg>
                      Update Banner
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleBannerUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Shop Settings */}
              <div className="bg-white rounded-lg shadow-sm mb-6">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    <h2 className="text-lg font-medium text-gray-800">Shop Settings</h2>
                  </div>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-sm font-medium text-gray-800">Minimum Order Amount $</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={minOrderAmount}
                        onChange={(e) => setMinOrderAmount(e.target.value)}
                      />
                    </div>

                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-sm font-medium text-gray-800">Free Delivery Over Amount ($)</span>
                      </div>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={freeDeliveryAmount}
                        onChange={(e) => setFreeDeliveryAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button 
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      onClick={handleSaveSettings}
                    >
                      Save information
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSetup;