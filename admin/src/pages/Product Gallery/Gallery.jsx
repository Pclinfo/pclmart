import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const Gallery = () => {

  const [activeContent, setActiveContent] = useState(' ');
  const [selectedStore, setSelectedStore] = useState('All shop');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    {
      name: 'Edelbrock Cylinder Head',
      image: '/path/to/cylinder-head.jpg',
      brand: 'Keithston',
      category: 'Automotive',
      productType: 'Physical',
      unit: 'pc',
      currentStock: 80,
      sku: '8L9DX0',
      description: 'Upgrade your engine\'s performance with the Edelbrock Cylinder Head, engineered for efficiency. Specifications: - Material: Aluminum - Features: High flow design Standard Uses: Ideal for automotive performance builds.'
    },
    {
      name: 'Combo Trailer Light Set',
      image: '/path/to/trailer-light.jpg',
      brand: 'Electrical Charge',
      category: 'Automotive',
      productType: 'Physical',
      unit: 'pc',
      currentStock: 80,
      sku: '37W00U',
      description: 'Ensure safety on the road with our Combo Trailer Light Set, featuring bright and durable lights. Specifications: - Type: LED - Size: Standard trailer fit Standard Uses: Ideal for trailers and towing vehicles.'
    }
  ];

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
              <div className="bg-gray-200 rounded px-2 py-1 text-sm">172</div>
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

            <div className="space-y-6">
              {products.map((product, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-48">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto object-cover rounded"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-medium">{product.name}</h2>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
                          Use this product info
                        </button>
                      </div>

                      <div className="mb-4">
                        <h3 className="font-medium mb-2">General Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                          <div className="flex">
                            <span className="w-32 text-gray-600">Brand</span>
                            <span>: {product.brand}</span>
                          </div>
                          <div className="flex">
                            <span className="w-32 text-gray-600">Category</span>
                            <span>: {product.category}</span>
                          </div>
                          <div className="flex">
                            <span className="w-32 text-gray-600">Product Type</span>
                            <span>: {product.productType}</span>
                          </div>
                          <div className="flex">
                            <span className="w-32 text-gray-600">Product Unit</span>
                            <span>: {product.unit}</span>
                          </div>
                          <div className="flex">
                            <span className="w-32 text-gray-600">Current Stock</span>
                            <span>: {product.currentStock}</span>
                          </div>
                          <div className="flex">
                            <span className="w-32 text-gray-600">Product SKU</span>
                            <span>: {product.sku}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Description</h3>
                        <p className="text-gray-600">{product.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;