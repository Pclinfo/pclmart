import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import {
  Package, PackagePlus, Banknote, Image, Search, Save, X, RefreshCw
} from 'lucide-react';
import config from '../config';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';

const EditProduct = () => {
  const { pid } = useParams();
  const navigate = useNavigate();
  const [activeContent, setActiveContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [additionalImagePreview, setAdditionalImagePreview] = useState(null);

  const [formData, setFormData] = useState({
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
    additional_images: [],
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

        const productData = data.products[0];

        setFormData({
          product_name: productData.product_name || '',
          product_description: productData.product_description || '',
          product_category: productData.product_category || '',
          sub_category: productData.sub_category || '',
          sub_sub_category: productData.sub_sub_category || '',
          product_type: productData.product_type || '',
          product_sku: productData.product_sku || '',
          unit: productData.unit || '',
          unit_price: productData.unit_price || '',
          minimum_order_qty: productData.minimum_order_qty || '',
          current_stock_qty: productData.current_stock_qty || '',
          discount_type: productData.discount_type || '',
          discount_amount: productData.discount_amount || '',
          tax_amount: productData.tax_amount || '',
          tax_calculation: productData.tax_calculation || '',
          shipping_cost: productData.shipping_cost || '',
          shipping_cost_multiply: productData.shipping_cost_multiply || false,
          meta_title: productData.meta_title || '',
          meta_description: productData.meta_description || ''
        });

        if (productData.product_thumbnail) {
          setThumbnailPreview(`${config.apiUrl}/${productData.product_thumbnail.replace('./', '')}`);
        }
        if (productData.additional_images) {
          setAdditionalImagePreview(`${config.apiUrl}/${productData.additional_images.replace('./', '')}`);
        }

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = (event, setPreview) => {
    const file = event.target.files[0];

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size should not exceed 2MB');
        return;
      }

      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image (jpg, png, or webp)');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      const fieldName = event.target.name === 'product_thumbnail' ? 'product_thumbnail' : 'additional_images';
      setFormData(prev => ({
        ...prev,
        [fieldName]: fieldName === 'product_thumbnail' ? file : [file]
      }));
    }
  };

  const clearPreview = (setPreview, fieldName) => {
    setPreview(null);
    setFormData(prev => ({
      ...prev,
      [fieldName]: null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && !(value instanceof File) && !Array.isArray(value)) {
          formDataToSend.append(key, value);
        }
      });

      if (formData.product_thumbnail instanceof File) {
        formDataToSend.append('product_thumbnail', formData.product_thumbnail);
      }

      if (Array.isArray(formData.additional_images)) {
        formData.additional_images.forEach((file) => {
          if (file instanceof File) {
            formDataToSend.append('additional_images', file);
          }
        });
      }

      const response = await fetch(`${config.apiUrl}/edit-product/${pid}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const result = await response.json();
      alert('Product updated successfully');
      navigate('/products/products-list');
    } catch (err) {
      console.error('Error updating product:', err);
      alert(err.message || 'Failed to update product');
    }
  };

  const handleReset = () => {
    setFormData({
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
      additional_images: [],
      meta_title: '',
      meta_description: ''
    });
    setThumbnailPreview(null);
    setAdditionalImagePreview(null);
  };

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
          <h2 className="text-2xl text-red-600 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="container mx-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Information Section */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Package className="mr-2 text-blue-600" /> Product Information
                </h2>

                <div className="grid md:grid-rows-2 gap-4">
                  <div>
                    <label className="block text-md font-medium text-gray-700">Product Name</label>
                    <input
                      type="text"
                      name="product_name"
                      value={formData.product_name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-md font-medium text-gray-700">Product Description</label>
                    <textarea
                      name="product_description"
                      value={formData.product_description}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50"
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Product General Setup Section */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <PackagePlus className="mr-2 text-violet-600" /> Product General Setup
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-md font-medium text-gray-700">Select Category</label>
                    <select
                      name="product_category"
                      value={formData.product_category}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                    >
                      <option value="">-Select Category-</option>
                      <option value="Electronics & Gadgets">Electronics & Gadgets</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-md font-medium text-gray-700">Sub Category</label>
                    <select
                      name="sub_category"
                      value={formData.sub_category}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                    >
                      <option value="">-Sub Category-</option>
                      <option value="Mobile & Phone">Mobile Phone</option>
                      <option value="Laptops">Laptops</option>
                      <option value="Cameras">Cameras</option>
                      <option value="Television">Television</option>
                      <option value="Wearable Technology">Wearable Technology</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-md font-medium text-gray-700">Sub Sub Category</label>
                    <select
                      name="sub_sub_category"
                      value={formData.sub_sub_category}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                    >
                      <option value="">-Sub Sub Category-</option>
                      <option value="Android Phone">Android Phone</option>
                      <option value="IOS phone">IOS phone</option>
                      <option value="Popular Models">Popular Models</option>
                      <option value="Gaming Phone">Gaming Phone</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-md font-medium text-gray-700">Product Type</label>
                    <select
                      name="product_type"
                      value={formData.product_type}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                    >
                      <option value="">- Product Type -</option>
                      <option value="Redmi">Redmi</option>
                      <option value="Vivo">Vivo</option>
                      <option value="Realme">Realme</option>
                      <option value="Apple">Apple</option>
                      <option value="One Plus">One Plus</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <label className="block text-sm font-medium text-gray-700 mr-2">Product SKU</label>
                    <input
                      type="text"
                      name="product_sku"
                      value={formData.product_sku}
                      readOnly
                      className="flex-1 py-1 block w-full rounded-sm border-gray-300 bg-gray-100 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-md font-medium text-gray-700">Product Unit</label>
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                    >
                      <option value="">-Product Unit-</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </div>
              </div>


              {/* Pricing & Inventory Section */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Banknote className="mr-2 text-green-600" /> Pricing & Inventory
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Unit Price</label>
                    <input
                      type="number"
                      name="unit_price"
                      value={formData.unit_price}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Minimum Order Qty</label>
                    <input
                      type="number"
                      name="minimum_order_qty"
                      value={formData.minimum_order_qty}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Current Stock Qty</label>
                    <input
                      type="number"
                      name="current_stock_qty"
                      value={formData.current_stock_qty}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Discount Type</label>
                    <select
                      name="discount_type"
                      value={formData.discount_type}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                    >
                      <option value="">-Discount Type-</option>
                      <option value="Flat">Flat Discount</option>
                      <option value="Percent">Percent Discount</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Discount Amount</label>
                    <input
                      type="number"
                      name="discount_amount"
                      value={formData.discount_amount}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tax amount(%)</label>
                    <input
                      type="number"
                      name="tax_amount"
                      value={formData.tax_amount}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tax calculation</label>
                    <select
                      name="tax_calculation"
                      value={formData.tax_calculation}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                    >
                      <option value="">-Tax Calculation-</option>
                      <option value="Include with product">Include with Product</option>
                      <option value="Exclude with product">Exclude with Product</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Shipping cost</label>
                    <input
                      type="number"
                      name="shipping_cost"
                      value={formData.shipping_cost}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="block text-sm font-medium text-gray-700 mr-2">
                      Shipping Cost Multiply with Quantity
                    </label>
                    {formData.shipping_cost_multiply ? (
                      <FaToggleOn
                        className="text-3xl text-green-500 cursor-pointer"
                        onClick={() => setFormData(prev => ({ ...prev, shipping_cost_multiply: false }))}
                      />
                    ) : (
                      <FaToggleOff
                        className="text-3xl text-gray-300 cursor-pointer"
                        onClick={() => setFormData(prev => ({ ...prev, shipping_cost_multiply: true }))}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Product Images Section */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Image className="mr-2 text-purple-600" /> Product Images
                </h2>

                {/* Thumbnail Upload */}
                <div className="grid md:grid-rows-2 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Thumbnail (500x500px, Max 2MB)
                    </label>
                    <input
                      type="file"
                      name="product_thumbnail"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={(e) => handleFileUpload(e, setThumbnailPreview)}
                      className="mt-1 block w-full text-sm text-gray-500 
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                  </div>

                  {/* Thumbnail Preview */}
                  {thumbnailPreview && (
                    <div className="relative mt-4 w-48 h-48 border-2 border-dashed rounded-lg overflow-hidden">
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => clearPreview(setThumbnailPreview, 'product_thumbnail')}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Additional Image Upload */}
                <div className="grid md:grid-rows-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Additional Image (500x500px, Max 2MB)
                    </label>
                    <input
                      type="file"
                      name="additional_images"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={(e) => handleFileUpload(e, setAdditionalImagePreview)}
                      className="mt-1 block w-full text-sm text-gray-500 
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                  </div>

                  {/* Additional Image Preview */}
                  {additionalImagePreview && (
                    <div className="relative w-48 h-48 border-2 border-dashed rounded-lg overflow-hidden">
                      <img
                        src={additionalImagePreview}
                        alt="Additional Image Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => clearPreview(setAdditionalImagePreview, 'additional_images')}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* SEO Section */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Search className="mr-2 text-indigo-600" /> SEO Settings
                </h2>

                <div className="grid md:grid-rows-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Meta Title</label>
                    <input
                      type="text"
                      name="meta_title"
                      value={formData.meta_title}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                    />
                  </div>

                  <div>
                    <label className="block text-md font-medium text-gray-700">Meta Description</label>
                    <textarea
                      name="meta_description"
                      value={formData.meta_description}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50"
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 flex items-center"
                >
                  <RefreshCw className="mr-2" /> Reset
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                >
                  <Save className="mr-2" /> Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;