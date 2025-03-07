import React, { useState } from 'react';
import { BarChart, Package, CreditCard, ShoppingCart, TrendingUp, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [activeContent, setActiveContent] = useState('');

  const orderStats = [
    { title: 'Pending', count: 3, icon: <AlertCircle className="w-5 h-5 text-orange-500" /> },
    { title: 'Confirmed', count: 4, icon: <ShoppingCart className="w-5 h-5 text-green-500" /> },
    { title: 'Packaging', count: 1, icon: <Package className="w-5 h-5 text-blue-500" /> },
    { title: 'Out For Delivery', count: 2, icon: <TrendingUp className="w-5 h-5 text-purple-500" /> },
    { title: 'Delivered', count: 10, icon: <Package className="w-5 h-5 text-green-500" /> },
    { title: 'Canceled', count: 1, icon: <AlertCircle className="w-5 h-5 text-red-500" /> },
    { title: 'Returned', count: 1, icon: <ShoppingCart className="w-5 h-5 text-yellow-500" /> },
    { title: 'Failed To Delivery', count: 2, icon: <AlertCircle className="w-5 h-5 text-red-500" /> }
  ];

  const walletStats = [
    { title: 'Withdrawable Balance', amount: '$10,023.50', icon: <CreditCard className="w-6 h-6 text-green-500" /> },
    { title: 'Pending Withdraw', amount: '$500.00', icon: <CreditCard className="w-6 h-6 text-orange-500" /> },
    { title: 'Already Withdrawn', amount: '$600.00', icon: <CreditCard className="w-6 h-6 text-blue-500" /> },
    { title: 'Total Tax Given', amount: '$2,519.00', icon: <BarChart className="w-6 h-6 text-purple-500" /> },
    { title: 'Total Commission Given', amount: '$6,394.47', icon: <BarChart className="w-6 h-6 text-yellow-500" /> },
    { title: 'Total Delivery Charge Earned', amount: '$822.00', icon: <TrendingUp className="w-6 h-6 text-green-500" /> }
  ];

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                  <h1 className="text-xl font-semibold text-gray-800">Welcome PCL Mart Seller</h1>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded">Products</button>
                </div>
              </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <BarChart className="w-6 h-6 text-blue-500 mr-2" />
                    <h2 className="text-lg font-semibold">Order Analytics</h2>
                  </div>
                  <select className="border rounded p-2">
                    <option>Overall Statistics</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {orderStats.map((stat, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {stat.icon}
                          <span className="ml-2 text-gray-600">{stat.title}</span>
                        </div>
                        <span className="text-lg font-semibold">{stat.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <CreditCard className="w-6 h-6 text-green-500 mr-2" />
                  <h2 className="text-lg font-semibold">Vendor Wallet</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {walletStats.map((stat, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between">
                        {stat.icon}
                        <div className="ml-4">
                          <p className="text-sm text-gray-600">{stat.title}</p>
                          <p className="text-lg font-semibold">{stat.amount}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">Most Popular Products</h2>
                  <div className="space-y-4">
                    {/* Product list items would go here */}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>
                  <div className="space-y-4">
                    {/* Top selling products would go here */}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;