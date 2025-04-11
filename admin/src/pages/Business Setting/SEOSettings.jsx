import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import config from '../../config';

const SEOSettings = () => {
  const [activeTab, setActiveTab] = useState('webmaster');
  const [activeContent, setActiveContent] = useState(' ');
  const [formData, setFormData] = useState({
    id: null,
    googleConsole: '',
    bingWebmaster: '',
    baiduWebmaster: '',
    yandexWebmaster: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch SEO settings on component mount
  useEffect(() => {
    fetchSEOSettings();
  }, []);

  const fetchSEOSettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${config.apiUrl}/seo_settings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.id) {
          setFormData(data);
        }
      } else if (response.status !== 404) {
        // 404 is expected if no settings exist yet
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch SEO settings');
      }
    } catch (err) {
      setError('Network error while fetching SEO settings');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setError(null);
    
    try {
      // Determine if this is an update or create operation
      const method = formData.id ? 'PUT' : 'POST';
      
      const response = await fetch(`${config.apiUrl}/seo_settings`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(result.message);
        
        // If we just created a new record, fetch to get the ID
        if (!formData.id) {
          fetchSEOSettings();
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to save SEO settings');
      }
    } catch (err) {
      setError('Network error while saving SEO settings');
      console.error(err);
    }
  };

  const handleReset = () => {
    setFormData({
      id: formData.id, // Keep the ID for updates
      googleConsole: '',
      bingWebmaster: '',
      baiduWebmaster: '',
      yandexWebmaster: ''
    });
    setSuccessMessage('');
    setError(null);
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="max-w-7xl mx-auto p-4 bg-gray-50 min-h-screen">
            {/* Header with SEO icon */}
            <div className="flex items-center gap-2 mb-6">
              <div className="h-6 w-6 bg-purple-500 rounded-md flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-gray-800">SEO Settings</h1>
            </div>

            {/* Status Messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            {successMessage && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                {successMessage}
              </div>
            )}

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex overflow-x-auto hide-scrollbar">
                <button
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'webmaster' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                  onClick={() => setActiveTab('webmaster')}
                >
                  Webmaster Tools
                </button>
              </nav>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              /* Webmaster Tools Content */
              activeTab === 'webmaster' && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">Webmaster Tools</h2>
                    <p className="text-sm text-gray-600">
                      Optimize websites performance indexing status and search visibility.
                      <a href="#" className="text-blue-600 ml-1 hover:underline">Learn more.</a>
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Google Search Console */}
                    <div className="bg-white border border-gray-200 rounded-lg mb-6 p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex-shrink-0">
                          <img src="/images/google-logo.png" alt="Google" className="h-8 w-auto" />
                        </div>
                        <h3 className="font-medium text-gray-700">Google search console</h3>
                      </div>

                      <div className="mb-3">
                        <input
                          type="text"
                          name="googleConsole"
                          value={formData.googleConsole}
                          onChange={handleInputChange}
                          placeholder="Enter your HTML code or ID"
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>

                      <p className="text-xs text-gray-600 mb-2">
                        Google Console verification HTML code or ID.
                        <a href="#" className="text-blue-600 ml-1 hover:underline">
                          Learn how to get Search Console Verification Page
                        </a>
                      </p>

                      <div className="bg-green-50 border border-green-100 rounded p-2 text-xs text-green-500">
                        &lt;meta name="google-site-verification" content="your-id" /&gt;
                      </div>
                    </div>

                    {/* Bing Webmaster Tools */}
                    <div className="bg-white border border-gray-200 rounded-lg mb-6 p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex-shrink-0 text-teal-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-6 w-6 fill-current">
                            <path d="M3.741 6.252v18.059l8.183 3.219v-6.417L24 25.557l5.333-2.059V9.926l-10.074 4.391-7.335-3.472 16.243-6.693v6.99L3.741 6.252z" />
                          </svg>
                        </div>
                        <h3 className="font-medium text-gray-700">Bing Webmaster Tools</h3>
                      </div>

                      <div className="mb-3">
                        <input
                          type="text"
                          name="bingWebmaster"
                          value={formData.bingWebmaster}
                          onChange={handleInputChange}
                          placeholder="Enter your HTML code or ID"
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>

                      <p className="text-xs text-gray-600 mb-2">
                        Bing Webmaster Tools verification HTML code or ID.
                        <a href="#" className="text-blue-600 ml-1 hover:underline">
                          Learn how to get Search console verification page
                        </a>
                      </p>

                      <div className="bg-green-50 border border-green-100 rounded p-2 text-xs text-green-500">
                        &lt;meta name="msvalidate.01" content="your-id" /&gt;
                      </div>
                    </div>

                    {/* Baidu Webmaster Tool */}
                    <div className="bg-white border border-gray-200 rounded-lg mb-6 p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex-shrink-0 text-blue-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                            <path d="M8.8 19.4c0 1.6-1.6 2.9-3.4 2.9S2 21 2 19.4s1.6-2.9 3.4-2.9c1.9 0 3.4 1.3 3.4 2.9m2.2-8.5c0 1.8-1.4 3.2-3.2 3.2S4.6 12.7 4.6 11s1.4-3.2 3.2-3.2 3.2 1.4 3.2 3.2m2.9 5.5c-1.6 0-2.9 1.2-2.9 2.8 0 1.5 1.3 2.8 2.9 2.8s2.9-1.2 2.9-2.8c0-1.6-1.3-2.8-2.9-2.8m2.6-5.1c0 1.8-1.1 3.2-2.5 3.2s-2.5-1.4-2.5-3.2 1.1-3.2 2.5-3.2 2.5 1.4 2.5 3.2m2.9-4.7c1.6 0 2.9-1.1 2.9-2.5s-1.3-2.5-2.9-2.5-2.9 1.1-2.9 2.5 1.3 2.5 2.9 2.5m-4.4 10.5c-1.4 0-2.5.8-2.5 1.9 0 1 1.1 1.9 2.5 1.9s2.5-.8 2.5-1.9c0-1.1-1.1-1.9-2.5-1.9m3.8-3.2c1 0 1.8-.8 1.8-1.7 0-.9-.8-1.7-1.8-1.7s-1.8.8-1.8 1.7c0 .9.8 1.7 1.8 1.7M22 7c0-.7-.6-1.3-1.4-1.3-.8 0-1.4.6-1.4 1.3s.6 1.3 1.4 1.3c.8 0 1.4-.6 1.4-1.3" />
                          </svg>
                        </div>
                        <h3 className="font-medium text-gray-700">Baidu Webmaster Tool</h3>
                      </div>

                      <div className="mb-3">
                        <input
                          type="text"
                          name="baiduWebmaster"
                          value={formData.baiduWebmaster}
                          onChange={handleInputChange}
                          placeholder="Enter your HTML code or ID"
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>

                      <p className="text-xs text-gray-600 mb-2">
                        Baidu Webmaster Tools verification HTML code or ID.
                        <a href="#" className="text-blue-600 ml-1 hover:underline">
                          Learn how to get Search console verification page
                        </a>
                      </p>

                      <div className="bg-green-50 border border-green-100 rounded p-2 text-xs text-green-500">
                        &lt;meta name="baidu-site-verification" content="your-id" /&gt;
                      </div>
                    </div>

                    {/* Yandex Webmaster Tool */}
                    <div className="bg-white border border-gray-200 rounded-lg mb-6 p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex-shrink-0 text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                            <path d="M2.04 12c0-5.523 4.476-10 10-10 5.522 0 10 4.477 10 10s-4.478 10-10 10c-5.524 0-10-4.477-10-10zm10 6.25c3.631 0 6.57-2.937 6.57-6.56 0-3.623-2.939-6.56-6.57-6.56-3.629 0-6.569 2.937-6.569 6.56 0 3.623 2.94 6.56 6.569 6.56zm.75-11.064v8.329l3.967-4.164-3.967-4.165z" />
                          </svg>
                        </div>
                        <h3 className="font-medium text-gray-700">Yandex Webmaster Tool</h3>
                      </div>

                      <div className="mb-3">
                        <input
                          type="text"
                          name="yandexWebmaster"
                          value={formData.yandexWebmaster}
                          onChange={handleInputChange}
                          placeholder="Enter your HTML code or ID"
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>

                      <p className="text-xs text-gray-600 mb-2">
                        Yandex Webmaster Tools verification HTML code or ID.
                        <a href="#" className="text-blue-600 ml-1 hover:underline">
                          Learn how to get Search console verification page
                        </a>
                      </p>

                      <div className="bg-green-50 border border-green-100 rounded p-2 text-xs text-green-500">
                        &lt;meta name="yandex-verification" content="your-id" /&gt;
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                      >
                        Reset
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOSettings;