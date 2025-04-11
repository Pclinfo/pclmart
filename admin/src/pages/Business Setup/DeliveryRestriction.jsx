import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';

const DeliveryRestriction = () => {
  const [countryEnabled, setCountryEnabled] = useState(false);
  const [zipCodeEnabled, setZipCodeEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');

  // Fetch current settings on component mount
  useEffect(() => {
    fetchDeliverySettings();
  }, []);

  const fetchDeliverySettings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.apiUrl}/delivery_restriction_setting`);
      const data = response.data;
      
      setCountryEnabled(data.countryEnabled);
      setZipCodeEnabled(data.zipCodeEnabled);
    } catch (error) {
      console.error('Error fetching delivery settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveDeliverySettings = async () => {
    try {
      setSaveStatus('Saving...');
      
      // Prepare the data to send
      const payload = {
        countryEnabled: countryEnabled,
        zipCodeEnabled: zipCodeEnabled
      };
      
      // Check if settings already exist
      const checkResponse = await axios.get(`${config.apiUrl}/delivery_restriction_setting`);
      
      let response;
      // If we got a response, we know settings exist (empty or not)
      if (checkResponse.status === 200) {
        response = await axios.put(`${config.apiUrl}/delivery_restriction_setting`, payload);
      } else {
        response = await axios.post(`${config.apiUrl}/delivery_restriction_setting`, payload);
      }
      
      setSaveStatus('Settings saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Error saving delivery settings:', error);
      setSaveStatus('Error saving settings. Please try again.');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const toggleCountryEnabled = () => {
    setCountryEnabled(!countryEnabled);
  };

  const toggleZipCodeEnabled = () => {
    setZipCodeEnabled(!zipCodeEnabled);
  };

  if (loading) {
    return (
      <div className="p-4 w-full max-w-7xl mx-auto">
        <p>Loading delivery settings...</p>
      </div>
    );
  }

  return (
    <div className="p-4 w-full max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <img 
          src="/api/placeholder/24/24"
          alt="Delivery icon"
          className="w-6 h-6"
        />
        <h2 className="text-lg font-medium">Delivery</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative flex items-center justify-between p-4 border rounded-lg bg-white">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">
                Delivery available country
              </span>
              <button 
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Show country information"
              >
                <svg 
                  className="w-4 h-4 text-gray-400" 
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <path d="M12 16v-4m0-4h.01" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <label className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                className="hidden"
                checked={countryEnabled}
                onChange={toggleCountryEnabled}
              />
              <span className={`absolute cursor-pointer inset-0 rounded-full transition-colors duration-200 ease-in-out ${
                countryEnabled ? 'bg-blue-600' : 'bg-gray-200'
              }`}>
                <span className={`absolute w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
                  countryEnabled ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </span>
            </label>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative flex items-center justify-between p-4 border rounded-lg bg-white">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">
                Delivery available zip code area
              </span>
              <button 
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Show zip code information"
              >
                <svg 
                  className="w-4 h-4 text-gray-400" 
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <path d="M12 16v-4m0-4h.01" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <label className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                className="hidden"
                checked={zipCodeEnabled}
                onChange={toggleZipCodeEnabled}
              />
              <span className={`absolute cursor-pointer inset-0 rounded-full transition-colors duration-200 ease-in-out ${
                zipCodeEnabled ? 'bg-blue-600' : 'bg-gray-200'
              }`}>
                <span className={`absolute w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
                  zipCodeEnabled ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6 items-center gap-4">
        {saveStatus && (
          <span className={`text-sm ${saveStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {saveStatus}
          </span>
        )}
        <button 
          onClick={saveDeliverySettings}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default DeliveryRestriction;