import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';

const PrioritySection = ({ title, description, defaultSortText, isDefault, onToggle }) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-start">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
        </div>

        {/* Default Sorting Option */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Use Default Sorting List</h3>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>Currently sorting this section based on {defaultSortText}</span>
                </div>
              </div>
              <div className="ml-4">
                <button 
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${isDefault ? 'bg-blue-500' : 'bg-gray-200'}`}
                  onClick={() => onToggle(true)}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${isDefault ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Sorting Option */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Use Custom Sorting List</h3>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>You can sort this section by other ways</span>
                </div>
              </div>
              <div className="ml-4">
                <button 
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${!isDefault ? 'bg-blue-500' : 'bg-gray-200'}`}
                  onClick={() => onToggle(false)}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${!isDefault ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PrioritySetup = () => {
  const [priorities, setPriorities] = useState({
    brand: true,
    category: true,
    vendor: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch current priorities from backend
  useEffect(() => {
    const fetchPriorities = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.apiUrl}/get_priority`);
        setPriorities(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching priorities:', err);
        setError('Failed to load priorities');
        setLoading(false);
      }
    };
    
    fetchPriorities();
  }, []);

  const handleToggle = (field, value) => {
    setPriorities(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear any existing messages when settings are changed
    setSuccess('');
    setError('');
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      
      // Fix the endpoint - it was missing the correct path
      await axios.put(`${config.apiUrl}/update_priority`, priorities);
      
      // Show success message
      setSuccess('Settings saved successfully!');
      setSaving(false);
      
      // Automatically hide success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      console.error('Error saving priorities:', err);
      setError('Failed to save priorities');
      setSuccess('');
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <PrioritySection 
        title="Brand"
        description="Brands are lists of the specific products, organize by putting the newest ones at the top and arranging everything alphabetically."
        defaultSortText="latest add"
        isDefault={priorities.brand}
        onToggle={(value) => handleToggle('brand', value)}
      />
      
      <PrioritySection 
        title="Category"
        description="The category list groups similar products together arranged with the latest category first and in alphabetical order"
        defaultSortText="priority wise"
        isDefault={priorities.category}
        onToggle={(value) => handleToggle('category', value)}
      />
      
      <PrioritySection 
        title="Vendor List"
        description="The Vendor list arranges all vendors based on the latest join that are highly rated by customer choice and also in alphabetic order."
        defaultSortText="first created"
        isDefault={priorities.vendor}
        onToggle={(value) => handleToggle('vendor', value)}
      />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{success}</span>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end mt-4">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:bg-blue-300"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default PrioritySetup;