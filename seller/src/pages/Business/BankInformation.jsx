import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import config from '../config';

const BankInformation = () => {
  const [activeContent, setActiveContent] = useState('');
  const [bankInfo, setBankInfo] = useState({
    account_holder_name: '',
    bank_name: '',
    branch_ifsc_code: '',
    account_number: '',
    swift_bic: '',
    upi_id: '',
    paypal_email: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem('token');

        const response = await axios.get(`${config.apiUrl}/register-seller`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Check if we got user data successfully
        if (response.data && response.data.user_data) {
          setBankInfo({
            account_holder_name: response.data.user_data.account_holder_name || '',
            bank_name: response.data.user_data.bank_name || '',
            branch_ifsc_code: response.data.user_data.branch_ifsc_code || '',
            account_number: response.data.user_data.account_number || '',
            swift_bic: response.data.user_data.swift_bic || '',
            upi_id: response.data.user_data.upi_id || '',
            paypal_email: response.data.user_data.paypal_email || ''
          });
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load bank information. Please try again later.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar setActiveContent={setActiveContent} />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">My Bank Info</h1>
            </div>

            {loading ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p>Loading bank information...</p>
              </div>
            ) : error ? (
              <div className="bg-white rounded-lg shadow p-6 text-center text-red-500">
                <p>{error}</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-lg font-medium text-gray-700">Account details</h2>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6 relative overflow-hidden">
                    {/* Card icon watermark */}
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-10">
                      <div className="w-32 h-32 bg-blue-200 rounded-lg"></div>
                    </div>

                    {/* Account holder section */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Holder Name:</span>
                        <span className="font-medium">{bankInfo.account_holder_name}</span>
                      </div>
                      <button
                        className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors text-sm"
                        onClick={() => navigate('/edit-bank-info')}
                      >
                        Edit
                      </button>
                    </div>

                    {/* Bank details grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <span className="text-gray-600 w-32">Bank Name</span>
                        <span className="text-gray-600">:</span>
                        <span className="ml-2 font-medium">{bankInfo.bank_name}</span>
                      </div>

                      <div className="flex items-center">
                        <span className="text-gray-600 w-32">Branch/IFSC</span>
                        <span className="text-gray-600">:</span>
                        <span className="ml-2 font-medium">{bankInfo.branch_ifsc_code}</span>
                      </div>

                      <div className="flex items-center">
                        <span className="text-gray-600 w-32">Account Number</span>
                        <span className="text-gray-600">:</span>
                        <span className="ml-2 font-medium">{bankInfo.account_number}</span>
                      </div>

                      <div className="flex items-center">
                        <span className="text-gray-600 w-32">SWIFT/BIC</span>
                        <span className="text-gray-600">:</span>
                        <span className="ml-2 font-medium">{bankInfo.swift_bic}</span>
                      </div>

                      <div className="flex items-center">
                        <span className="text-gray-600 w-32">UPI ID</span>
                        <span className="text-gray-600">:</span>
                        <span className="ml-2 font-medium">{bankInfo.upi_id}</span>
                      </div>

                      <div className="flex items-center">
                        <span className="text-gray-600 w-32">PayPal Email</span>
                        <span className="text-gray-600">:</span>
                        <span className="ml-2 font-medium">{bankInfo.paypal_email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {activeContent}
        </main>
      </div>
    </div>
  );
};

export default BankInformation;