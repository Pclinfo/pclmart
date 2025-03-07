import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import config from '../../config';

const CustomerList = () => {
  const [activeContent, setActiveContent] = useState(' ');

  // Filter state
  const [orderDate, setOrderDate] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [limit, setLimit] = useState('100');

  // Customer data state
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCustomers, setTotalCustomers] = useState(0);

  // Fetch all customers on initial load
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Function to fetch all customers
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.apiUrl}/customer_list`);

      // Transform backend data to match frontend structure
      const transformedData = response.data.map((customer) => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.mobile_number,
        created_at: customer.created_at,
        totalOrders: customer.quantity || 0,
        isBlocked: false, // You might need to add this field in your backend
        avatar: '/api/placeholder/40/40'
      }));

      setCustomers(transformedData);
      setTotalCustomers(transformedData.length);
      setError(null);
    } catch (err) {
      setError('Failed to fetch customers: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to filter customers
  const filterCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${config.apiUrl}/filter_customer_list`, {
        searchTerm,
        orderDate,
        joiningDate,
        status,
        sortBy,
        limit: parseInt(limit) || 100
      });

      // Transform backend data to match frontend structure
      // Ensure each customer has a unique ID for React keys
      const transformedData = response.data.map((customer) => ({
        id: customer.id || Math.random().toString(36).substr(2, 9), // Fallback to random ID if none exists
        name: customer.name,
        email: customer.email,
        phone: customer.mobile_number,
        created_at: customer.created_at,
        totalOrders: customer.quantity || 0,
        isBlocked: customer.status === 'blocked', // Map status field properly
        avatar: '/api/placeholder/40/40'
      }));

      setCustomers(transformedData);
      setTotalCustomers(transformedData.length);
      setError(null);
    } catch (err) {
      setError('Failed to filter customers: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to reset filters
  const resetFilters = () => {
    setOrderDate('');
    setJoiningDate('');
    setStatus('');
    setSortBy('');
    setSearchTerm('');
    setLimit('100');
    fetchCustomers();
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="p-4 max-w-7xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-6">
                <h1 className="text-xl font-medium">Customer List</h1>
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                  {totalCustomers}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">Order Date</label>
                  <input
                    type="date"
                    className="border rounded-lg px-3 py-2"
                    value={orderDate}
                    onChange={(e) => setOrderDate(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">Customer Joining Date</label>
                  <input
                    type="date"
                    className="border rounded-lg px-3 py-2"
                    value={joiningDate}
                    onChange={(e) => setJoiningDate(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">Customer Status</label>
                  <select
                    className="border rounded-lg px-3 py-2"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Select status</option>
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">Sort By</label>
                  <select
                    className="border rounded-lg px-3 py-2"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="">Select Customer sorting order</option>
                    <option value="name">Name</option>
                    <option value="orders">Total Orders</option>
                    <option value="date">Join Date</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">Choose First</label>
                  <input
                    type="text"
                    placeholder="Ex: 100"
                    className="border rounded-lg px-3 py-2"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                  />
                </div>

                <div className="flex items-end gap-4">
                  <button
                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    onClick={resetFilters}
                  >
                    Reset
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    onClick={filterCustomers}
                  >
                    Filter
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
              <div className="relative flex-grow max-w-md">
                <input
                  type="text"
                  placeholder="Search by Name or Email or Mobile"
                  className="w-full border rounded-lg pl-4 pr-20 py-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && filterCustomers()}
                />
                <button
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded"
                  onClick={filterCustomers}
                >
                  Search
                </button>
              </div>

              <button className="whitespace-nowrap px-4 py-2 border border-blue-600 text-blue-600 rounded-lg flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Export
              </button>
            </div>

            {loading ? (
              <div className="text-center py-10">Loading customers...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-500">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[800px]">
                  <thead>
                    <tr className="border-b">
                      <th className="p-4 text-left">SL</th>
                      <th className="p-4 text-left">Customer Name</th>
                      <th className="p-4 text-left">Contact Info</th>
                      <th className="p-4 text-left">Joining Date</th>
                      <th className="p-4 text-left">Total Order</th>
                      <th className="p-4 text-left">Status</th>
                      <th className="p-4 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.length > 0 ? (
                      customers.map((customer, index) => (
                        <tr key={`customer-${customer.id}-${index}`} className="border-b">
                          <td className="p-4">{index + 1}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={customer.avatar}
                                alt={customer.name}
                                className="w-10 h-10 rounded-full"
                              />
                              <span>{customer.name}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="space-y-1">
                              <div>{customer.email}</div>
                              <div>{customer.phone}</div>
                            </div>
                          </td>
                          <td className="p-4">{customer.created_at || 'N/A'}</td>
                          <td className="p-4">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                              {customer.totalOrders}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                              <div
                                className={`w-6 h-6 rounded-full absolute transition-all ${!customer.isBlocked ? 'bg-blue-600 right-0' : 'bg-gray-400 left-0'
                                  }`}
                              />
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <button className="text-blue-600 hover:text-blue-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="p-4 text-center">No customers found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;