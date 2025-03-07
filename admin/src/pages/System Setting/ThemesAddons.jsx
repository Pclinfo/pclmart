import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const SystemSetup = () => {
  const [activeTab, setActiveTab] = useState('theme');
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [activeContent, setActiveContent] = useState(' ');

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="flex items-center gap-2 p-4 bg-white border-b">
              <div className="text-lg font-semibold">System Setup</div>
              <button className="ml-auto text-blue-600 text-sm">
                How The Setting Works
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b bg-white">
              <button
                className={`px-4 py-2 ${activeTab === 'theme'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600'
                  }`}
                onClick={() => setActiveTab('theme')}
              >
                Theme Setup
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'addons'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600'
                  }`}
                onClick={() => setActiveTab('addons')}
              >
                System Addons
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6">
              {activeTab === 'theme' ? (
                <div className="space-y-6">
                  {/* Upload Theme Section */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h2 className="text-lg font-medium mb-4">Upload Theme</h2>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                          <p className="text-blue-600">
                            Drag & drop file or{' '}
                            <button className="text-blue-600 underline">
                              browse file
                            </button>
                          </p>
                        </div>
                      </div>
                      <div className="md:w-64">
                        <h3 className="font-medium mb-2">Instructions</h3>
                        <ul className="text-sm space-y-2">
                          <li>Maximum file size 50 MB</li>
                          <li>Have to upload zip file</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded">
                        Upload
                      </button>
                    </div>
                  </div>

                  {/* Theme Preview Section */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium">Default Theme</h2>
                      <button className="text-blue-600 text-sm">
                        Read Before Change Theme
                      </button>
                    </div>
                    <div className="border rounded-lg p-2">
                      <img
                        src="/api/placeholder/800/400"
                        alt="Theme Preview"
                        className="w-full rounded"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-lg font-medium mb-4">Upload Addons</h2>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <p className="text-blue-600">
                          Drag & drop file or{' '}
                          <button className="text-blue-600 underline">browse file</button>
                        </p>
                      </div>
                    </div>
                    <div className="md:w-64">
                      <h3 className="font-medium mb-2">Instructions</h3>
                      <ul className="text-sm space-y-2">
                        <li>Please make sure, Your server php "Upload max filesize" value is grater or equal to 20MB. Current value is:2MB</li>
                        <li>Please make sure, Your server php "Post max size" value is grater or equal to 20MB. Current value is:5MB</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded">
                      Upload
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSetup;