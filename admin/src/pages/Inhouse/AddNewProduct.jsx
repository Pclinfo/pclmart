import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import {
  Package,
  Type,
  Tag,
  Banknote,
  PackagePlus,
  Image,
  Search,
  Save,
  X,
  RefreshCw
} from 'lucide-react';
import config from '../../config';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';


const AddNewProduct = () => {
  const [activeContent, setActiveContent] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [additionalImagePreview, setAdditionalImagePreview] = useState(null);
  const [formData, setFormData] = useState({
  

    productName: '',
    productDescription: '',
    productCategory: '',
    subCategory: '',
    subSubCategory: '',
    productType: '',
    productSku: '',
    unit: '',

    // Pricing & Inventory 
    unitPrice: '',
    minimumOrderQty: '',
    currentStockQty: '',
    discountType: '',
    discountAmount: '',
    taxAmount: '',
    taxCalculation: '',
    shippingCost: '',
    shippingCostMultiply: false,

    // Images & Media
    productThumbnail: null,
    additionalImages: [],


    // SEO Settings
    metaTitle: '',
    metaDescription: ''
  });


  const handleFileUpload = (event, setPreview) => {
    const file = event.target.files[0];

    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size should not exceed 2MB');
        return;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image (jpg, png, or webp)');
        return;
      }

      // Create file reader to generate preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Update form data with the file
      setFormData(prev => ({
        ...prev,
        [event.target.name === 'productThumbnail' ? 'productThumbnail' : 'additionalImages']:
          event.target.name === 'productThumbnail'
            ? file
            : [...(prev.additionalImages || []), file]
      }));
    }
  };
  const clearPreview = (setPreview) => {
    setPreview(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'productThumbnail'
          ? files[0]
          : Array.from(files)
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const generateSku = () => {
    // Simple SKU generation logic
    const timestamp = new Date().getTime().toString().slice(-6);
    const randomStr = Math.random().toString(36).substring(2, 5).toUpperCase();
    setFormData(prev => ({
      ...prev,
      productSku: `PRD-${timestamp}-${randomStr}`
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Retrieve authentication token from localStorage
      const token = localStorage.getItem('token');

      // Verify token exists
      if (!token) {
        alert('Please log in to add a product');
        return;
      }

      // Create FormData object
      const formDataToSend = new FormData();

      // Append all text form data
      Object.keys(formData).forEach(key => {
        // Only append non-file data
        if (!(formData[key] instanceof File || formData[key] instanceof Array)) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append product thumbnail
      if (formData.productThumbnail) {
        formDataToSend.append('productThumbnail', formData.productThumbnail);
      }

      // Append additional images
      if (formData.additionalImages && formData.additionalImages.length > 0) {
        formData.additionalImages.forEach((file) => {
          formDataToSend.append('additionalImages', file);
        });
      }

      // Send the form data to the backend
      const response = await fetch(`${config.apiUrl}/seller-add-new-product`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}` // Include token for authentication
        },
        body: formDataToSend
      });

      // Parse the response
      const data = await response.json();

      // Handle response
      if (response.ok) {
        alert('Product added successfully!');
        // Reset form after successful submission
        handleReset();
      } else {
        // Handle error response from server
        alert(data.error || 'Failed to add product');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting product. Please try again.');
    }
  };

  const handleReset = () => {
    // Reset form to initial state
    setFormData({
      productName: '',
      productDescription: '',
      productCategory: '',
      subCategory: '',
      subSubCategory: '',
      productBrand: '',
      productType: '',
      productSku: '',
      unit: '',
      searchTags: '',
      unitPrice: '',
      minimumOrderQty: '',
      currentStockQty: '',
      discountType: '',
      discountAmount: '',
      taxAmount: '',
      taxCalculation: '',
      shippingCost: '',
      shippingCostMultiply: false,
      selectColor: false,
      attributes: [],
      productThumbnail: null,
      additionalImages: [],
      youtubeLink: '',
      metaTitle: '',
      metaDescription: '',
      seoOptions: {
        index: true,
        follow: true,
        archive: true,
        imageIndex: true,
        snippet: true
      },
      maxSnippet: 1,
      maxVideoPreview: 1,
      maxImagePreview: 1
    });
  };

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

                <div className="grid md:grid-row-2 gap-4">
                  <div>
                    <label className="block text-md font-medium text-gray-700">Product Name</label>
                    <input
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleInputChange}
                      className="mt-4 block py-1 w-full border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-md font-medium text-gray-700">Product Description</label>
                    <textarea
                      name="productDescription"
                      value={formData.productDescription}
                      onChange={handleInputChange}
                      className="mt-1 block w-full  border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50"
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <PackagePlus className="mr-2 text-violet-600" /> Product General Setup
                </h2>

                <div className="grid md:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-md font-medium text-gray-700">Select Category</label>
                    <select
                      name="productCategory"
                      value={formData.productCategory}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                    >
                      <option value="">-Select Category-</option>
                      <option value="Electronics & Gadgets"> Electronics & Gadgets</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-md font-medium text-gray-700">Sub Category</label>
                    <select
                      name="subCategory"
                      value={formData.subCategory}
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
                      name="subSubCategory"
                      value={formData.subSubCategory}
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
                      name="productType"
                      value={formData.productType}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                    >
                      <option value="">- Product Type -</option>
                      <option value="Redmi">Redmi</option>
                      <option value="Vivo">Vivo</option>
                      <option value="Realme">Realme</option>
                      <option value="Apple">Apple</option>
                      <option value="One Plus"></option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <label className="block text-sm font-medium text-gray-700 mr-2">Product SKU</label>
                    <input
                      type="text"
                      name="productSku"
                      value={formData.productSku}
                      readOnly
                      className="flex-1 py-1 block w-full rounded-sm border-gray-300 bg-gray-100 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={generateSku}
                      className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Generate
                    </button>
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
                      name="unitPrice"
                      value={formData.unitPrice}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Minimum Order Qty</label>
                    <input
                      type="number"
                      name="minimumOrderQty"
                      value={formData.minimumOrderQty}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Current Stock Qty</label>
                    <input
                      type="number"
                      name="currentStockQty"
                      value={formData.currentStockQty}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Discount Type</label>
                    <select
                      name="discountType"
                      value={formData.discountType}
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
                      name="discountAmount"
                      value={formData.discountAmount}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tax amount(%)</label>
                    <input
                      type="number"
                      name="taxAmount"
                      value={formData.taxAmount}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tax calculation</label>
                    <select
                      name="taxCalculation"
                      value={formData.taxCalculation}
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
                      name="shippingCost"
                      value={formData.shippingCost}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="block text-sm font-medium text-gray-700 mr-2">
                      Shipping Cost Multiply with Quantity
                    </label>
                    {formData.shippingCostMultiply ? (
                      <FaToggleOn
                        className="text-3xl text-green-500 cursor-pointer"
                        onClick={() => setFormData(prev => ({ ...prev, shippingCostMultiply: false }))}
                      />
                    ) : (
                      <FaToggleOff
                        className="text-3xl text-gray-300 cursor-pointer"
                        onClick={() => setFormData(prev => ({ ...prev, shippingCostMultiply: true }))}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Image className="mr-2 text-purple-600" /> Product Images
                </h2>

                {/* Thumbnail Upload */}
                <div className="grid md:grid-rows-2  mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Thumbnail (500x500px, Max 2MB)
                    </label>
                    <input
                      type="file"
                      name="productThumbnail"
                      accept=".jpg,.jpeg,.png,.webp"
                      multiple
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
                    <div className="relative mb-6 w-48 h-48 border-2 border-dashed rounded-lg overflow-hidden">
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => clearPreview(setThumbnailPreview)}
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
                      name="additionalImage"
                      accept=".jpg,.jpeg,.png,.webp"
                      multiple
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
                        onClick={() => clearPreview(setAdditionalImagePreview)}
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

                <div className="grid md:grid-row-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Meta Title</label>
                    <input
                      type="text"
                      name="metaTitle"
                      value={formData.metaTitle}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700/50"
                    />
                  </div>

                  <div>
                    <label className="block text-md font-medium text-gray-700">Meta Description</label>
                    <textarea
                      name="metaDescription"
                      value={formData.metaDescription}
                      onChange={handleInputChange}
                      className="mt-1 block w-full  border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50"
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
                  <Save className="mr-2" /> Submit Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;