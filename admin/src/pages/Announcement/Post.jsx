import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const Post = () => {
  const [activeContent, setActiveContent] = useState(' ');

  const [status, setStatus] = useState('inactive');
  const [backgroundColor, setBackgroundColor] = useState('#ebebeb');
  const [textColor, setTextColor] = useState('#000000');
  const [announcementText, setAnnouncementText] = useState(
    'Get 50% discount for specific products from June 2024 to December2024.'
  );

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-sm">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-6">Announcement Setup</h2>

              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio w-4 h-4"
                      checked={status === 'active'}
                      onChange={() => setStatus('active')}
                    />
                    <span className="ml-2">Active</span>
                  </label>

                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio w-4 h-4"
                      checked={status === 'inactive'}
                      onChange={() => setStatus('inactive')}
                    />
                    <span className="ml-2">Inactive</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block mb-2 font-medium">Background Color</label>
                <div className="flex items-center space-x-4">
                  <div
                    className="w-16 h-16 border border-gray-300 rounded cursor-pointer"
                    style={{ backgroundColor }}
                    onClick={() => document.getElementById('bgColorPicker').click()}
                  />
                  <input
                    id="bgColorPicker"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="hidden"
                  />
                  <span className="text-sm font-mono">{backgroundColor}</span>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">Text Color</label>
                <div className="flex items-center space-x-4">
                  <div
                    className="w-16 h-16 border border-gray-300 rounded cursor-pointer"
                    style={{ backgroundColor: textColor }}
                    onClick={() => document.getElementById('textColorPicker').click()}
                  />
                  <input
                    id="textColorPicker"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="hidden"
                  />
                  <span className="text-sm font-mono">{textColor}</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block mb-2 font-medium">Text</label>
              <textarea
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>

            <div className="flex justify-end">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;