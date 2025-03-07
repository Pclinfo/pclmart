import React, { useState } from 'react';
import { Menu, Settings, Globe, DollarSign, Cookie, Database, RefreshCw, Upload, Info, Download, Smartphone } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';


const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('environment');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeContent, setActiveContent] = useState(' ');

  const tabs = [
    { id: 'environment', name: 'Environment Settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'app', name: 'App Settings', icon: <Menu className="w-4 h-4" /> },
    { id: 'update', name: 'Software Update', icon: <RefreshCw className="w-4 h-4" /> },
    { id: 'language', name: 'Language', icon: <Globe className="w-4 h-4" /> },
    { id: 'currency', name: 'Currency', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'cookies', name: 'Cookies', icon: <Cookie className="w-4 h-4" /> },
    { id: 'database', name: 'Clean Database', icon: <Database className="w-4 h-4" /> }
  ];

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                  <h1 className="text-xl font-semibold">System Settings</h1>
                  <button
                    className="md:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Navigation Tabs */}
                <div className={`md:w-64 bg-white rounded-lg shadow-sm ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>
                  <nav className="p-4">
                    {tabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left mb-2 transition-colors
                    ${activeTab === tab.id
                            ? 'bg-blue-50 text-blue-600'
                            : 'hover:bg-gray-50 text-gray-700'}`}
                      >
                        {tab.icon}
                        <span>{tab.name}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Main Content Area */}
                <div className="flex-1">
                  {/* Environment Settings */}
                  {activeTab === 'environment' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <Info className="w-5 h-5" />
                        Environment Information
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">App Name</label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-lg"
                            defaultValue="6valley-default"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">App Debug</label>
                            <select className="w-full p-2 border rounded-lg">
                              <option>False</option>
                              <option>True</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">App Mode</label>
                            <select className="w-full p-2 border rounded-lg">
                              <option>Live</option>
                              <option>Development</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">DB Connection</label>
                            <input type="text" className="w-full p-2 border rounded-lg" placeholder="---" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">DB Host</label>
                            <input type="text" className="w-full p-2 border rounded-lg" placeholder="---" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">DB Port</label>
                            <input type="text" className="w-full p-2 border rounded-lg" placeholder="---" />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Buyer Username</label>
                            <input
                              type="text"
                              className="w-full p-2 border rounded-lg"
                              defaultValue="6valley-admin-demo-jhisdhisufijfijqw5467"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Code</label>
                            <input
                              type="text"
                              className="w-full p-2 border rounded-lg"
                              defaultValue="00000000000000"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-4">
                          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Reset</button>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Submit</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Software Update */}
                  {activeTab === 'update' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <Upload className="w-5 h-5" />
                        Upload The Updated File
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Codecanyon Username</label>
                          <input type="text" className="w-full p-2 border rounded-lg" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Code</label>
                          <input type="text" className="w-full p-2 border rounded-lg" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Choose Updated File</label>
                          <div className="flex gap-4">
                            <input type="text" className="flex-1 p-2 border rounded-lg" placeholder="No file chosen" disabled />
                            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Browse</button>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Upload & Update
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Language Settings */}
                  {activeTab === 'language' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <div className="mb-4 text-red-100 bg-red-50 p-4 rounded-lg">
                        Changing some settings will take time to show effect please clear session or wait for 60 minutes else browse from incognito mode
                      </div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold">Language Table</h2>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          + Add new language
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="p-4 text-left">SL</th>
                              <th className="p-4 text-left">ID</th>
                              <th className="p-4 text-left">Name</th>
                              <th className="p-4 text-left">Code</th>
                              <th className="p-4 text-left">Status</th>
                              <th className="p-4 text-left">Default Status</th>
                              <th className="p-4 text-left">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t">
                              <td className="p-4">0</td>
                              <td className="p-4">1</td>
                              <td className="p-4">English (ltr)</td>
                              <td className="p-4">en</td>
                              <td className="p-4">
                                <div className="w-8 h-4 bg-blue-600 rounded-full"></div>
                              </td>
                              <td className="p-4">
                                <div className="w-8 h-4 bg-blue-600 rounded-full"></div>
                              </td>
                              <td className="p-4">
                                <button className="text-gray-600 hover:text-gray-900">
                                  <Settings className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Currency Settings */}
                  {activeTab === 'currency' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-4">Default Currency Setup</h2>
                        <div className="flex gap-4 items-end">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                            <select className="w-full p-2 border rounded-lg">
                              <option>USD</option>
                            </select>
                          </div>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Save
                          </button>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-4">Add Currency</h2>
                        <div className="grid md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Currency Name</label>
                            <input type="text" className="w-full p-2 border rounded-lg" placeholder="Ex: United States Dollar" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Currency Symbol</label>
                            <input type="text" className="w-full p-2 border rounded-lg" placeholder="Ex: $" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Currency Code</label>
                            <input type="text" className="w-full p-2 border rounded-lg" placeholder="Ex: USD" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Exchange Rate</label>
                            <input type="text" className="w-full p-2 border rounded-lg" placeholder="Ex: 1" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-4 mt-4">
                          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Reset</button>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Submit</button>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="p-4 text-left">SL</th>
                              <th className="p-4 text-left">Currency Name</th>
                              <th className="p-4 text-left">Currency Symbol</th>
                              <th className="p-4 text-left">Currency Code</th>
                              <th className="p-4 text-left">Exchange Rate (1 USD = ?)</th>
                              <th className="p-4 text-left">Status</th>
                              <th className="p-4 text-left">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t">
                              <td className="p-4">1</td>
                              <td className="p-4">US Dollar</td>
                              <td className="p-4">$</td>
                              <td className="p-4">USD</td>
                              <td className="p-4">1</td>
                              <td className="p-4">
                                <div className="w-8 h-4 bg-gray-200 rounded-full"></div>
                              </td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  <button className="text-blue-600 hover:text-blue-800">
                                    <Settings className="w-4 h-4" />
                                  </button>
                                  <button className="text-red-600 hover:text-red-800">
                                    <Database className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* App Settings */}
                  {activeTab === 'app' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <Smartphone className="w-5 h-5" />
                        User app version control
                      </h2>
                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* For Android */}
                        <div className="space-y-4">
                          <h3 className="font-medium flex items-center gap-2">
                            <span className="text-green-600">
                              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                                <path d="M17.523 15.341c-.5 0-.906.406-.906.906v2.297c0 .5.406.906.906.906s.906-.406.906-.906v-2.297c0-.5-.406-.906-.906-.906zm-11.046 0c-.5 0-.906.406-.906.906v2.297c0 .5.406.906.906.906s.906-.406.906-.906v-2.297c0-.5-.406-.906-.906-.906zm11.442-6.718l1.494-2.518c.083-.14.032-.316-.108-.399-.14-.083-.316-.032-.399.108l-1.511 2.552c-.899-.399-1.898-.623-2.967-.623s-2.068.224-2.967.623l-1.511-2.552c-.083-.14-.259-.191-.399-.108-.14.083-.191.259-.108.399l1.494 2.518c-2.173 1.102-3.636 3.244-3.636 5.699 0 .316.259.574.574.574h13.172c.316 0 .574-.259.574-.574 0-2.455-1.463-4.597-3.636-5.699zm-6.505 3.244c-.399 0-.724-.324-.724-.724s.324-.724.724-.724.724.324.724.724-.324.724-.724.724zm6.005 0c-.399 0-.724-.324-.724-.724s.324-.724.724-.724.724.324.724.724-.325.724-.724.724z" />
                              </svg>
                            </span>
                            For Android
                          </h3>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Minimum Customer App Version
                              <Info className="w-4 h-4 inline-block ml-1 text-gray-400" />
                            </label>
                            <input
                              type="text"
                              className="w-full p-2 border rounded-lg"
                              defaultValue="14.1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Download URL For Customer App
                              <Info className="w-4 h-4 inline-block ml-1 text-gray-400" />
                            </label>
                            <input
                              type="text"
                              className="w-full p-2 border rounded-lg"
                              defaultValue="https://play.google.com/store/apps"
                            />
                          </div>
                        </div>

                        {/* For iOS */}
                        <div className="space-y-4">
                          <h3 className="font-medium flex items-center gap-2">
                            <span className="text-gray-800">
                              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.08-.46-2.06-.48-3.2 0-1.42.61-2.15.43-3.02-.37C3.36 15.76 4.65 9.54 8.9 9.16c1.08.04 1.85.43 2.51.45.96-.05 1.88-.47 3.03-.5 1.89-.05 3.01.74 3.7 1.67-3.25 1.95-2.71 5.45.55 6.92-.59 1.25-1.39 2.35-2.54 3.58zM12.03 9c-.19-2.15 1.66-4 3.74-4.13.38 2.18-1.64 4.13-3.74 4.13z" />
                              </svg>
                            </span>
                            For iOS
                          </h3>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Minimum Customer App Version
                              <Info className="w-4 h-4 inline-block ml-1 text-gray-400" />
                            </label>
                            <input
                              type="text"
                              className="w-full p-2 border rounded-lg"
                              defaultValue="14.1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Download URL For Customer App
                              <Info className="w-4 h-4 inline-block ml-1 text-gray-400" />
                            </label>
                            <input
                              type="text"
                              className="w-full p-2 border rounded-lg"
                              defaultValue="https://www.apple.com/app-store/"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Vendor App Settings */}
                      <h2 className="text-lg font-semibold mb-6 mt-8 flex items-center gap-2">
                        <Smartphone className="w-5 h-5" />
                        Vendor app version control
                      </h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* For Android */}
                        <div className="space-y-4">
                          <h3 className="font-medium flex items-center gap-2">
                            <span className="text-green-600">
                              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                                <path d="M17.523 15.341c-.5 0-.906.406-.906.906v2.297c0 .5.406.906.906.906s.906-.406.906-.906v-2.297c0-.5-.406-.906-.906-.906zm-11.046 0c-.5 0-.906.406-.906.906v2.297c0 .5.406.906.906.906s.906-.406.906-.906v-2.297c0-.5-.406-.906-.906-.906zm11.442-6.718l1.494-2.518c.083-.14.032-.316-.108-.399-.14-.083-.316-.032-.399.108l-1.511 2.552c-.899-.399-1.898-.623-2.967-.623s-2.068.224-2.967.623l-1.511-2.552c-.083-.14-.259-.191-.399-.108-.14.083-.191.259-.108.399l1.494 2.518c-2.173 1.102-3.636 3.244-3.636 5.699 0 .316.259.574.574.574h13.172c.316 0 .574-.259.574-.574 0-2.455-1.463-4.597-3.636-5.699zm-6.505 3.244c-.399 0-.724-.324-.724-.724s.324-.724.724-.724.724.324.724.724-.324.724-.724.724zm6.005 0c-.399 0-.724-.324-.724-.724s.324-.724.724-.724.724.324.724.724-.325.724-.724.724z" />
                              </svg>
                            </span>
                            For Android
                          </h3>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Minimum Vendor App Version
                              <Info className="w-4 h-4 inline-block ml-1 text-gray-400" />
                            </label>
                            <input
                              type="text"
                              className="w-full p-2 border rounded-lg"
                              defaultValue="14.1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Download URL For Vendor App
                              <Info className="w-4 h-4 inline-block ml-1 text-gray-400" />
                            </label>
                            <input
                              type="text"
                              className="w-full p-2 border rounded-lg"
                              defaultValue="https://play.google.com/store/apps"
                            />
                          </div>
                        </div>

                        {/* For iOS */}
                        <div className="space-y-4">
                          <h3 className="font-medium flex items-center gap-2">
                            <span className="text-gray-800">
                              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.08-.46-2.06-.48-3.2 0-1.42.61-2.15.43-3.02-.37C3.36 15.76 4.65 9.54 8.9 9.16c1.08.04 1.85.43 2.51.45.96-.05 1.88-.47 3.03-.5 1.89-.05 3.01.74 3.7 1.67-3.25 1.95-2.71 5.45.55 6.92-.59 1.25-1.39 2.35-2.54 3.58zM12.03 9c-.19-2.15 1.66-4 3.74-4.13.38 2.18-1.64 4.13-3.74 4.13z" />
                              </svg>
                            </span>
                            For iOS
                          </h3>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Minimum Vendor App Version
                              <Info className="w-4 h-4 inline-block ml-1 text-gray-400" />
                            </label>
                            <input
                              type="text"
                              className="w-full p-2 border rounded-lg"
                              defaultValue="14.1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Download URL For Vendor App
                              <Info className="w-4 h-4 inline-block ml-1 text-gray-400" />
                            </label>
                            <input
                              type="text"
                              className="w-full p-2 border rounded-lg"
                              defaultValue="https://www.apple.com/app-store/"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-4 mt-6">
                        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Reset</button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save</button>
                      </div>
                    </div>
                  )}

                  {/* Cookie Settings */}
                  {activeTab === 'cookies' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <Cookie className="w-5 h-5" />
                        Cookie Settings
                      </h2>
                      <div className="space-y-6">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cookie Text</label>
                            <textarea
                              className="w-full p-2 border rounded-lg min-h-[100px]"
                              defaultValue="By clicking 'Yes, I agree', you agree to store cookies on your device and disclose information in accordance with our Cookie Policy."
                            />
                          </div>
                          <div className="pt-6">
                            <div className="w-12 h-6 bg-blue-600 rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Database Settings */}
                  {activeTab === 'database' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <Database className="w-5 h-5" />
                        Clean Database
                      </h2>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <Info className="h-5 w-5 text-yellow-400" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              This action will remove all demo data from your database. Please backup your data before proceeding.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Products Section */}
                          <div className="border rounded-lg p-4">
                            <h3 className="font-medium mb-4">Products Management</h3>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Clean all products</span>
                                <button className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100">
                                  Clean
                                </button>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Clean product reviews</span>
                                <button className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100">
                                  Clean
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Orders Section */}
                          <div className="border rounded-lg p-4">
                            <h3 className="font-medium mb-4">Orders Management</h3>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Clean all orders</span>
                                <button className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100">
                                  Clean
                                </button>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Clean order history</span>
                                <button className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100">
                                  Clean
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Users Section */}
                          <div className="border rounded-lg p-4">
                            <h3 className="font-medium mb-4">Users Management</h3>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Clean all users</span>
                                <button className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100">
                                  Clean
                                </button>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Clean user activity logs</span>
                                <button className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100">
                                  Clean
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* System Section */}
                          <div className="border rounded-lg p-4">
                            <h3 className="font-medium mb-4">System Management</h3>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Clean system logs</span>
                                <button className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100">
                                  Clean
                                </button>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Clean cache files</span>
                                <button className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100">
                                  Clean
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                            Clean All Data
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
