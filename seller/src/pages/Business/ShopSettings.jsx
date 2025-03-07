import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import config from '../config';

const ShopSettings = () => {
  const [activeContent, setActiveContent] = useState(' ');
  const [isTemporaryClosed, setIsTemporaryClosed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch the initial temporary close status when component mounts
  useEffect(() => {
    fetchTemporaryCloseStatus();
  }, []);

  const fetchTemporaryCloseStatus = async () => {
    try {
      setIsLoading(true);

      // Get auth token from localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Not authenticated. Please login again.');
        // Optionally redirect to login
        // navigate('/login');
        return;
      }

      const response = await axios.get(`${config.apiUrl}/get_tem_close_status`, {
        headers: {
          'Authorization': `Bearer ${token}` // Use Authorization header with Bearer token
        }
      });

      setIsTemporaryClosed(response.data.tem_close);
      setError(null);
    } catch (err) {
      console.error('Error fetching shop status:', err);
      if (err.response && err.response.status === 401) {
        setError('Authentication failed. Please login again.');
        // Optionally redirect to login page
        // navigate('/login');
      } else {
        setError('Failed to load shop status');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemporaryCloseToggle = async () => {
    const newStatus = !isTemporaryClosed;

    try {
      setIsLoading(true);

      // Get auth token from localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Not authenticated. Please login again.');
        return;
      }

      const response = await axios.post(`${config.apiUrl}/update_tem_close`, {
        status: newStatus
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setIsTemporaryClosed(newStatus);
        setError(null);
      }
    } catch (err) {
      console.error('Error updating temporary close status:', err);
      if (err.response && err.response.status === 401) {
        setError('Authentication failed. Please login again.');
      } else {
        setError('Failed to update shop status');
      }
      // Revert the UI state if the API call fails
      setIsTemporaryClosed(isTemporaryClosed);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="max-w-7xl mx-auto p-2">
            {/* Shop Info Header */}
            <div className="mb-8">
              <h1 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🏪</span>
                Shop Info
              </h1>
              <div className="border-b border-gray-200">
                <button className="text-blue-600 border-b-2 border-blue-600 px-4 py-2">
                  General
                </button>
              </div>
            </div>

            {/* Temporary Close Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
              <div className="flex items-center justify-between">
                <span className="font-medium">Temporary close</span>
                <label className={`relative inline-flex items-center cursor-pointer ${isLoading ? 'opacity-50' : ''}`}>
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isTemporaryClosed}
                    onChange={handleTemporaryCloseToggle}
                    disabled={isLoading}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                *By turning on temporary close mode your shop will be shown as temporary off in the website and app for the customers. they cannot purchase or place order from your shop
              </p>
              {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
            </div>

            {/* My Shop Info Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium">My Shop Info</h2>
                <div className="flex gap-3">
                  <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
                    Go To Vacation Mode
                  </button>
                  <button
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    onClick={() => navigate('/update-shop-settings')}
                  >
                    Edit
                  </button>
                </div>
              </div>

              {/* Shop Details */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex-shrink-0">
                  <img
                    src="/api/placeholder/96/96"
                    alt=""
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="space-y-2">
                    <p className="font-medium"></p>
                    <p className="text-gray-600"></p>
                    <p className="text-gray-600"></p>
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

export default ShopSettings;