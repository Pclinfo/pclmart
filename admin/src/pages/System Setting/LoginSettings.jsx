import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import config from '../../config';
import axios from 'axios';

const LoginSettings = () => {
  const [activeTab, setActiveTab] = useState('customer');
  const [activeContent, setActiveContent] = useState(' ');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    manual_login: true,
    otp_login: false,
    email_verification: false,
    phone_verification: false,
    max_otp_attempts: 5,
    otp_resend_time: 30,
    otp_block_time: 120,
    max_login_attempts: 10,
    login_block_time: 120,
    login_url: '/admin'
  });
  
  // Fetch settings on component mount
  useEffect(() => {
    fetchLoginSettings();
  }, []);
  
  const fetchLoginSettings = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${config.apiUrl}/login_settings`);
      setFormData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching login settings:', err);
      setError('Failed to load login settings. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value, 10) || 0
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.put(`${config.apiUrl}/login_settings`, formData);
      setSuccessMessage(response.data.message || 'Settings updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error updating login settings:', err);
      setError('Failed to update settings. Please try again.');
      setTimeout(() => setError(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    fetchLoginSettings();
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h1 className="text-xl font-semibold text-gray-800">Login Settings</h1>
              </div>

              {/* Success/Error Messages */}
              {successMessage && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                  {successMessage}
                </div>
              )}
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              {/* Loading State */}
              {isLoading && (
                <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded-lg">
                  Loading...
                </div>
              )}

              {/* Navigation Tabs */}
              <div className="border-b mb-6">
                <nav className="flex space-x-6">
                  <button
                    onClick={() => setActiveTab('customer')}
                    className={`py-2 border-b-2 ${activeTab === 'customer' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
                  >
                    Customer Login
                  </button>
                  <button
                    onClick={() => setActiveTab('otp')}
                    className={`py-2 border-b-2 ${activeTab === 'otp' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
                  >
                    OTP & Login Attempts
                  </button>
                  <button
                    onClick={() => setActiveTab('url')}
                    className={`py-2 border-b-2 ${activeTab === 'url' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
                  >
                    Login Url
                  </button>
                </nav>
              </div>

              {/* Content Sections */}
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
                {activeTab === 'customer' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-lg font-medium mb-4">Setup Login Option</h2>
                      <p className="text-sm text-gray-500 mb-6">The option you select customer will have the option to login</p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <span>Manual Login</span>
                            <Info className="w-4 h-4 text-gray-400" />
                          </div>
                          <input 
                            type="checkbox" 
                            name="manual_login"
                            className="w-4 h-4" 
                            checked={formData.manual_login} 
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <span>OTP Login</span>
                            <Info className="w-4 h-4 text-gray-400" />
                          </div>
                          <input 
                            type="checkbox" 
                            name="otp_login"
                            className="w-4 h-4" 
                            checked={formData.otp_login} 
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-medium mb-4">OTP Verification</h2>
                      <p className="text-sm text-gray-500 mb-6">The option you select will need to be verified by the customer</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <span>Email Verification</span>
                            <Info className="w-4 h-4 text-gray-400" />
                          </div>
                          <input 
                            type="checkbox" 
                            name="email_verification"
                            className="w-4 h-4" 
                            checked={formData.email_verification} 
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <span>Phone Number Verification</span>
                            <Info className="w-4 h-4 text-gray-400" />
                          </div>
                          <input 
                            type="checkbox" 
                            name="phone_verification"
                            className="w-4 h-4" 
                            checked={formData.phone_verification} 
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4">
                      <button 
                        type="button" 
                        onClick={handleReset} 
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                        disabled={isLoading}
                      >
                        Reset
                      </button>
                      <button 
                        type="submit" 
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        disabled={isLoading}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'otp' && (
                  <div className="space-y-6">
                    <h2 className="flex items-center gap-2 text-lg font-medium">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      OTP & Login Settings
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          Maximum OTP Attempts
                          <Info className="w-4 h-4 text-gray-400" />
                        </label>
                        <input 
                          type="number" 
                          name="max_otp_attempts"
                          className="w-full p-2 border rounded-lg" 
                          value={formData.max_otp_attempts} 
                          onChange={handleNumberInputChange}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          OTP Resend Time (Sec)
                          <Info className="w-4 h-4 text-gray-400" />
                        </label>
                        <input 
                          type="number" 
                          name="otp_resend_time"
                          className="w-full p-2 border rounded-lg" 
                          value={formData.otp_resend_time} 
                          onChange={handleNumberInputChange}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          Temporary Block Time (Sec)
                          <Info className="w-4 h-4 text-gray-400" />
                        </label>
                        <input 
                          type="number" 
                          name="otp_block_time"
                          className="w-full p-2 border rounded-lg" 
                          value={formData.otp_block_time} 
                          onChange={handleNumberInputChange}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          Maximum Login Attempts
                          <Info className="w-4 h-4 text-gray-400" />
                        </label>
                        <input 
                          type="number" 
                          name="max_login_attempts"
                          className="w-full p-2 border rounded-lg" 
                          value={formData.max_login_attempts} 
                          onChange={handleNumberInputChange}
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          Temporary Login Block Time (Sec)
                          <Info className="w-4 h-4 text-gray-400" />
                        </label>
                        <input 
                          type="number" 
                          name="login_block_time"
                          className="w-full p-2 border rounded-lg" 
                          value={formData.login_block_time} 
                          onChange={handleNumberInputChange}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-4">
                      <button 
                        type="button" 
                        onClick={handleReset} 
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                        disabled={isLoading}
                      >
                        Reset
                      </button>
                      <button 
                        type="submit" 
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        disabled={isLoading}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'url' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-medium mb-6">Admin Login Page</h2>
                      <div className="space-y-4">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          Admin Login Url
                          <Info className="w-4 h-4 text-gray-400" />
                        </label>
                        <div className="flex">
                          <input 
                            type="text" 
                            className="flex-1 p-2 border rounded-l-lg bg-gray-50" 
                            value={`${formData.login_url}`} 
                            disabled 
                          />
                          <input 
                            type="text" 
                            name="login_url"
                            className="w-32 p-2 border-t border-b border-r rounded-r-lg" 
                            value={formData.login_url.replace(/^\//, '')} 
                            onChange={(e) => setFormData({...formData, login_url: '' + e.target.value.replace(/^\//, '')})}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button 
                        type="submit" 
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        disabled={isLoading}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSettings;