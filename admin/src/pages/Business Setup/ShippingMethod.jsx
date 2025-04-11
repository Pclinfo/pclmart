import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';

const ShippingMethod = () => {
  const [shippingType, setShippingType] = useState('inhouse');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');

  // Fetch shipping settings on component mount
  useEffect(() => {
    fetchShippingSettings();
  }, []);

  const fetchShippingSettings = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${config.apiUrl}/get_shipping_settings`);
      const data = response.data;
      
      setShippingType(data.shippingType);
      
      // If no categories returned, use default ones
      if (data.categories && data.categories.length > 0) {
        setCategories(data.categories.map(cat => ({
          ...cat,
          image: getCategoryEmoji(cat.name) // Add emoji based on category name
        })));
      } 
    } catch (error) {
      console.error('Error fetching shipping settings:', error);
      // Use default categories on error
      
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get emoji based on category name
  const getCategoryEmoji = (name) => {
    if (name.includes('Electronics')) return '🖥️';
    if (name.includes('Travel')) return '👜';
    if (name.includes('Books')) return '📚';
    if (name.includes('Groceries')) return '🛒';
    return '📦'; // Default emoji
  };

  const handleCostChange = (id, value) => {
    setCategories(categories.map(category => 
      category.id === id ? { ...category, cost: value } : category
    ));
  };

  const handleStatusChange = (id) => {
    setCategories(categories.map(category =>
      category.id === id ? { ...category, status: !category.status } : category
    ));
  };

  const saveShippingSettings = async () => {
    try {
      setSaveStatus('Saving...');
      
      // Check if any settings exist first
      const checkResponse = await axios.get(`${config.apiUrl}/get_shipping_settings`);
      
      let response;
      const payload = {
        shippingType,
        categories: categories.map(({ id, name, cost, status }) => ({ 
          id, name, cost, status 
        }))
      };
      
      if (checkResponse.data.categories && checkResponse.data.categories.length > 0) {
        // Update existing settings
        response = await axios.put(`${config.apiUrl}/update_shipping_settings`, payload);
      } else {
        // Create new settings
        response = await axios.post(`${config.apiUrl}/create_shipping_settings`, payload);
      }
      
      setSaveStatus('Settings saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Error saving shipping settings:', error);
      setSaveStatus('Error saving settings. Please try again.');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading shipping settings...</div>;
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
          <path d="M16 6l-4-4-4 4"/>
          <path d="M12 2v13"/>
        </svg>
        <h2 className="text-lg font-semibold">Shipping</h2>
      </div>

      {/* Shipping Settings */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Shipping Responsibility</h3>
          <div className="flex gap-4 p-3 border rounded-lg">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="shipping"
                value="inhouse"
                checked={shippingType === 'inhouse'}
                onChange={(e) => setShippingType(e.target.value)}
                className="hidden"
              />
              <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                shippingType === 'inhouse' ? 'border-blue-600' : 'border-gray-300'
              }`}>
                {shippingType === 'inhouse' && (
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                )}
              </span>
              <span>Inhouse Shipping</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="shipping"
                value="vendor"
                checked={shippingType === 'vendor'}
                onChange={(e) => setShippingType(e.target.value)}
                className="hidden"
              />
              <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                shippingType === 'vendor' ? 'border-blue-600' : 'border-gray-300'
              }`}>
                {shippingType === 'vendor' && (
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                )}
              </span>
              <span>Vendor Wise Shipping</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Shipping Method For In-House Deliver</h3>
          <select className="w-full p-3 border rounded-lg bg-white">
            <option>Category Wise</option>
          </select>
        </div>
      </div>

      {/* Category Wise Shipping Cost Table */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <h2 className="text-lg font-semibold">Category Wise Shipping Cost</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-4 text-left text-sm font-medium text-gray-600">SL</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Image</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Category Name</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Cost Per Product</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b">
                  <td className="p-4">{category.id}</td>
                  <td className="p-4">
                    <span className="text-2xl">{category.image}</span>
                  </td>
                  <td className="p-4">{category.name}</td>
                  <td className="p-4">
                    <input
                      type="number"
                      value={category.cost}
                      onChange={(e) => handleCostChange(category.id, parseFloat(e.target.value) || 0)}
                      className="w-32 p-2 border rounded"
                    />
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleStatusChange(category.id)}
                      className={`w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                        category.status ? 'bg-blue-600' : 'bg-gray-200'
                      } relative`}
                    >
                      <span 
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${
                          category.status ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end items-center gap-4">
        {saveStatus && (
          <span className={`text-sm ${saveStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {saveStatus}
          </span>
        )}
        <button 
          onClick={saveShippingSettings}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ShippingMethod;