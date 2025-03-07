import React, { useState } from 'react';
import { Info } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const LoginSettings = () => {
  const [activeTab, setActiveTab] = useState('customer');
  const [activeContent, setActiveContent] = useState(' ');

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
              <div className="bg-white rounded-lg shadow-sm p-6">
                {activeTab === 'customer' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-lg font-medium mb-4">Setup Login Option</h2>
                      <p className="text-sm text-gray-500 mb-6">The option you select customer will have the to option to login</p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <span>Manual Login</span>
                            <Info className="w-4 h-4 text-gray-400" />
                          </div>
                          <input type="checkbox" className="w-4 h-4" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <span>OTP Login</span>
                            <Info className="w-4 h-4 text-gray-400" />
                          </div>
                          <input type="checkbox" className="w-4 h-4" />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <span>Social Media Login</span>
                            <Info className="w-4 h-4 text-gray-400" />
                          </div>
                          <input type="checkbox" className="w-4 h-4" defaultChecked />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-medium mb-4">Social media login setup</h2>
                      <a href="#" className="text-blue-600 text-sm mb-6 block">Connect 3rd party login system from here</a>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <span>Google</span>
                            <Info className="w-4 h-4 text-gray-400" />
                          </div>
                          <input type="checkbox" className="w-4 h-4" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <span>Facebook</span>
                            <Info className="w-4 h-4 text-gray-400" />
                          </div>
                          <input type="checkbox" className="w-4 h-4" />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <span>Apple</span>
                            <Info className="w-4 h-4 text-gray-400" />
                          </div>
                          <input type="checkbox" className="w-4 h-4" defaultChecked />
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
                          <input type="checkbox" className="w-4 h-4" />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <span>Phone Number Verification</span>
                            <Info className="w-4 h-4 text-gray-400" />
                          </div>
                          <input type="checkbox" className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4">
                      <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Reset</button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Submit</button>
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
                          Maximum OTP Hit
                          <Info className="w-4 h-4 text-gray-400" />
                        </label>
                        <input type="number" className="w-full p-2 border rounded-lg" defaultValue="5" />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          OTP Resend Time (Sec)
                          <Info className="w-4 h-4 text-gray-400" />
                        </label>
                        <input type="number" className="w-full p-2 border rounded-lg" defaultValue="30" />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          Temporary Block Time (Sec)
                          <Info className="w-4 h-4 text-gray-400" />
                        </label>
                        <input type="number" className="w-full p-2 border rounded-lg" defaultValue="120" />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          Maximum Login Hit
                          <Info className="w-4 h-4 text-gray-400" />
                        </label>
                        <input type="number" className="w-full p-2 border rounded-lg" defaultValue="10" />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          Temporary Login Block Time (Sec)
                          <Info className="w-4 h-4 text-gray-400" />
                        </label>
                        <input type="number" className="w-full p-2 border rounded-lg" defaultValue="120" />
                      </div>
                    </div>

                    <div className="flex justify-end gap-4">
                      <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Reset</button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save</button>
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
                          <input type="text" className="flex-1 p-2 border rounded-l-lg bg-gray-50" defaultValue="https://6valley.6amtech.com/login/" disabled />
                          <input type="text" className="w-32 p-2 border-t border-b border-r rounded-r-lg" defaultValue="admin" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-medium mb-6">Employee Login Page</h2>
                      <div className="space-y-4">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          Employee Login Url
                          <Info className="w-4 h-4 text-gray-400" />
                        </label>
                        <div className="flex">
                          <input type="text" className="flex-1 p-2 border rounded-l-lg bg-gray-50" defaultValue="https://6valley.6amtech.com/login/" disabled />
                          <input type="text" className="w-32 p-2 border-t border-b border-r rounded-r-lg" defaultValue="employee" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Submit</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSettings;