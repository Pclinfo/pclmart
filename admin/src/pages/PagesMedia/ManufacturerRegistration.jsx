import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const ManufacturerRegistration = () => {
  const [activeTab, setActiveTab] = useState('header');
  const [activeContent, setActiveContent] = useState(' ');

  const tabs = [
    { id: 'header', label: 'Header' },
    { id: 'why-sell', label: 'Why Sell With Us' },
    { id: 'business-process', label: 'Business Process' },
    { id: 'download-app', label: 'Download App' },
    { id: 'faq', label: 'FAQ' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'header':
        return (

          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Vendor Registration"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sub Title</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Create your own store.Already have store?"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <img src="/api/placeholder/310/240" alt="placeholder" className="object-cover" />
                  </div>
                  <p className="text-sm text-gray-500">Image format : jpg, png, jpeg, webp</p>
                  <p className="text-sm text-gray-500">Image size : Max 2 MB</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="min-h-screen bg-gray-50">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-blue-600 text-xl">📊</span>
                <h1 className="text-xl font-semibold text-gray-800">Vendor Registration</h1>
              </div>

              <div className="bg-white rounded-lg shadow-sm">
                <div className="border-b border-gray-200">
                  <nav className="flex flex-wrap gap-1 p-1">
                    {tabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 text-sm font-medium transition-colors rounded-md
                    ${activeTab === tab.id
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  {renderContent()}
                </div>

                <div className="flex justify-end gap-4 p-4 border-t border-gray-200">
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md">
                    Reset
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerRegistration;