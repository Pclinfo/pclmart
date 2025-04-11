import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import config from '../../config';

const PaymentMethods = () => {
  const [activeTab, setActiveTab] = useState('digital');
  const [activeStatus, setActiveStatus] = useState('all');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeContent, setActiveContent] = useState(' ');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'offline',
    status: true,
    access_token: '',
    public_key: '',
    private_key: '',
    gateway_title: '',
    logo: '',
    mode: 'live',
    payment_info: '',
    required_info: []
  });
  const [requiredInfoInput, setRequiredInfoInput] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${config.apiUrl}/payment_methods_handler`);
      if (!response.ok) {
        throw new Error('Failed to fetch payment methods');
      }
      const data = await response.json();
      setPaymentMethods(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      setMessage({ text: 'Failed to load payment methods', type: 'error' });
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleRequiredInfoChange = (e) => {
    setRequiredInfoInput(e.target.value);
  };

  const handleFileChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${config.apiUrl}/payment_methods_handler`;
      const method = isEditing ? 'PUT' : 'POST';
      
      // Create FormData object for multipart/form-data submission
      const formDataToSubmit = new FormData();
      
      // Add basic form fields
      Object.keys(formData).forEach(key => {
        if (key !== 'logo' && key !== 'required_info') {
          if (key === 'status') {
            formDataToSubmit.append(key, formData[key].toString());
          } else if (formData[key] !== null && formData[key] !== undefined) {
            formDataToSubmit.append(key, formData[key]);
          }
        }
      });
      
      // Add logo file if selected
      if (logoFile) {
        formDataToSubmit.append('logo', logoFile);
      }
      
      // If editing, add the existing logo path
      if (isEditing && formData.logo && !logoFile) {
        formDataToSubmit.append('existing_logo', formData.logo);
      }
      
      // Add ID if editing
      if (isEditing && formData.id) {
        formDataToSubmit.append('id', formData.id);
      }
      
      // Process required_info from string to array of items
      if (requiredInfoInput.trim()) {
        const requiredInfoArray = requiredInfoInput.split(',').map(item => item.trim());
        // Add each required_info item separately to allow Flask to handle it as a list
        requiredInfoArray.forEach(item => {
          formDataToSubmit.append('required_info', item);
        });
      }

      const response = await fetch(url, {
        method,
        // Don't set Content-Type header - browser will set it automatically with the boundary
        body: formDataToSubmit
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${isEditing ? 'update' : 'create'} payment method`);
      }

      const responseData = await response.json();
      setMessage({ 
        text: responseData.message || `Payment method ${isEditing ? 'updated' : 'created'} successfully!`, 
        type: 'success' 
      });
      
      // Reset form data
      setShowAddModal(false);
      setFormData({
        name: '',
        type: 'offline',
        status: true,
        access_token: '',
        public_key: '',
        private_key: '',
        gateway_title: '',
        logo: '',
        mode: 'live',
        payment_info: '',
        required_info: []
      });
      setRequiredInfoInput('');
      setLogoFile(null);
      setIsEditing(false);
      
      // Refresh payment methods list
      fetchPaymentMethods();
    } catch (error) {
      console.error('Error saving payment method:', error);
      setMessage({ 
        text: error.message || `Failed to ${isEditing ? 'update' : 'create'} payment method`, 
        type: 'error' 
      });
    }
  };

  const handleEdit = (method) => {
    setIsEditing(true);
    setFormData({
      ...method
    });
    
    // Set the required_info string for the input field
    setRequiredInfoInput(Array.isArray(method.required_info) 
      ? method.required_info.join(', ') 
      : '');
    
    // Reset logo file since we're using existing logo
    setLogoFile(null);
    
    setShowAddModal(true);
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const methodToUpdate = paymentMethods.find(method => method.id === id);
      if (!methodToUpdate) return;

      // Create FormData for the PUT request
      const formDataToSubmit = new FormData();
      
      // Add all existing fields
      Object.keys(methodToUpdate).forEach(key => {
        if (key !== 'logo' && key !== 'required_info') {
          if (key === 'status') {
            // Toggle the status
            formDataToSubmit.append(key, (!currentStatus).toString());
          } else if (methodToUpdate[key] !== null && methodToUpdate[key] !== undefined) {
            formDataToSubmit.append(key, methodToUpdate[key]);
          }
        }
      });
      
      // Add existing logo if present
      if (methodToUpdate.logo) {
        formDataToSubmit.append('existing_logo', methodToUpdate.logo);
      }
      
      // Add required_info items
      if (Array.isArray(methodToUpdate.required_info)) {
        methodToUpdate.required_info.forEach(item => {
          formDataToSubmit.append('required_info', item);
        });
      }

      const response = await fetch(`${config.apiUrl}/payment_methods_handler`, {
        method: 'PUT',
        body: formDataToSubmit
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Update local state
      setPaymentMethods(paymentMethods.map(method => 
        method.id === id ? { ...method, status: !currentStatus } : method
      ));

      setMessage({ text: 'Status updated successfully!', type: 'success' });
    } catch (error) {
      console.error('Error updating status:', error);
      setMessage({ text: 'Failed to update status', type: 'error' });
    }
  };

  const filteredMethods = paymentMethods.filter(method => {
    // Filter by type
    if (method.type !== (activeTab === 'digital' ? 'digital' : 'offline')) return false;
    
    // Filter by status
    if (activeStatus === 'active' && !method.status) return false;
    if (activeStatus === 'inactive' && method.status) return false;
    
    // Filter by search query
    if (searchQuery && !method.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });

  const digitalMethods = paymentMethods.filter(method => method.type === 'digital');
  const offlineMethods = paymentMethods.filter(method => method.type === 'offline');

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="min-h-screen bg-gray-50">
            <div className="p-4 lg:p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xl">🏢</span>
                <h1 className="text-xl font-semibold">Payment Methods</h1>
              </div>

              {/* Message Alert */}
              {message.text && (
                <div className={`mb-4 p-3 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {message.text}
                  <button 
                    className="float-right"
                    onClick={() => setMessage({ text: '', type: '' })}
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Payment Method Tabs */}
              <div className="mb-6">
                <nav className="flex gap-4 border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('digital')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors
                    ${activeTab === 'digital'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    Digital Payment Methods
                  </button>
                  <button
                    onClick={() => setActiveTab('offline')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors
                    ${activeTab === 'offline'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    Offline Payment Methods
                  </button>
                </nav>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : activeTab === 'digital' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {digitalMethods.length > 0 ? (
                    digitalMethods.map(method => (
                      <div key={method.id} className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="font-medium">{method.name?.toUpperCase()}</h2>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={method.status}
                              onChange={() => toggleStatus(method.id, method.status)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <select 
                              className="w-full p-2 border border-gray-300 rounded-md"
                              value={method.mode}
                              disabled
                            >
                              <option value="live">Live</option>
                              <option value="test">Test</option>
                            </select>
                          </div>
                          
                          {method.access_token && (
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Access Token *</label>
                              <input 
                                type="text" 
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={method.access_token} 
                                disabled 
                              />
                            </div>
                          )}
                          
                          {method.public_key && (
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Public Key *</label>
                              <input 
                                type="text" 
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={method.public_key} 
                                disabled 
                              />
                            </div>
                          )}
                          
                          {method.private_key && (
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Private Key *</label>
                              <input 
                                type="text" 
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={method.private_key} 
                                disabled 
                              />
                            </div>
                          )}
                          
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Payment Gateway Title *</label>
                            <input 
                              type="text" 
                              className="w-full p-2 border border-gray-300 rounded-md"
                              value={method.gateway_title} 
                              disabled 
                            />
                          </div>
                          
                          <div className="flex justify-end">
                            <button 
                              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                              onClick={() => handleEdit(method)}
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 bg-white rounded-lg shadow-sm p-6 text-center">
                      <p className="text-gray-500">No digital payment methods found</p>
                      <button 
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            ...formData,
                            type: 'digital'
                          });
                          setRequiredInfoInput('');
                          setLogoFile(null);
                          setShowAddModal(true);
                        }}
                      >
                        Add Digital Payment Method
                      </button>
                    </div>
                  )}

                  {/* Add New Digital Payment Method Button */}
                  {digitalMethods.length > 0 && (
                    <div className="col-span-2 flex justify-center mt-4">
                      <button 
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            ...formData,
                            type: 'digital'
                          });
                          setRequiredInfoInput('');
                          setLogoFile(null);
                          setShowAddModal(true);
                        }}
                      >
                        + Add New Digital Method
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm">
                  {/* Status Tabs */}
                  <div className="p-4 border-b border-gray-200">
                    <nav className="flex gap-4">
                      {['all', 'active', 'inactive'].map((status) => (
                        <button
                          key={status}
                          onClick={() => setActiveStatus(status)}
                          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
                          ${activeStatus === status
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Search and Add New */}
                  <div className="p-4 flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        placeholder="Search by payment method name"
                        className="flex-1 p-2 border border-gray-300 rounded-md"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button 
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={() => {/* Search is handled by filter */}}
                      >
                        Search
                      </button>
                    </div>
                    <button 
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          ...formData,
                          type: 'offline'
                        });
                        setRequiredInfoInput('');
                        setLogoFile(null);
                        setShowAddModal(true);
                      }}
                    >
                      + Add New Method
                    </button>
                  </div>

                  {/* Payment Methods Table */}
                  <div className="overflow-x-auto">
                    {filteredMethods.length > 0 ? (
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Payment Method Name</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Payment Info</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Required Info From Customer</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {filteredMethods.map((method) => (
                            <tr key={method.id}>
                              <td className="px-4 py-3 text-sm text-gray-600">{method.id}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{method.name}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{method.payment_info}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {Array.isArray(method.required_info) 
                                  ? method.required_info.join(', ')
                                  : ''}
                              </td>
                              <td className="px-4 py-3">
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={method.status}
                                    onChange={() => toggleStatus(method.id, method.status)}
                                    className="sr-only peer"
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex gap-2">
                                  <button 
                                    className="p-1 text-blue-500 hover:text-blue-600"
                                    onClick={() => handleEdit(method)}
                                  >
                                    <span className="text-lg">✏️</span>
                                  </button>
                                  {/* Delete button functionality could be added here */}
                                  <button className="p-1 text-red-500 hover:text-red-600">
                                    <span className="text-lg">🗑️</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="p-6 text-center text-gray-500">
                        No payment methods found matching your criteria
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Payment Method Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {isEditing ? 'Edit Payment Method' : 'Add New Payment Method'}
              </h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Payment Method Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="digital">Digital</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Gateway Title *</label>
                  <input
                    type="text"
                    name="gateway_title"
                    value={formData.gateway_title}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Mode</label>
                  <select
                    name="mode"
                    value={formData.mode}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="live">Live</option>
                    <option value="test">Test</option>
                  </select>
                </div>

                {formData.type === 'digital' && (
                  <>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Access Token</label>
                      <input
                        type="text"
                        name="access_token"
                        value={formData.access_token || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Public Key</label>
                      <input
                        type="text"
                        name="public_key"
                        value={formData.public_key || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Private Key</label>
                      <input
                        type="text"
                        name="private_key"
                        value={formData.private_key || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </>
                )}

                {formData.type === 'offline' && (
                  <>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-600 mb-1">Payment Info</label>
                      <textarea
                        name="payment_info"
                        value={formData.payment_info || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows="3"
                        placeholder="e.g. Bank Name: XYZ Bank, Account Number: 1234567890"
                      ></textarea>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-600 mb-1">Required Info From Customer</label>
                      <textarea
                        name="required_info_input"
                        value={requiredInfoInput}
                        onChange={handleRequiredInfoChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows="3"
                        placeholder="e.g. Transaction ID, Mobile Number, Date (comma separated)"
                      ></textarea>
                      <small className="text-gray-500">Separate with commas</small>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Logo</label>
                  <input
                    type="file"
                    name="logo"
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {isEditing && formData.logo && (
                    <small className="text-gray-500">
                      Current logo: {formData.logo.split('/').pop()}
                    </small>
                  )}
                </div>
                
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="status"
                      checked={formData.status}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-700">Active</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {isEditing ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;