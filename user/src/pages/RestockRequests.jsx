import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import config from '../pages/config';

const RestockRequests = () => {
  const [restockRequests, setRestockRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newRequest, setNewRequest] = useState({
    product_name: '',
    selling_price: '',
    last_request_date: new Date().toISOString().split('T')[0],
    number_of_requests: 1
  });


  useEffect(() => {
    fetchRestockRequests();
  }, []);

  const fetchRestockRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.apiUrl}/get_request_stocks`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setRestockRequests(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching restock requests:', err);
      setError('Failed to load restock requests');
      setLoading(false);
    }
  };

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.apiUrl}/add_request_stocks`, newRequest, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });


      setNewRequest({
        product_name: '',
        selling_price: '',
        last_request_date: new Date().toISOString().split('T')[0],
        number_of_requests: 1
      });
      setShowModal(false);


      fetchRestockRequests();
    } catch (err) {
      console.error('Error creating restock request:', err);
      setError('Failed to create restock request');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest(prev => ({
      ...prev,
      [name]: name === 'selling_price' || name === 'number_of_requests' ?
        parseFloat(value) || value : value
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Restock Requests</h1>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Create Request
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : restockRequests.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-6 w-full">
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 mb-4 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    <path d="M9 12h6"></path>
                    <path d="M9 16h6"></path>
                    <path d="M9 8h6"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No Product Found In Restock Request!</h3>
                <p className="mt-2 text-sm text-gray-500">There are currently no products that need restocking.</p>
                <button
                  onClick={() => setShowModal(true)}
                  className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Create Request
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selling Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Request Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Requests</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {restockRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.product_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${parseFloat(request.selling_price).toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(request.last_request_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.number_of_requests}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Create Restock Request Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Create Restock Request</h2>
                <form onSubmit={handleCreateRequest}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product_name">
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="product_name"
                      name="product_name"
                      value={newRequest.product_name}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="selling_price">
                      Selling Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      id="selling_price"
                      name="selling_price"
                      value={newRequest.selling_price}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_request_date">
                      Request Date
                    </label>
                    <input
                      type="date"
                      id="last_request_date"
                      name="last_request_date"
                      value={newRequest.last_request_date}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number_of_requests">
                      Number of Requests
                    </label>
                    <input
                      type="number"
                      id="number_of_requests"
                      name="number_of_requests"
                      value={newRequest.number_of_requests}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      min="1"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default RestockRequests;