import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Pencil, Trash } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import config from '../../config';

const BusinessPages = () => {
  const [activeTab, setActiveTab] = useState('terms');
  const [isEnabled, setIsEnabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeContent, setActiveContent] = useState(' ');
  const [isLoading, setIsLoading] = useState(true);


  const [policyContents, setPolicyContents] = useState({
    terms: '',
    privacy: '',
    refund: '',
    return: '',
    cancellation: '',
    shipping: '',
    about: ''
  });

  const tabs = [
    { id: 'terms', label: 'Terms & Conditions' },
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'refund', label: 'Refund Policy' },
    { id: 'return', label: 'Return Policy' },
    { id: 'cancellation', label: 'Cancellation Policy' },
    { id: 'shipping', label: 'Shipping Policy' },
    { id: 'about', label: 'About Us' },
    { id: 'faq', label: 'FAQ' },
    { id: 'reliability', label: 'Company Reliability' }
  ];

  const features = [
    { id: 'delivery', title: 'Delivery info', value: 'Fast Delivery all across the country' },
    { id: 'payment', title: 'Safe payment', value: 'Safe Payment' },
    { id: 'return', title: 'Return policy', value: '7 Days Return Policy' },
    { id: 'authentic', title: 'Authentic product', value: '100% Authentic Products' }
  ];


  const updatePolicyContent = (policyId, content) => {
    setPolicyContents(prevContents => ({
      ...prevContents,
      [policyId]: content
    }));
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`${config.apiUrl}/terms&conditions/${activeTab}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          [activeTab]: policyContents[activeTab]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit policy');
      }

      const data = await response.json();
      showToast(data.message || 'Policy saved successfully', 'success');
    } catch (error) {
      showToast('Failed to save policy. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRichTextEdit = (action) => {
    const textarea = document.getElementById(`policyEditor-${activeTab}`);
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end);
    const selection = text.substring(start, end);

    let newText = text;
    if (action === 'bold') {
      newText = `${before}**${selection}**${after}`;
    } else if (action === 'italic') {
      newText = `${before}_${selection}_${after}`;
    } else if (action === 'underline') {
      newText = `${before}<u>${selection}</u>${after}`;
    }

    updatePolicyContent(activeTab, newText);
  };


  const fetchPolicyContent = async (policyId) => {
    try {
      const response = await fetch(`${config.apiUrl}/show_terms/${policyId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data[policyId] || '';
      }
      return '';
    } catch (error) {
      console.error(`Failed to fetch ${policyId} content:`, error);
      return '';
    }
  };


  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {

        const policyTabs = tabs
          .filter(tab => tab.id !== 'faq' && tab.id !== 'reliability')
          .map(tab => tab.id);

        const updatedContents = { ...policyContents };

        for (const policyId of policyTabs) {
          updatedContents[policyId] = await fetchPolicyContent(policyId);
        }

        setPolicyContents(updatedContents);
      } catch (error) {
        console.error('Failed to fetch policy contents:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Re-fetch content when active tab changes
  useEffect(() => {
    const fetchActiveTabContent = async () => {
      if (activeTab !== 'faq' && activeTab !== 'reliability') {
        setIsLoading(true);
        try {
          const content = await fetchPolicyContent(activeTab);
          updatePolicyContent(activeTab, content);
        } catch (error) {
          console.error(`Failed to fetch ${activeTab} content:`, error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchActiveTabContent();
  }, [activeTab]);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4">
              {/* Header */}
              <div className="py-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-blue-600 text-xl">📊</span>
                  <h1 className="text-xl font-semibold text-gray-800">Pages</h1>
                </div>

                {/* Tabs Navigation */}
                <div className="border-b border-gray-200 overflow-x-auto">
                  <nav className="flex gap-1 min-w-max">
                    {tabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap
                          ${activeTab === tab.id
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <>
                    {activeTab === 'reliability' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {features.map(feature => (
                          <div key={feature.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-sm font-medium text-gray-700">{feature.title}</h3>
                              <div className="relative inline-block w-12 h-6">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  checked={isEnabled}
                                  onChange={(e) => setIsEnabled(e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </div>
                            </div>
                            <input
                              type="text"
                              value={feature.value}
                              className="w-full p-2 border rounded"
                              onChange={(e) => {
                                // Handle feature value change
                              }}
                            />
                            <div className="mt-4 aspect-square border-2 border-dashed rounded-lg flex items-center justify-center">
                              <span className="text-gray-400">Upload Icon</span>
                            </div>
                            <button
                              className="w-full mt-4 bg-blue-600 text-white py-2 rounded"
                              onClick={handleSubmit}
                              disabled={isSubmitting || !isEnabled}
                            >
                              {isSubmitting ? 'Saving...' : 'SAVE'}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'faq' && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-lg font-medium">Help Topic Table</h2>
                          <button className="bg-blue-600 text-white px-4 py-2 rounded">
                            + Add FAQ
                          </button>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-4">SL</th>
                                <th className="text-left p-4">Question</th>
                                <th className="text-left p-4">Answer</th>
                                <th className="text-left p-4">Ranking</th>
                                <th className="text-left p-4">Status</th>
                                <th className="text-left p-4">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[1, 2, 3].map(i => (
                                <tr key={i} className="border-b">
                                  <td className="p-4">{i}</td>
                                  <td className="p-4">Sample Question {i}</td>
                                  <td className="p-4">Sample Answer {i}</td>
                                  <td className="p-4">{i}</td>
                                  <td className="p-4">
                                    <div className="relative inline-block w-12 h-6">
                                      <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={isEnabled}
                                        onChange={(e) => setIsEnabled(e.target.checked)}
                                      />
                                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </div>
                                  </td>
                                  <td className="p-4">
                                    <div className="flex gap-2">
                                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                                        <Pencil size={16} />
                                      </button>
                                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                                        <Trash size={16} />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Editor for each policy tab */}
                    {activeTab !== 'faq' && activeTab !== 'reliability' && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg font-medium capitalize">{activeTab.replace('-', ' ')}</h2>
                          <div className="relative inline-block w-12 h-6">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={isEnabled}
                              onChange={(e) => setIsEnabled(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </div>
                        </div>
                        <div className="border rounded-lg p-4">
                          <div className="flex gap-2 border-b pb-2 mb-4">
                            <button
                              className="p-2 hover:bg-gray-100 rounded font-semibold"
                              onClick={() => handleRichTextEdit('bold')}
                            >
                              B
                            </button>
                            <button
                              className="p-2 hover:bg-gray-100 rounded italic"
                              onClick={() => handleRichTextEdit('italic')}
                            >
                              I
                            </button>
                            <button
                              className="p-2 hover:bg-gray-100 rounded"
                              onClick={() => handleRichTextEdit('underline')}
                            >
                              U
                            </button>
                          </div>
                          <textarea
                            id={`policyEditor-${activeTab}`}
                            value={policyContents[activeTab] || ''}
                            onChange={(e) => updatePolicyContent(activeTab, e.target.value)}
                            className="w-full min-h-[300px] p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={`Enter ${tabs.find(tab => tab.id === activeTab)?.label || activeTab} content here...`}
                          />
                        </div>
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting || !isEnabled}
                          className={`w-full py-2 px-4 rounded-md text-white transition-colors ${isSubmitting || !isEnabled
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                          {isSubmitting ? 'Saving...' : 'Submit'}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-md shadow-lg ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}>
          {toast.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <p>{toast.message}</p>
        </div>
      )}
    </div>
  );
};

export default BusinessPages;