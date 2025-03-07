import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const MediaGallery = () => {
  const [activeContent, setActiveContent] = useState(' ');



  const folders = [
    { id: 1, name: 'profile', count: 16 },
    { id: 2, name: 'company', count: 0 },
    { id: 3, name: 'product', count: 0 },
    { id: 4, name: 'payment_mo...', count: 0 },
    { id: 5, name: 'review', count: 0 },
    { id: 6, name: 'brand', count: 0 },
    { id: 7, name: 'delivery-m...', count: 0 },
    { id: 8, name: 'admin', count: 0 },
    { id: 9, name: 'sitemap', count: 0 },
    { id: 10, name: 'category', count: 0 },
    { id: 11, name: 'seller', count: 0 },
    { id: 12, name: 'notificati...', count: 0 }
  ];

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="max-w-7xl mx-auto p-4 space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xl">📁</span>
                <h1 className="text-xl font-semibold">File Manager</h1>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2">
                <span>+</span>
                Add New
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {/* Local Storage Section */}
              <div>
                <h2 className="text-blue-600 font-medium mb-4 border-b-2 border-blue-600 inline-block">
                  Local storage
                </h2>
              </div>

              {/* Public Files Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="font-medium">Public</h3>
                  <span className="bg-gray-100 text-xs px-2 py-1 rounded-full">16</span>
                </div>

                {/* Grid of Folders */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {folders.map((folder) => (
                    <div
                      key={folder.id}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center gap-2"
                    >
                      <svg
                        className="w-16 h-16 text-orange-400"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V6h5.17l2 2H20v10z" />
                      </svg>
                      <span className="text-sm text-center break-all">
                        {folder.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaGallery;