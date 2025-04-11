import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import config from '../../config';

const ApprovedProducts = () => {
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      if (selectedBrand && selectedBrand !== 'All Brands') {
        params.append('brand', selectedBrand);
      }
      if (selectedCategory) {
        params.append('category', selectedCategory);
      }
      if (selectedSubCategory) {
        params.append('sub_category', selectedSubCategory);
      }
      if (selectedSubSubCategory) {
        params.append('sub_sub_category', selectedSubSubCategory);
      }
      if (searchTerm) {
        params.append('search', searchTerm);
      }

      for (const [key, value] of Object.entries(filters)) {
        params.append(key, value);
      }

      const response = await axios.get(`${config.apiUrl}/approved_products_list`, { params });

      if (response.data.status === 'success') {
        setProducts(response.data.products);
      } else {
        throw new Error(response.data.message || 'Failed to fetch products');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching products');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };


  const handleReset = () => {
    setSelectedBrand('All Brands');
    setSelectedCategory('');
    setSelectedSubCategory('');
    setSelectedSubCategory('');
    setSearchTerm('');
    fetchProducts({});
  };


  const toggleFeatureStatus = async (productId, currentStatus) => {
    try {

      await axios.patch(`${config.apiUrl}/products/${productId}/feature`, {
        is_featured: !currentStatus
      });


      setProducts(products.map(product =>
        product.PID === productId
          ? { ...product, is_featured: !currentStatus }
          : product
      ));
    } catch (err) {
      console.error('Failed to update feature status', err);
    }
  };


  const toggleActiveStatus = async (productId, currentStatus) => {
    try {

      await axios.patch(`${config.apiUrl}/products/${productId}/status`, {
        active_status: !currentStatus
      });


      setProducts(products.map(product =>
        product.PID === productId
          ? { ...product, active_status: !currentStatus }
          : product
      ));
    } catch (err) {
      console.error('Failed to update active status', err);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 px-4 py-6 md:px-6">
          {/* Header */}
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <h1 className="text-xl font-semibold ml-2">Vendor Product List</h1>
            </div>
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {products.length}
            </span>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h2 className="font-medium text-gray-700 mb-4">Filter Products</h2>
            <form onSubmit={handleFilterSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  >
                    <option>All Brands</option>
                    <option>Brand 1</option>
                    <option>Brand 2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Select category</option>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={selectedSubCategory}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                  >
                    <option value="">Select Sub Category</option>
                    <option value="sub1">Sub Category 1</option>
                    <option value="sub2">Sub Category 2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sub Sub Category</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={selectedSubSubCategory}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                  >
                    <option value="">Select Sub Sub Category</option>
                    <option value="subsub1">Sub Sub Category 1</option>
                    <option value="subsub2">Sub Sub Category 2</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Show data
                </button>
              </div>
            </form>
          </div>

          {/* Search and Export Section */}
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div className="flex w-full md:w-auto mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search by Product Name"
                className="border border-gray-300 rounded-l-md px-4 py-2 w-full md:w-64 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition"
                onClick={() => fetchProducts()}
              >
                Search
              </button>
            </div>
            <button className="bg-white border border-gray-300 rounded-md px-4 py-2 flex items-center justify-center hover:bg-gray-50 transition">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Export
            </button>
          </div>

          {/* Loading and Error States */}
          {loading && (
            <div className="bg-white rounded-lg shadow-sm p-8 mb-6 text-center">
              <p className="text-gray-600">Loading products...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-800 rounded-lg shadow-sm p-4 mb-6">
              <p>Error: {error}</p>
            </div>
          )}

          {/* Products Table */}
          {!loading && !error && (
            <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Show As Featured</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.length > 0 ? (
                    products.map((product, index) => (
                      <tr key={product.PID}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                           
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.product_name}</div>
                              {product.discount_amount > 0 && (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                  {product.discount_type === 'percentage' ? `${product.discount_amount}% Off` : `$${product.discount_amount} Off`}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-blue-600">{product.product_type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${parseFloat(product.unit_price).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <label className="inline-flex relative items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={product.is_featured}
                              onChange={() => toggleFeatureStatus(product.PID, product.is_featured)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <label className="inline-flex relative items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={product.active_status}
                              onChange={() => toggleActiveStatus(product.PID, product.active_status)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </td>
                        
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                        No products found. Try adjusting your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovedProducts;