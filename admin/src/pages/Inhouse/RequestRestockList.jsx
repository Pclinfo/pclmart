import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import config from '../../config';


const RequestRestockList = () => {
  const [filters, setFilters] = useState({
    date: '',
    category: '',
    subCategory: '',
    brand: ''
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchRestockRequests();
  }, []);


  const fetchRestockRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.apiUrl}/get_request_stocks`);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching restock requests:', err);
      setError('Failed to load restock requests. Please do it again.');
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this restock request?')) {
      try {
        await axios.delete(`${config.apiUrl}/delete_restock_request/${id}`);

        fetchRestockRequests();
      } catch (err) {
        console.error('Error deleting restock request:', err);
        setError('Failed to delete restock request. Please try again.');
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({
      date: '',
      category: '',
      subCategory: '',
      brand: ''
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      const filteredProducts = products.filter(product =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filteredProducts);
    } else {

      fetchRestockRequests();
    }
  };

  const handleShowData = () => {

    fetchRestockRequests();
    console.log("Applied filters:", filters);
  };

  const handleExport = () => {

    console.log("Exporting data...");

    const csvData = [

      ['SL', 'Product Name', 'Selling Price', 'Last Request Date', 'Number Of Request'],

      ...products.map((product, index) => [
        index + 1,
        product.product_name,
        product.selling_price,
        product.last_request_date,
        product.number_of_requests
      ])
    ];


    const csvString = csvData.map(row => row.join(',')).join('\n');


    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'restock_requests.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 p-4">
          {/* Header */}
          <div className="flex items-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white p-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7l8-4 8 4z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-800">Request Restock List</h1>
            </div>
            <div className="ml-2 bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs">
              {products.length}
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Filter Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Request Restock Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={filters.date}
                    onChange={handleFilterChange}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Select Date"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="groceries">Groceries</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sub Category
                </label>
                <select
                  name="subCategory"
                  value={filters.subCategory}
                  onChange={handleFilterChange}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Sub Category</option>
                  <option value="smartphones">Smartphones</option>
                  <option value="laptops">Laptops</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <select
                  name="brand"
                  value={filters.brand}
                  onChange={handleFilterChange}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select brand</option>
                  <option value="apple">Apple</option>
                  <option value="samsung">Samsung</option>
                  <option value="nike">Nike</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded"
              >
                Reset
              </button>
              <button
                onClick={handleShowData}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Show data
              </button>
            </div>
          </div>

          {/* Request List */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-medium">Request list</h2>
                <div className="bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs">
                  {products.length}
                </div>
              </div>
              <div className="flex space-x-2">
                <form onSubmit={handleSearch} className="flex">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by Product Name"
                    className="border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 px-4 py-2"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                  >
                    Search
                  </button>
                </form>
                <button
                  onClick={handleExport}
                  className="bg-white border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-50 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Export
                </button>
              </div>
            </div>

            {/* Display error message if any */}
            {error && (
              <div className="bg-red-50 text-red-600 p-4 mb-4 rounded-md">
                {error}
              </div>
            )}

            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SL
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Selling Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Request Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Number Of Request
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {!loading && products.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <div className="text-gray-300 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                          </div>
                          <p>No product found</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    !loading && products.map((product, index) => (
                      <tr key={product.id || index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.product_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.selling_price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.last_request_date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.number_of_requests}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => window.location.href = `/restock-requests/${product.id}`}
                          >
                            View
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800 ml-3"
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestRestockList;