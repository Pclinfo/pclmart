import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const EmailTemplate = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English(EN)');
  const [orderInfoEnabled, setOrderInfoEnabled] = useState(true);
  const [activeContent, setActiveContent] = useState(' ');

  const languages = [
    { code: 'EN', name: 'English(EN)' },
    { code: 'SA', name: 'Arabic(SA)' },
    { code: 'BD', name: 'Bangla(BD)' },
    { code: 'IN', name: 'Hindi(IN)' }
  ];

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">Email Template</h1>
                <button className="px-4 py-2 bg-blue-600 text-white rounded">
                  Admin mail template
                </button>
              </div>

              <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Get Email On Order Received ?</span>
                  <div className="relative inline-block w-12 h-6">
                    <input type="checkbox" className="sr-only" checked={orderInfoEnabled}
                      onChange={() => setOrderInfoEnabled(!orderInfoEnabled)} />
                    <div className={`block w-12 h-6 rounded-full transition-colors duration-300 ease-in-out ${orderInfoEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${orderInfoEnabled ? 'transform translate-x-6' : ''}`}></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow">
                <div className="border-b p-4">
                  <h2 className="font-medium">Template UI</h2>
                </div>

                <div className="p-4">
                  <div className="flex flex-wrap gap-4 mb-6">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className={`px-4 py-2 rounded ${selectedLanguage === lang.name
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100'
                          }`}
                        onClick={() => setSelectedLanguage(lang.name)}
                      >
                        {lang.name}
                      </button>
                    ))}
                    <button className="px-4 py-2 bg-gray-100 rounded ml-auto">
                      Read instructions
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="block font-medium">Logo</label>
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          placeholder="Choose File"
                          className="flex-1 p-2 border rounded mr-2"
                          readOnly
                        />
                        <button className="px-4 py-2 bg-gray-100 rounded">
                          Browse
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block font-medium">Header content</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                        placeholder="New Order Received"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-medium">Mail Body (EN)</label>
                      <div className="border rounded">
                        <div className="border-b p-2 flex items-center gap-2 flex-wrap">
                          {['B', 'I', 'U', '⌘'].map((tool) => (
                            <button key={tool} className="p-1 hover:bg-gray-100 rounded">
                              {tool}
                            </button>
                          ))}
                        </div>
                        <textarea
                          className="w-full p-2 min-h-[200px] resize-none"
                          placeholder="Enter email body content..."
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded">
                      <span>Order Information</span>
                      <div className="relative inline-block w-12 h-6">
                        <input type="checkbox" className="sr-only" checked={true} readOnly />
                        <div className="block w-12 h-6 bg-blue-600 rounded-full"></div>
                        <div className="absolute left-7 top-1 bg-white w-4 h-4 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplate;