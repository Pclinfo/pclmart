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

  // State for software update
  const [formData, setFormData] = useState({
    username: '',
    purchaseCode: '',
    file: null,
    fileName: 'No file chosen'
  });
  const [softwareUpdates, setSoftwareUpdates] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

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
    } else if (activeTab === 'update') {
      fetchSoftwareUpdates();
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

  // const deleteLanguage = async (langId) => {
  //   try {
  //     const response = await axios.delete(`${config.apiUrl}/languages/${langId}`);
  //     // Backend returns a simple message string
  //     alert('Language deleted successfully');
  //     fetchLanguages();
  //   } catch (error) {
  //     console.error('Error deleting language:', error);
  //   }
  // };
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
      const response = await axios.put(`${config.apiUrl}/currencies/${currencyId}/set-default`);
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
      const response = await axios.get(`${config.apiUrl}/cookie-settings`);
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

  // Software Update Functions
  const fetchSoftwareUpdates = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/software_update`);
      if (response.data) {
        setSoftwareUpdates(response.data);
      }
    } catch (error) {
      console.error('Error fetching software updates:', error);
      setMessageType('error');
      setUploadMessage('Failed to fetch software updates');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.name.endsWith('.zip')) {
        setFormData({
          ...formData,
          file: file,
          fileName: file.name
        });
      } else {
        setMessageType('error');
        setUploadMessage('Only .zip files are allowed');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const uploadSoftwareUpdate = async () => {
    if (!formData.username || !formData.purchaseCode || !formData.file) {
      setMessageType('error');
      setUploadMessage('All fields are required');
      return;
    }

    const data = new FormData();
    data.append('username', formData.username);
    data.append('purchaseCode', formData.purchaseCode);
    data.append('file', formData.file);

    setIsUploading(true);
    setUploadMessage('');

    try {
      const response = await axios.post(`${config.apiUrl}/software_update`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setIsUploading(false);
      setMessageType('success');
      setUploadMessage('Software update uploaded successfully');

      // Reset form and refresh list
      setFormData({
        username: '',
        purchaseCode: '',
        file: null,
        fileName: 'No file chosen'
      });

      // Refresh the list of updates
      fetchSoftwareUpdates();

    } catch (error) {
      setIsUploading(false);
      setMessageType('error');
      setUploadMessage(error.response?.data?.message || 'Error uploading software update');
      console.error('Error uploading software update:', error);
    }
  };

  const deleteSoftwareUpdate = async () => {
    if (window.confirm('Are you sure you want to delete all software updates? This action cannot be undone.')) {
      try {
        const response = await axios.delete(`${config.apiUrl}/software_update`);
        setMessageType('success');
        setUploadMessage('Software updates deleted successfully');
        fetchSoftwareUpdates();
      } catch (error) {
        setMessageType('error');
        setUploadMessage(error.response?.data?.message || 'Error deleting software updates');
        console.error('Error deleting software updates:', error);
      }
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

  const resetUpdateForm = () => {
    setFormData({
      username: '',
      purchaseCode: '',
      file: null,
      fileName: 'No file chosen'
    });
    setUploadMessage('');
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
                                <path d="M17.076 11.769c-.017-1.595.637-3.192 2.125-4.269-1.125-1.575-2.853-2.137-4.354-2.479-1.425-.327-2.695.079-3.839.352-1.194.281-2.271.534-3.373.036-2.468-1.116-3.763.289-5.028 3.663-.359.957-.624 2.006-.708 3.241-.062.93.348 3.914 1.434 6.48.599 1.414 1.203 2.779 2.77 2.779 1.491 0 2.377-.793 3.737-.793 1.325 0 2.309.793 3.728.793 2.086 0 2.797-1.906 3.4-3.324.448-1.059.623-1.625 1.094-3.069-2.763-1.033-2.976-4.831-2.986-4.91zm-2.933-8.83c-1.826.122-3.408 1.311-3.958 2.857-.204.578-.39 1.409-.335 2.362 1.633.037 3.261-1.041 3.875-2.59.294-.743.471-1.58.418-2.629z" />
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

                      {uploadMessage && (
                        <div className={`mb-4 p-4 rounded-lg ${messageType === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                          }`}>
                          {uploadMessage}
                        </div>
                      )}

                      {/* Upload form */}
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Username
                            </label>
                            <input
                              type="text"
                              name="username"
                              className="w-full p-2 border rounded-lg"
                              value={formData.username}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Purchase Code
                            </label>
                            <input
                              type="text"
                              name="purchaseCode"
                              className="w-full p-2 border rounded-lg"
                              value={formData.purchaseCode}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Upload .zip File
                          </label>
                          <div className="flex items-center">
                            <label className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-700 rounded-l-lg hover:bg-gray-300">
                              <span>Browse</span>
                              <input
                                type="file"
                                accept=".zip"
                                className="hidden"
                                onChange={handleFileChange}
                              />
                            </label>
                            <span className="flex-1 p-2 border-t border-r border-b rounded-r-lg text-gray-500 truncate">
                              {formData.fileName}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-end gap-4">
                          <button
                            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                            onClick={resetUpdateForm}
                          >
                            Reset
                          </button>
                          <button
                            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 ${isUploading ? 'opacity-75 cursor-not-allowed' : ''
                              }`}
                            onClick={uploadSoftwareUpdate}
                            disabled={isUploading}
                          >
                            {isUploading ? (
                              <>
                                <span className="animate-spin">
                                  <RefreshCw className="w-4 h-4" />
                                </span>
                                <span>Uploading...</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-4 h-4" />
                                <span>Upload</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="mt-10">
                        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                          <Download className="w-5 h-5" />
                          Software Update History
                        </h3>

                        {softwareUpdates.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="min-w-full border rounded-lg">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Username
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Purchase Code
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    File Path
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Uploaded At
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {softwareUpdates.map((update, index) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                      {update.username}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                      {update.purchase_code}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                      {update.file_path}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                      {update.uploaded_at}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="text-center py-8 border rounded-lg bg-gray-50">
                            <p className="text-gray-500">No software updates found</p>
                          </div>
                        )}

                        <div className="mt-4 flex justify-end">
                          <button
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                            onClick={deleteSoftwareUpdate}
                          >
                            <span>Delete All Updates</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}


                  {/* Language Settings */}
                  {activeTab === 'language' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <Globe className="w-5 h-5" />
                        Language Management
                      </h2>

                      {/* Add New Language Form */}
                      <div className="mb-8 border-b pb-6">
                        <h3 className="font-medium mb-4">Add New Language</h3>
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Language Name</label>
                              <input
                                type="text"
                                name="name"
                                className="w-full p-2 border rounded-lg"
                                value={newLanguage.name}
                                onChange={handleNewLanguageChange}
                                placeholder="English"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Language Code</label>
                              <input
                                type="text"
                                name="code"
                                className="w-full p-2 border rounded-lg"
                                value={newLanguage.code}
                                onChange={handleNewLanguageChange}
                                placeholder="en"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-8">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="langStatus"
                                name="status"
                                className="w-4 h-4 text-blue-600 rounded"
                                checked={newLanguage.status}
                                onChange={handleNewLanguageChange}
                              />
                              <label htmlFor="langStatus" className="ml-2 text-sm text-gray-700">Active</label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="langDefault"
                                name="is_default"
                                className="w-4 h-4 text-blue-600 rounded"
                                checked={newLanguage.is_default}
                                onChange={handleNewLanguageChange}
                              />
                              <label htmlFor="langDefault" className="ml-2 text-sm text-gray-700">Set as Default</label>
                            </div>
                          </div>
                          <div className="flex justify-end gap-4">
                            <button
                              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                              onClick={resetLanguageForm}
                            >
                              Reset
                            </button>
                            <button
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                              onClick={addLanguage}
                            >
                              Add Language
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Language List */}
                      <h3 className="font-medium mb-4">Available Languages</h3>
                      {languages.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="min-w-full border rounded-lg">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
                                {/* <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> */}
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {languages.map((language) => (
                                <tr key={language.id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{language.name}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{language.code}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 py-1 text-xs rounded-full ${language.status ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                      }`}>
                                      {language.status ? 'Active' : 'Inactive'}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {language.is_default ? (
                                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Default</span>
                                    ) : (
                                      <button
                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                        onClick={() => updateLanguage(language.id, { ...language, is_default: true })}
                                      >
                                        Set as Default
                                      </button>
                                    )}
                                  </td>
                                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-right"> */}
                                    {/* <button
                                      className="text-blue-600 hover:text-blue-800 mr-3"
                                      onClick={() => {
                                        // Edit implementation would go here
                                        updateLanguage(language.id, { ...language});
                                      }}
                                    >
                                      Edit
                                    </button> */}
                                    {/* <button
                                      onClick={() => {
                                        if (!language.is_default && window.confirm(`Are you sure you want to delete ${language.name}?`)) {
                                          deleteLanguage(language.id);
                                        }
                                      }}
                                    >
                                      Delete
                                    </button> */}
                                  {/* </td> */}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="text-center py-8 border rounded-lg bg-gray-50">
                          <p className="text-gray-500">No languages added yet</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Currency Settings */}
                  {activeTab === 'currency' && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        Currency Management
                      </h2>

                      {/* Add New Currency Form */}
                      <div className="mb-8 border-b pb-6">
                        <h3 className="font-medium mb-4">Add New Currency</h3>
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Currency Name</label>
                              <input
                                type="text"
                                name="name"
                                className="w-full p-2 border rounded-lg"
                                value={newCurrency.name}
                                onChange={handleNewCurrencyChange}
                                placeholder="US Dollar"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Currency Code</label>
                              <input
                                type="text"
                                name="code"
                                className="w-full p-2 border rounded-lg"
                                value={newCurrency.code}
                                onChange={handleNewCurrencyChange}
                                placeholder="USD"
                              />
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Currency Symbol</label>
                              <input
                                type="text"
                                name="symbol"
                                className="w-full p-2 border rounded-lg"
                                value={newCurrency.symbol}
                                onChange={handleNewCurrencyChange}
                                placeholder="$"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Exchange Rate (to USD)</label>
                              <input
                                type="number"
                                name="exchange_rate"
                                step="0.01"
                                min="0"
                                className="w-full p-2 border rounded-lg"
                                value={newCurrency.exchange_rate}
                                onChange={handleNewCurrencyChange}
                                placeholder="1.00"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-8">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="currStatus"
                                name="status"
                                className="w-4 h-4 text-blue-600 rounded"
                                checked={newCurrency.status}
                                onChange={handleNewCurrencyChange}
                              />
                              <label htmlFor="currStatus" className="ml-2 text-sm text-gray-700">Active</label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="currDefault"
                                name="is_default"
                                className="w-4 h-4 text-blue-600 rounded"
                                checked={newCurrency.is_default}
                                onChange={handleNewCurrencyChange}
                              />
                              <label htmlFor="currDefault" className="ml-2 text-sm text-gray-700">Set as Default</label>
                            </div>
                          </div>
                          <div className="flex justify-end gap-4">
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
                              Add Currency
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Currency List */}
                      <h3 className="font-medium mb-4">Available Currencies</h3>
                      {currencies.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="min-w-full border rounded-lg">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exchange Rate</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
                                {/* <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> */}
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {currencies.map((currency) => (
                                <tr key={currency.id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{currency.name}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{currency.code}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{currency.symbol}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{currency.exchange_rate}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 py-1 text-xs rounded-full ${currency.status ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                      }`}>
                                      {currency.status ? 'Active' : 'Inactive'}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {currency.is_default ? (
                                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Default</span>
                                    ) : (
                                      <button
                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                        onClick={() => setDefaultCurrency(currency.id)}
                                      >
                                        Set as Default
                                      </button>
                                    )}
                                  </td>
                                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                                    <button
                                      className="text-blue-600 hover:text-blue-800 mr-3"
                                      onClick={() => {
                                        // Edit implementation would go here
                                        alert(`Edit currency ${currency.name}`);
                                      }}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className={`${currency.is_default ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:text-red-800'}`}
                                      disabled={currency.is_default}
                                      onClick={() => {
                                        if (!currency.is_default && window.confirm(`Are you sure you want to delete ${currency.name}?`)) {
                                          // Delete implementation would go here
                                          alert(`Delete currency ${currency.name}`);
                                        }
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </td> */}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="text-center py-8 border rounded-lg bg-gray-50">
                          <p className="text-gray-500">No currencies added yet</p>
                        </div>
                      )}
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
                          <label className="block text-sm font-medium text-gray-700 mb-1">Cookie Consent Text</label>
                          <textarea
                            name="cookie_text"
                            rows="6"
                            className="w-full p-2 border rounded-lg"
                            value={cookieSettings.cookie_text || ''}
                            onChange={handleCookieSettingsChange}
                            placeholder="We use cookies to improve your experience. By using our site, you consent to our use of cookies."
                          ></textarea>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="cookieStatus"
                            name="status"
                            className="w-4 h-4 text-blue-600 rounded"
                            checked={cookieSettings.status}
                            onChange={handleCookieSettingsChange}
                          />
                          <label htmlFor="cookieStatus" className="ml-2 text-sm text-gray-700">Enable Cookie Consent</label>
                        </div>

                        <div className="flex justify-end gap-4">
                          <button
                            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                            onClick={fetchCookieSettings}
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
                              aria-label="Clean all system data"
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
