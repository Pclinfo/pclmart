import React, { useState, useEffect } from 'react';
import { Menu, Settings, Globe, DollarSign, Cookie, Database, RefreshCw, Upload, Info, Download, Smartphone } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import config from '../../config';
const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('environment');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('');

  // State for environment settings
  const [environmentSettings, setEnvironmentSettings] = useState({
    app_name: '',
    app_debug: false,
    app_mode: 'Live',
    db_connection: '',
    db_host: '',
    db_port: '',
    buyer_username: '',
    purchase_code: ''
  });

  // State for app settings
  const [appSettings, setAppSettings] = useState({
    android_min_customer_version: '',
    android_customer_download_url: '',
    ios_min_customer_version: '',
    ios_customer_download_url: '',
    android_min_vendor_version: '',
    android_vendor_download_url: '',
    ios_min_vendor_version: '',
    ios_vendor_download_url: ''
  });

  // State for languages
  const [languages, setLanguages] = useState([]);
  const [newLanguage, setNewLanguage] = useState({
    name: '',
    code: '',
    status: true,
    is_default: false
  });

  // State for currencies
  const [currencies, setCurrencies] = useState([]);
  const [newCurrency, setNewCurrency] = useState({
    name: '',
    symbol: '',
    code: '',
    exchange_rate: 1,
    status: true,
    is_default: false
  });

  // State for cookie settings
  const [cookieSettings, setCookieSettings] = useState({
    cookie_text: '',
    status: true
  });

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === 'environment') {
      fetchEnvironmentSettings();
    } else if (activeTab === 'app') {
      fetchAppSettings();
    } else if (activeTab === 'language') {
      fetchLanguages();
    } else if (activeTab === 'currency') {
      fetchCurrencies();
    } else if (activeTab === 'cookies') {
      fetchCookieSettings();
    }
  }, [activeTab]);

  // API calls
  const fetchEnvironmentSettings = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/environment-settings`);
      if (response.data) {
        setEnvironmentSettings(response.data);
      }
    } catch (error) {
      console.error('Error fetching environment settings:', error);
    }
  };

  const updateEnvironmentSettings = async () => {
    try {
      const response = await axios.put(`${config.apiUrl}/environment-settings`, environmentSettings);
      if (response.data.success) {
        alert('Environment settings updated successfully');
      }
    } catch (error) {
      console.error('Error updating environment settings:', error);
    }
  };

  const fetchAppSettings = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/app-settings`);
      if (response.data) {
        setAppSettings(response.data);
      }
    } catch (error) {
      console.error('Error fetching app settings:', error);
    }
  };

  const updateAppSettings = async () => {
    try {
      const response = await axios.put(`${config.apiUrl}/app-settings`, appSettings);
      if (response.data.success) {
        alert('App settings updated successfully');
      }
    } catch (error) {
      console.error('Error updating app settings:', error);
    }
  };

  const fetchLanguages = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/languages`);
      if (response.data) {
        setLanguages(response.data);
      }
    } catch (error) {
      console.error('Error fetching languages:', error);
    }
  };

  const addLanguage = async () => {
    try {
      const response = await axios.post(`${config.apiUrl}/languages`, newLanguage);
      if (response.data.success) {
        alert('Language added successfully');
        fetchLanguages();
        // Reset form
        setNewLanguage({
          name: '',
          code: '',
          status: true,
          is_default: false
        });
      }
    } catch (error) {
      console.error('Error adding language:', error);
    }
  };

  const updateLanguage = async (langId, data) => {
    try {
      const response = await axios.put(`${config.apiUrl}/languages/${langId}`, data);
      if (response.data.success) {
        alert('Language updated successfully');
        fetchLanguages();
      }
    } catch (error) {
      console.error('Error updating language:', error);
    }
  };

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/currencies`);
      if (response.data) {
        setCurrencies(response.data);
      }
    } catch (error) {
      console.error('Error fetching currencies:', error);
    }
  };

  const addCurrency = async () => {
    try {
      const response = await axios.post(`${config.apiUrl}/currencies`, newCurrency);
      if (response.data.success) {
        alert('Currency added successfully');
        fetchCurrencies();
        // Reset form
        setNewCurrency({
          name: '',
          symbol: '',
          code: '',
          exchange_rate: 1,
          status: true,
          is_default: false
        });
      }
    } catch (error) {
      console.error('Error adding currency:', error);
    }
  };

  const setDefaultCurrency = async (currencyId) => {
    try {
      const response = await axios.put(`${config.apiUrl}currencies/${currencyId}/set-default`);
      if (response.data.success) {
        alert('Default currency updated successfully');
        fetchCurrencies();
      }
    } catch (error) {
      console.error('Error setting default currency:', error);
    }
  };

  const fetchCookieSettings = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}cookie-settings`);
      if (response.data) {
        setCookieSettings(response.data);
      }
    } catch (error) {
      console.error('Error fetching cookie settings:', error);
    }
  };

  const updateCookieSettings = async () => {
    try {
      const response = await axios.put(`${config.apiUrl}/cookie-settings`, cookieSettings);
      if (response.data.success) {
        alert('Cookie settings updated successfully');
      }
    } catch (error) {
      console.error('Error updating cookie settings:', error);
    }
  };

  const cleanDatabase = async (target) => {
    if (window.confirm(`Are you sure you want to clean ${target}? This action cannot be undone.`)) {
      try {
        const response = await axios.delete(`${config.apiUrl}/clean-database/${target}`);
        if (response.data.success) {
          alert(`Successfully cleaned ${target}`);
        }
      } catch (error) {
        console.error(`Error cleaning ${target}:`, error);
      }
    }
  };

  const handleEnvironmentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEnvironmentSettings({
      ...environmentSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAppSettingsChange = (e) => {
    const { name, value } = e.target;
    setAppSettings({
      ...appSettings,
      [name]: value
    });
  };

  const handleNewLanguageChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewLanguage({
      ...newLanguage,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleCookieSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCookieSettings({
      ...cookieSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleNewCurrencyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCurrency({
      ...newCurrency,
      [name]: type === 'checkbox' ? checked : 
        name === 'exchange_rate' ? parseFloat(value) : value
    });
  };

  const resetEnvironmentForm = () => {
    fetchEnvironmentSettings();
  };

  const resetAppSettingsForm = () => {
    fetchAppSettings();
  };

  const resetLanguageForm = () => {
    setNewLanguage({
      name: '',
      code: '',
      status: true,
      is_default: false
    });
  };

  const resetCurrencyForm = () => {
    setNewCurrency({
      name: '',
      symbol: '',
      code: '',
      exchange_rate: 1,
      status: true,
      is_default: false
    });
  };

  const tabs = [
    { id: 'environment', name: 'Environment Settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'app', name: 'App Settings', icon: <Smartphone className="w-4 h-4" /> },
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
                            name="app_name"
                            className="w-full p-2 border rounded-lg"
                            value={environmentSettings.app_name || ''}
                            onChange={handleEnvironmentChange}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">App Debug</label>
                            <select 
                              name="app_debug" 
                              className="w-full p-2 border rounded-lg"
                              value={environmentSettings.app_debug ? 'true' : 'false'}
                              onChange={(e) => setEnvironmentSettings({
                                ...environmentSettings,
                                app_debug: e.target.value === 'true'
                              })}
                            >
                              <option value="false">False</option>
                              <option value="true">True</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">App Mode</label>
                            <select 
                              name="app_mode" 
                              className="w-full p-2 border rounded-lg"
                              value={environmentSettings.app_mode || 'Live'}
                              onChange={handleEnvironmentChange}
                            >
                              <option value="Live">Live</option>
                              <option value="Development">Development</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">DB Connection</label>
                            <input 
                              type="text" 
                              name="db_connection"
                              className="w-full p-2 border rounded-lg" 
                              placeholder="---" 
                              value={environmentSettings.db_connection || ''}
                              onChange={handleEnvironmentChange}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">DB Host</label>
                            <input 
                              type="text" 
                              name="db_host"
                              className="w-full p-2 border rounded-lg" 
                              placeholder="---" 
                              value={environmentSettings.db_host || ''}
                              onChange={handleEnvironmentChange}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">DB Port</label>
                            <input 
                              type="text" 
                              name="db_port"
                              className="w-full p-2 border rounded-lg" 
                              placeholder="---" 
                              value={environmentSettings.db_port || ''}
                              onChange={handleEnvironmentChange}
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Buyer Username</label>
                            <input
                              type="text"
                              name="buyer_username"
                              className="w-full p-2 border rounded-lg"
                              value={environmentSettings.buyer_username || ''}
                              onChange={handleEnvironmentChange}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Code</label>
                            <input
                              type="text"
                              name="purchase_code"
                              className="w-full p-2 border rounded-lg"
                              value={environmentSettings.purchase_code || ''}
                              onChange={handleEnvironmentChange}
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-4">
                          <button 
                            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                            onClick={resetEnvironmentForm}
                          >
                            Reset
                          </button>
                          <button 
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            onClick={updateEnvironmentSettings}
                          >
                            Submit
                          </button>
                        </div>
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
                              name="android_min_customer_version"
                              className="w-full p-2 border rounded-lg"
                              value={appSettings.android_min_customer_version || ''}
                              onChange={handleAppSettingsChange}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Customer App Download URL
                            </label>
                            <input
                              type="text"
                              name="android_customer_download_url"
                              className="w-full p-2 border rounded-lg"
                              value={appSettings.android_customer_download_url || ''}
                              onChange={handleAppSettingsChange}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Minimum Vendor App Version
                              <Info className="w-4 h-4 inline-block ml-1 text-gray-400" />
                            </label>
                            <input
                              type="text"
                              name="android_min_vendor_version"
                              className="w-full p-2 border rounded-lg"
                              value={appSettings.android_min_vendor_version || ''}
                              onChange={handleAppSettingsChange}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Vendor App Download URL
                            </label>
                            <input
                              type="text"
                              name="android_vendor_download_url"
                              className="w-full p-2 border rounded-lg"
                              value={appSettings.android_vendor_download_url || ''}
                              onChange={handleAppSettingsChange}
                            />
                          </div>
                        </div>

                        {/* For iOS */}
                        <div className="space-y-4">
                          <h3 className="font-medium flex items-center gap-2">
                            <span className="text-gray-600">
                              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                                <path d="M17.076 11.769c-.017-1.595.637-3.192 2.125-4.269-1.125-1.575-2.853-2.137-4.354-2.479-1.425-.327-2.695.079-3.839.352-1.194.281-2.271.534-3.373.036-2.468-1.116-3.763.289-5.028 3.663-.359.957-.624 2.006-.708 3.241-.062.93.348 3.914 1.434 6.48.599 1.414 1.203 2.779 2.77 2.779 1.491 0 2.377-.793 3.737-.793 1.325 0 2.309.793 3.728.793 2.086 0 2.797-1.906 3.4-3.324.448-1.059.623-1.625 1.094-3.069-2.763-1.033-2.976-4.831-2.986-4.91zm-2.933-8.83c-1.826.122-3.408 1.311-3.958 2.857-.204.578-.39 1.409-.335 2.362 1.633.037 3.261-1.041 3.875-2.59.294-.743.471-1.58.418-2.629z"/>
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
                              name="ios_min_customer_version"
                              className="w-full p-2 border rounded-lg"
                              value={appSettings.ios_min_customer_version || ''}
                              onChange={handleAppSettingsChange}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Customer App Download URL
                            </label>
                            <input
                              type="text"
                              name="ios_customer_download_url"
                              className="w-full p-2 border rounded-lg"
                              value={appSettings.ios_customer_download_url || ''}
                              onChange={handleAppSettingsChange}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Minimum Vendor App Version
                              <Info className="w-4 h-4 inline-block ml-1 text-gray-400" />
                            </label>
                            <input
                              type="text"
                              name="ios_min_vendor_version"
                              className="w-full p-2 border rounded-lg"
                              value={appSettings.ios_min_vendor_version || ''}
                              onChange={handleAppSettingsChange}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Vendor App Download URL
                            </label>
                            <input
                              type="text"
                              name="ios_vendor_download_url"
                              className="w-full p-2 border rounded-lg"
                              value={appSettings.ios_vendor_download_url || ''}
                              onChange={handleAppSettingsChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-4">
                        <button 
                          className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                          onClick={resetAppSettingsForm}
                        >
                          Reset
                        </button>
                        <button 
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          onClick={updateAppSettings}
                        >
                          Submit
                        </button>
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
                      <div className="mb-4 text-red-600 bg-red-50 p-4 rounded-lg">
                        Changing some settings will take time to show effect please clear session or wait for 60 minutes else browse from incognito mode
                      </div>

                      {/* Add Language Form */}
                      <div className="mb-6 border-b pb-6">
                        <h2 className="text-lg font-semibold mb-4">Add New Language</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Language Name</label>
                            <input 
                              type="text" 
                              name="name"
                              className="w-full p-2 border rounded-lg" 
                              placeholder="Ex: English"
                              value={newLanguage.name}
                              onChange={handleNewLanguageChange}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Language Code</label>
                            <input 
                              type="text" 
                              name="code"
                              className="w-full p-2 border rounded-lg" 
                              placeholder="Ex: en"
                              value={newLanguage.code}
                              onChange={handleNewLanguageChange}
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                              <input 
                                type="checkbox" 
                                name="status"
                                className="mr-2" 
                                checked={newLanguage.status}
                                onChange={handleNewLanguageChange}
                              />
                              Active Status
                            </label>
                          </div>
                          <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                              <input 
                                type="checkbox" 
                                name="is_default"
                                className="mr-2" 
                                checked={newLanguage.is_default}
                                onChange={handleNewLanguageChange}
                              />
                              Set as Default
                            </label>
                          </div>
                        </div>
                        <div className="flex justify-end gap-4 mt-4">
                          <button 
                            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                            onClick={resetLanguageForm}
                          >
                            Reset
                          </button>
                          <button 
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"onClick={addLanguage}
                            >
                              Submit
                            </button>
                          </div>
                        </div>

                        {/* Language List Table */}
                        <h2 className="text-lg font-semibold mb-4">All Languages</h2>
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-white border">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="py-3 px-4 text-left border-b">Language Name</th>
                                <th className="py-3 px-4 text-left border-b">Code</th>
                                <th className="py-3 px-4 text-left border-b">Status</th>
                                <th className="py-3 px-4 text-left border-b">Default</th>
                                <th className="py-3 px-4 text-left border-b">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {languages.length > 0 ? (
                                languages.map(lang => (
                                  <tr key={lang.id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4">{lang.name}</td>
                                    <td className="py-3 px-4">{lang.code}</td>
                                    <td className="py-3 px-4">
                                      <span className={`px-2 py-1 rounded-full text-xs ${lang.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {lang.status ? 'Active' : 'Inactive'}
                                      </span>
                                    </td>
                                    <td className="py-3 px-4">
                                      {lang.is_default ? (
                                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                          Default
                                        </span>
                                      ) : (
                                        <button 
                                          className="text-blue-600 hover:underline text-sm"
                                          onClick={() => updateLanguage(lang.id, { ...lang, is_default: true })}
                                        >
                                          Set Default
                                        </button>
                                      )}
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex gap-2">
                                        <button 
                                          className="text-blue-600 hover:underline text-sm"
                                          onClick={() => {
                                            const updatedStatus = !lang.status;
                                            updateLanguage(lang.id, { ...lang, status: updatedStatus });
                                          }}
                                        >
                                          {lang.status ? 'Disable' : 'Enable'}
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                                    No languages found
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Currency Settings */}
                    {activeTab === 'currency' && (
                      <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="mb-4 text-red-600 bg-red-50 p-4 rounded-lg">
                          Changing some settings will take time to show effect please clear session or wait for 60 minutes else browse from incognito mode
                        </div>

                        {/* Add Currency Form */}
                        <div className="mb-6 border-b pb-6">
                          <h2 className="text-lg font-semibold mb-4">Add New Currency</h2>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Currency Name</label>
                              <input 
                                type="text" 
                                name="name"
                                className="w-full p-2 border rounded-lg" 
                                placeholder="Ex: US Dollar"
                                value={newCurrency.name}
                                onChange={handleNewCurrencyChange}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Currency Symbol</label>
                              <input 
                                type="text" 
                                name="symbol"
                                className="w-full p-2 border rounded-lg" 
                                placeholder="Ex: $"
                                value={newCurrency.symbol}
                                onChange={handleNewCurrencyChange}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Currency Code</label>
                              <input 
                                type="text" 
                                name="code"
                                className="w-full p-2 border rounded-lg" 
                                placeholder="Ex: USD"
                                value={newCurrency.code}
                                onChange={handleNewCurrencyChange}
                              />
                            </div>
                          </div>
                          <div className="grid md:grid-cols-3 gap-4 mt-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Exchange Rate</label>
                              <input 
                                type="number" 
                                name="exchange_rate"
                                className="w-full p-2 border rounded-lg" 
                                placeholder="Ex: 1"
                                value={newCurrency.exchange_rate}
                                onChange={handleNewCurrencyChange}
                                min="0"
                                step="0.01"
                              />
                            </div>
                            <div>
                              <label className="flex items-center text-sm font-medium text-gray-700 mb-1 mt-6">
                                <input 
                                  type="checkbox" 
                                  name="status"
                                  className="mr-2" 
                                  checked={newCurrency.status}
                                  onChange={handleNewCurrencyChange}
                                />
                                Active Status
                              </label>
                            </div>
                            <div>
                              <label className="flex items-center text-sm font-medium text-gray-700 mb-1 mt-6">
                                <input 
                                  type="checkbox" 
                                  name="is_default"
                                  className="mr-2" 
                                  checked={newCurrency.is_default}
                                  onChange={handleNewCurrencyChange}
                                />
                                Set as Default
                              </label>
                            </div>
                          </div>
                          <div className="flex justify-end gap-4 mt-4">
                            <button 
                              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                              onClick={resetCurrencyForm}
                            >
                              Reset
                            </button>
                            <button 
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                              onClick={addCurrency}
                            >
                              Submit
                            </button>
                          </div>
                        </div>

                        {/* Currency List Table */}
                        <h2 className="text-lg font-semibold mb-4">All Currencies</h2>
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-white border">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="py-3 px-4 text-left border-b">Currency Name</th>
                                <th className="py-3 px-4 text-left border-b">Symbol</th>
                                <th className="py-3 px-4 text-left border-b">Code</th>
                                <th className="py-3 px-4 text-left border-b">Exchange Rate</th>
                                <th className="py-3 px-4 text-left border-b">Status</th>
                                <th className="py-3 px-4 text-left border-b">Default</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currencies.length > 0 ? (
                                currencies.map(currency => (
                                  <tr key={currency.id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4">{currency.name}</td>
                                    <td className="py-3 px-4">{currency.symbol}</td>
                                    <td className="py-3 px-4">{currency.code}</td>
                                    <td className="py-3 px-4">{currency.exchange_rate}</td>
                                    <td className="py-3 px-4">
                                      <span className={`px-2 py-1 rounded-full text-xs ${currency.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {currency.status ? 'Active' : 'Inactive'}
                                      </span>
                                    </td>
                                    <td className="py-3 px-4">
                                      {currency.is_default ? (
                                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                          Default
                                        </span>
                                      ) : (
                                        <button 
                                          className="text-blue-600 hover:underline text-sm"
                                          onClick={() => setDefaultCurrency(currency.id)}
                                        >
                                          Set Default
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="6" className="py-4 px-4 text-center text-gray-500">
                                    No currencies found
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
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
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cookie Text</label>
                            <textarea
                              name="cookie_text"
                              className="w-full p-2 border rounded-lg"
                              rows="4"
                              value={cookieSettings.cookie_text || ''}
                              onChange={handleCookieSettingsChange}
                            ></textarea>
                          </div>
                          <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                              <input 
                                type="checkbox" 
                                name="status"
                                className="mr-2" 
                                checked={cookieSettings.status}
                                onChange={handleCookieSettingsChange}
                              />
                              Enable Cookie Consent
                            </label>
                          </div>
                          <div className="flex justify-end gap-4">
                            <button 
                              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                              onClick={() => fetchCookieSettings()}
                            >
                              Reset
                            </button>
                            <button 
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                              onClick={updateCookieSettings}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Clean Database */}
                  {activeTab === 'database' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <Database className="w-5 h-5" />
                        Clean Database
                      </h2>
                      <div className="mb-4 text-red-600 bg-red-50 p-4 rounded-lg">
                        Warning: Cleaning database will permanently delete the respective data. Please proceed with caution!
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">Products</h3>
                              <p className="text-sm text-gray-500">Clean all products data</p>
                            </div>
                            <button 
                              className="px-3 py-1 border rounded-lg hover:bg-red-50 text-red-600 text-sm"
                              onClick={() => cleanDatabase('products')}
                            >
                              Clean
                            </button>
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">Product Reviews</h3>
                              <p className="text-sm text-gray-500">Clean all product reviews</p>
                            </div>
                            <button 
                              className="px-3 py-1 border rounded-lg hover:bg-red-50 text-red-600 text-sm"
                              onClick={() => cleanDatabase('product-reviews')}
                            >
                              Clean
                            </button>
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">Orders</h3>
                              <p className="text-sm text-gray-500">Clean all orders data</p>
                            </div>
                            <button 
                              className="px-3 py-1 border rounded-lg hover:bg-red-50 text-red-600 text-sm"
                              onClick={() => cleanDatabase('orders')}
                            >
                              Clean
                            </button>
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">Order History</h3>
                              <p className="text-sm text-gray-500">Clean all order history</p>
                            </div>
                            <button 
                              className="px-3 py-1 border rounded-lg hover:bg-red-50 text-red-600 text-sm"
                              onClick={() => cleanDatabase('order-history')}
                            >
                              Clean
                            </button>
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">Users</h3>
                              <p className="text-sm text-gray-500">Clean all users data</p>
                            </div>
                            <button 
                              className="px-3 py-1 border rounded-lg hover:bg-red-50 text-red-600 text-sm"
                              onClick={() => cleanDatabase('users')}
                            >
                              Clean
                            </button>
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">User Activity</h3>
                              <p className="text-sm text-gray-500">Clean user activity logs</p>
                            </div>
                            <button 
                              className="px-3 py-1 border rounded-lg hover:bg-red-50 text-red-600 text-sm"
                              onClick={() => cleanDatabase('user-activity')}
                            >
                              Clean
                            </button>
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">System Logs</h3>
                              <p className="text-sm text-gray-500">Clean system logs</p>
                            </div>
                            <button 
                              className="px-3 py-1 border rounded-lg hover:bg-red-50 text-red-600 text-sm"
                              onClick={() => cleanDatabase('system-logs')}
                            >
                              Clean
                            </button>
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">Cache</h3>
                              <p className="text-sm text-gray-500">Clean cache data</p>
                            </div>
                            <button 
                              className="px-3 py-1 border rounded-lg hover:bg-red-50 text-red-600 text-sm"
                              onClick={() => cleanDatabase('cache')}
                            >
                              Clean
                            </button>
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg hover:bg-red-50 col-span-1 md:col-span-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium text-red-700">All Data</h3>
                              <p className="text-sm text-red-600">Clean all system data (Dangerous)</p>
                            </div>
                            <button 
                              className="px-3 py-1 bg-red-600 rounded-lg hover:bg-red-700 text-white text-sm"
                              onClick={() => cleanDatabase('all')}
                            >
                              Clean All
                            </button>
                          </div>
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