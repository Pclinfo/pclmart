import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import config from '../../config';

const ProductUpdateRequest = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${config.apiUrl}/get_update_product`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (searchQuery.trim() === '') {

        await fetchProducts();
      } else {
        const response = await fetch(`${config.apiUrl}/get_update_product`);
        const data = await response.json();

        const filteredProducts = data.filter(product =>
          product.product_name && product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setProducts(filteredProducts);
      }
    } catch (err) {
      console.error("Error searching products:", err);
      setError("Failed to search products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  const handleUpdate = (productId) => {

    console.log("Update product with ID:", productId);
 
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
              <h1 className="text-xl font-bold text-gray-800">Update Product</h1>
            </div>
          </div>

          {/* Product Table */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-medium">Product table</h2>
                <div className="bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs">
                  {products.length}
                </div>
              </div>
              <div className="flex">
                <form onSubmit={handleSearch} className="flex">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Product Name"
                    className="border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 px-4 py-2"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded mb-4">
                {error}
              </div>
            )}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
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
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unit Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Stock
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shipping Cost
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {!loading && products.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-16 text-center">
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
                      <tr key={product.pid || index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.new_data.product_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.new_data.product_category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.new_data.unit_price ? product.new_data.unit_price.toLocaleString() : '0.00'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.new_data.current_stock_qty}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.new_data.shipping_cost ? product.new_data.shipping_cost.toLocaleString() : '0.00'}
                          {product.shipping_cost_multiply ? ' (Multiply with Qty)' : ''}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                            onClick={() => handleUpdate(product.pid)}
                          >
                            Update
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

export default ProductUpdateRequest;