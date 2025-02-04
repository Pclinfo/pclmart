import React, { useState, useEffect } from 'react';
import { Search, Eye, AlertCircle } from 'lucide-react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import config from '../../config';

const SellerList = () => {
  const [sellers, setSellers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeContent, setActiveContent] = useState(' ');

  useEffect(() => {
    fetchSellers();
  }, []);

  const processImageUrl = (profilePath) => {
    if (!profilePath) return '/default-seller-logo.png';

    // If it's already a full URL, return it
    if (profilePath.startsWith('http')) {
      return profilePath;
    }

    // Clean the path
    const cleanPath = profilePath
      .replace(/^\.\//, '')  // Remove leading ./
      .replace(/^\/+/, '')   // Remove multiple leading slashes
      .trim();

    // Construct the full URL
    return `${process.env.BACKEND_URL}/${cleanPath}`;
  };



  const fetchSellers = async () => {
    try {
      setError(null);
      setLoading(true);

      const getToken = () => {
        const localToken = localStorage.getItem('token');
        if (localToken) return localToken;

        const sessionToken = sessionStorage.getItem('token');
        if (sessionToken) return sessionToken;

        console.warn('No authentication token found');
        throw new Error('Authentication token is missing');
      };

      const token = getToken();

      const axiosConfig = {
        method: 'get',
        url: `${config.apiUrl}/admin_manufacture_list`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        timeout: 15000,
        timeoutErrorMessage: 'Request timed out. Please check your network connection.',
        validateStatus: function (status) {
          return status >= 200 && status < 300;
        },
        withCredentials: false
      };

      const response = await axios(axiosConfig);

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid response format: Expected an array of sellers');
      }

      const processedSellers = response.data.map(seller => {
        try {
          let profileUrl = '/default-seller-logo.png';

          if (seller.profile) {
            const cleanedProfilePath = seller.profile
              .replace(/^\.\//, '')
              .replace(/^\/\//, '/')
              .trim();

            profileUrl = cleanedProfilePath.startsWith('http')
              ? cleanedProfilePath
              : `${config.apiUrl}/${cleanedProfilePath}`;
          }

          return {
            ...seller,
            company_name: seller.company_name || 'Unnamed Shop',
            seller_name: seller.seller_name || 'Unknown Seller',
            seller_email: seller.seller_email || 'No email provided',
            seller_mobile: seller.seller_mobile || 'No phone provided',
            status: seller.status || 'Inactive',
            total_products: Number(seller.total_products) || 0,
            total_orders: Number(seller.total_orders) || 0,
            profile: profileUrl,
            id: seller.id || seller.sellerId || Date.now()
          };

        } catch (sellerProcessingError) {
          console.error('Error processing individual seller:', sellerProcessingError);
          return {
            id: Date.now(),
            company_name: 'Processing Error',
            seller_name: 'Error',
            profile: '/default-seller-logo.png',
            status: 'Error'
          };
        }
      });

      setSellers(processedSellers);
      console.log(`Successfully fetched ${processedSellers.length} sellers`);

    } catch (error) {
      console.error('Sellers Fetch Error:', error);

      if (error.response) {
        console.error('Server Response Error:', {
          data: error.response.data,
          status: error.response.status,
          headers: error.response.headers
        });

        switch (error.response.status) {
          case 401:
            setError('Authentication failed. Please log in again.');
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            break;
          case 403:
            setError('You do not have permission to access seller list.');
            break;
          case 404:
            setError('Seller endpoint not found. Please contact support.');
            break;
          case 500:
            setError('Internal server error. Please try again later.');
            break;
          default:
            setError('An unexpected error occurred while fetching sellers.');
        }
      } else if (error.request) {
        console.error('No Response Received:', error.request);

        if (error.code === 'ECONNABORTED') {
          setError('Request timed out. Please check your network connection.');
        } else if (error.message.includes('Network Error')) {
          setError('Unable to connect to the server. Please check your network or server status.');
        } else {
          setError('No response from server. Please check your network connection.');
        }
      } else {
        console.error('Request Setup Error:', error.message);
        setError(`Request error: ${error.message}`);
      }

      setSellers([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredSellers = sellers.filter(seller =>
    seller.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seller.seller_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seller.seller_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seller.seller_mobile?.includes(searchTerm)
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-emerald-500';
      case 'inactive':
        return 'bg-gray-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export functionality not implemented yet');
  };

  const handleAddNewSeller = () => {
    // TODO: Implement add new seller functionality
    console.log('Add new seller functionality not implemented yet');
  };

  const handleViewSeller = (sellerId) => {
    // TODO: Implement view seller functionality
    console.log('View seller functionality not implemented yet', sellerId);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sellers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          <div className="w-full p-4 bg-white rounded-lg shadow-sm">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative flex-1 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search by company name, seller name, phone or email"
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleExport}
                  className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  Export
                </button>
                <button
                  onClick={handleAddNewSeller}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add New Seller
                </button>
              </div>
            </div>

            {filteredSellers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? 'No sellers found matching your search.' : 'No sellers available.'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SL</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seller Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact Info</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Total Products</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Total Orders</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSellers.map((seller, index) => (
                      <tr key={seller.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            {seller.profile && (
                              <div className="h-8 w-8 flex-shrink-0 mr-3">
                                <img
                                  className="h-8 w-8 rounded-full object-cover"
                                  src={seller.profile}
                                />
                              </div>
                            )}
                            <div className="text-sm font-medium text-blue-600 hover:text-blue-800">
                              {seller.company_name}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{seller.seller_name}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          <div>{seller.seller_email}</div>
                          <div>{seller.seller_mobile}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs text-white rounded-full ${getStatusColor(seller.status)}`}>
                            {seller.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-blue-600">{seller.total_products}</td>
                        <td className="px-4 py-3 text-sm text-center text-blue-600">{seller.total_orders}</td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleViewSeller(seller.id)}
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                            title="View seller details"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
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

export default SellerList;