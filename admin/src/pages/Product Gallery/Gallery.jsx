import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import config from '../../config';

const Gallery = () => {
  const [activeContent, setActiveContent] = useState(' ');
  const [selectedStore, setSelectedStore] = useState('All shop');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${config.apiUrl}/admin_product_details`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        
        const data = await response.json();
        setProducts(data.products || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search query and selected filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.product_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedBrand === 'All Brands' || product.product_type === selectedBrand;
    const matchesCategory = selectedCategory === 'All Categories' || product.product_category === selectedCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  // Extract unique product types and categories for filter dropdowns
  const productTypes = Array.from(new Set(products.map(p => p.product_type))).filter(Boolean);
  const productCategories = Array.from(new Set(products.map(p => p.product_category))).filter(Boolean);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="max-w-7xl mx-auto p-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="text-xl font-medium">📝 Product gallery</div>
              <div className="bg-gray-200 rounded px-2 py-1 text-sm">{filteredProducts.length}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="relative">
                <label className="text-sm text-gray-600 mb-1 block">Store</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedStore}
                  onChange={(e) => setSelectedStore(e.target.value)}
                >
                  <option>All shop</option>
                </select>
              </div>

              <div className="relative">
                <label className="text-sm text-gray-600 mb-1 block">Brand</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option>All Brands</option>
                  {productTypes.map(type => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <label className="text-sm text-gray-600 mb-1 block">Category</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option>All Categories</option>
                  {productCategories.map(category => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <label className="text-sm text-gray-600 mb-1 block">Search</label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Search by product name"
                    className="flex-1 p-2 border rounded-l-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="bg-blue-600 text-white px-4 rounded-r-md">
                    Search
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <p>Loading products...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                <p>{error}</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-8">
                <p>No products found. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProducts.map((product) => (
                  <div key={product.pid} className="border rounded-lg p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-48 h-48 flex items-center justify-center bg-gray-100 rounded">
                        <img
                          src={`${config.apiUrl}/${product.product_thumbnail.replace(/\\/g, '/')}`}
                          alt={product.product_name}
                          className="max-w-full max-h-full object-contain rounded"
                          onError={(e) => {
                            e.target.src = '/path/to/placeholder.jpg';
                            e.target.onerror = null;
                          }}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <h2 className="text-xl font-medium">{product.product_name}</h2>
                          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
                            Use this product info
                          </button>
                        </div>

                        <div className="mb-4">
                          <h3 className="font-medium mb-2">General Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                            <div className="flex">
                              <span className="w-32 text-gray-600">Brand</span>
                              <span>: {product.product_type || 'N/A'}</span>
                            </div>
                            <div className="flex">
                              <span className="w-32 text-gray-600">Category</span>
                              <span>: {product.product_category || 'N/A'}</span>
                            </div>
                            <div className="flex">
                              <span className="w-32 text-gray-600">Sub Category</span>
                              <span>: {product.sub_category || 'N/A'}</span>
                            </div>
                            <div className="flex">
                              <span className="w-32 text-gray-600">Product Unit</span>
                              <span>: {product.unit || 'N/A'}</span>
                            </div>
                            <div className="flex">
                              <span className="w-32 text-gray-600">Current Stock</span>
                              <span>: {product.current_stock_qty || 0}</span>
                            </div>
                            <div className="flex">
                              <span className="w-32 text-gray-600">Product SKU</span>
                              <span>: {product.product_sku || 'N/A'}</span>
                            </div>
                            <div className="flex">
                              <span className="w-32 text-gray-600">Price</span>
                              <span>: ${parseFloat(product.unit_price).toLocaleString()}</span>
                            </div>
                            <div className="flex">
                              <span className="w-32 text-gray-600">Discount</span>
                              <span>: {product.discount_type} ${parseFloat(product.discount_amount).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Description</h3>
                          <p className="text-gray-600">{product.product_description || 'No description available.'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;