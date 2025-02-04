import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import {
  Package, PackagePlus, Banknote, Image, Search, ArrowLeft
} from 'lucide-react';
import config from '../config';

const ViewProduct = () => {
  const { pid } = useParams();
  const navigate = useNavigate();
  const [activeContent, setActiveContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productData, setProductData] = useState({
    product_name: '',
    product_description: '',
    product_category: '',
    sub_category: '',
    sub_sub_category: '',
    product_type: '',
    product_sku: '',
    unit: '',
    unit_price: '',
    minimum_order_qty: '',
    current_stock_qty: '',
    discount_type: '',
    discount_amount: '',
    tax_amount: '',
    tax_calculation: '',
    shipping_cost: '',
    shipping_cost_multiply: false,
    product_thumbnail: null,
    additional_images: null,
    meta_title: '',
    meta_description: ''
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(`${config.apiUrl}/product_detail/${pid}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }

        const data = await response.json();

        if (!data.products || !data.products.length) {
          throw new Error('No product data found');
        }

        setProductData(data.products[0]);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (pid) {
      fetchProductDetails();
    }
  }, [pid]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Product Details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl text-red-600 mb-4">Error Loading Product</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => navigate('/products/products-list')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Products List
          </button>
        </div>
      </div>
    );
  }

  const DisplayField = ({ label, value }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 p-2 bg-gray-50 rounded-sm">{value || 'N/A'}</div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="container mx-auto p-6">
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">Product Details</h1>
              <button
                onClick={() => navigate('/products/products-list')}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                <ArrowLeft className="mr-2" size={16} />
                Back to List
              </button>
            </div>

            {/* Product Information Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Package className="mr-2 text-blue-600" /> Product Information
              </h2>
              <DisplayField label="Product Name" value={productData.product_name} />
              <DisplayField label="Product Description" value={productData.product_description} />
            </div>

            {/* Product General Setup Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <PackagePlus className="mr-2 text-violet-600" /> Product General Setup
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <DisplayField label="Category" value={productData.product_category} />
                <DisplayField label="Sub Category" value={productData.sub_category} />
                <DisplayField label="Sub Sub Category" value={productData.sub_sub_category} />
                <DisplayField label="Product Type" value={productData.product_type} />
                <DisplayField label="Product SKU" value={productData.product_sku} />
                <DisplayField label="Product Unit" value={productData.unit} />
              </div>
            </div>

            {/* Pricing & Inventory Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Banknote className="mr-2 text-green-600" /> Pricing & Inventory
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <DisplayField label="Unit Price" value={`$${productData.unit_price}`} />
                <DisplayField label="Minimum Order Qty" value={productData.minimum_order_qty} />
                <DisplayField label="Current Stock Qty" value={productData.current_stock_qty} />
                <DisplayField label="Discount Type" value={productData.discount_type} />
                <DisplayField label="Discount Amount" value={productData.discount_amount} />
                <DisplayField label="Tax Amount" value={`${productData.tax_amount}%`} />
                <DisplayField label="Tax Calculation" value={productData.tax_calculation} />
                <DisplayField label="Shipping Cost" value={`$${productData.shipping_cost}`} />
                <DisplayField
                  label="Multiply Shipping Cost"
                  value={productData.shipping_cost_multiply ? 'Yes' : 'No'}
                />
              </div>
            </div>

            {/* Product Images Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Image className="mr-2 text-purple-600" /> Product Images
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {productData.product_thumbnail && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Product Thumbnail</h3>
                    <div className="w-48 h-48 border rounded-lg overflow-hidden">
                      <img
                        src={`${config.apiUrl}/${productData.product_thumbnail.replace('./', '')}`}
                        alt="Product Thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {productData.additional_images && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Additional Image</h3>
                    <div className="w-48 h-48 border rounded-lg overflow-hidden">
                      <img
                        src={`${config.apiUrl}/${productData.additional_images.replace('./', '')}`}
                        alt="Additional Product Image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* SEO Section */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Search className="mr-2 text-indigo-600" /> SEO Settings
              </h2>
              <DisplayField label="Meta Title" value={productData.meta_title} />
              <DisplayField label="Meta Description" value={productData.meta_description} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;