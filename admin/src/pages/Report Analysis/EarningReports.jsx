import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';



const EarningReports = () => {
  const [activeTab, setActiveTab] = useState('admin');
  const [filterPeriod, setFilterPeriod] = useState('This Year');
  const [activeContent, setActiveContent] = useState(' ');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);


  const earningData = {
    total: 51945.97,
    commission: 2280.97,
    inHouse: 57475.00,
    shipping: 570.00,
    inHouseProducts: 4,
    totalShop: 0,
    paymentAmount: 221700,
    payments: {
      cash: 195512.81,
      digital: 19786.00,
      offline: 0.00,
      wallet: 6355.00
    }
  };

  const monthlyData = [
    { month: 'Jan', value: 0 },
    { month: 'Feb', value: 51000 },
    { month: 'Mar', value: 5000 },
    { month: 'Apr', value: 1000 },
    { month: 'May', value: 500 },
    { month: 'Jun', value: 400 },
    { month: 'Jul', value: 300 },
    { month: 'Aug', value: 200 },
    { month: 'Sep', value: 200 },
    { month: 'Oct', value: 200 },
    { month: 'Nov', value: 150 },
    { month: 'Dec', value: 100 }
  ];

  const tableData = [
    {
      sl: 1,
      duration: 'Jan',
      inHouseEarning: 0.00,
      commissionEarning: 0.00,
      earnFromShipping: 0.00,
      deliverymanIncentive: 0.00,
      discountGiven: 0.00,
      vatTax: 0.00,
      refundGiven: 0.00,
      totalEarning: 0.00
    }
  ];


  const maxChartValue = Math.max(...monthlyData.map(item => item.value));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          <div className="bg-gray-50 min-h-screen w-full">
            {/* Header */}
            <div className="px-4 py-3 bg-white border-b">
              <div className="flex items-center">
                <div className="text-lg font-medium flex items-center">
                  <span className="text-yellow-400 mr-1">📊</span> Earning Reports
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b bg-white">
              <button
                className={`px-4 py-2 border-b-2 ${activeTab === 'admin' ? 'border-blue-500 text-blue-500' : 'border-transparent'}`}
                onClick={() => setActiveTab('admin')}
              >
                Admin Earning
              </button>
              <button
                className={`px-4 py-2 border-b-2 ${activeTab === 'vendor' ? 'border-blue-500 text-blue-500' : 'border-transparent'}`}
                onClick={() => setActiveTab('vendor')}
              >
                Vendor Earning
              </button>
            </div>

            {/* Filter Section */}
            <div className="p-4 bg-white border-b">
              <h3 className="text-sm font-medium mb-2">Filter Data</h3>
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative w-full md:w-64">
                  <button
                    className="w-full px-3 py-2 text-left border rounded flex justify-between items-center bg-white"
                    onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                  >
                    <span>{filterPeriod}</span>
                    <span>▼</span>
                  </button>
                  {isFilterDropdownOpen && (
                    <div className="absolute w-full z-10 bg-white border mt-1 rounded shadow-lg">
                      <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setFilterPeriod('This Year'); setIsFilterDropdownOpen(false); }}>This Year</div>
                      <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setFilterPeriod('Last Year'); setIsFilterDropdownOpen(false); }}>Last Year</div>
                      <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setFilterPeriod('This Month'); setIsFilterDropdownOpen(false); }}>This Month</div>
                    </div>
                  )}
                </div>
                <button className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded">
                  Filter
                </button>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Total Earnings Card */}
              <div className="bg-white p-4 rounded border">
                <div className="flex items-center mb-2">
                  <span className="bg-blue-100 p-2 rounded mr-2">🛒</span>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">${earningData.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                    <p className="text-sm text-gray-500">Total earnings</p>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <div>
                    <p className="text-red-500 font-medium">${earningData.commission.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    <p className="text-xs text-gray-500">Commission</p>
                  </div>
                  <div>
                    <p className="text-blue-500 font-medium">${earningData.inHouse.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    <p className="text-xs text-gray-500">In House</p>
                  </div>
                  <div>
                    <p className="text-green-500 font-medium">${earningData.shipping.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    <p className="text-xs text-gray-500">Shipping</p>
                  </div>
                </div>
              </div>

              {/* In House Products Card */}
              <div className="bg-white p-4 rounded border">
                <div className="flex items-center">
                  <span className="bg-yellow-100 p-2 rounded mr-2">🎁</span>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">{earningData.inHouseProducts}</h2>
                    <p className="text-sm text-gray-500">Total In House Products</p>
                  </div>
                </div>
              </div>

              {/* Total Shop Card */}
              <div className="bg-white p-4 rounded border">
                <div className="flex items-center">
                  <span className="bg-red-100 p-2 rounded mr-2">🏪</span>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">{earningData.totalShop}</h2>
                    <p className="text-sm text-gray-500">Total Shop</p>
                  </div>
                </div>
              </div>

              {/* Earning Statistics Chart */}
              <div className="bg-white p-4 rounded border lg:col-span-2">
                <h3 className="text-md font-medium mb-4">Earning Statistics</h3>
                <div className="h-64 relative">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                    <div>${maxChartValue.toLocaleString()}</div>
                    <div>${(maxChartValue * 0.8).toLocaleString()}</div>
                    <div>${(maxChartValue * 0.6).toLocaleString()}</div>
                    <div>${(maxChartValue * 0.4).toLocaleString()}</div>
                    <div>${(maxChartValue * 0.2).toLocaleString()}</div>
                    <div>$0</div>
                  </div>

                  {/* Chart grid */}
                  <div className="ml-12 h-full flex flex-col justify-between">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="border-t border-gray-200 w-full h-0"></div>
                    ))}
                  </div>

                  {/* Chart line */}
                  <div className="absolute left-12 bottom-6 right-0 h-[calc(100%-24px)]">
                    <svg className="w-full h-full" viewBox={`0 0 ${monthlyData.length * 50} 100`} preserveAspectRatio="none">
                      <path
                        d={`M ${monthlyData.map((d, i) => `${i * 50} ${100 - (d.value / maxChartValue * 100)}`).join(' L ')}`}
                        stroke="#3B82F6"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d={`M ${monthlyData.map((d, i) => `${i * 50} ${100 - (d.value / maxChartValue * 100)}`).join(' L ')} L ${(monthlyData.length - 1) * 50} 100 L 0 100 Z`}
                        fill="rgba(59, 130, 246, 0.1)"
                      />
                    </svg>
                  </div>

                  {/* X-axis labels */}
                  <div className="absolute left-12 right-0 bottom-0 flex justify-between text-xs text-gray-500">
                    {monthlyData.map((d, i) => (
                      <div key={i}>{d.month}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment Statistics */}
              <div className="bg-white p-4 rounded border">
                <h3 className="text-md font-medium mb-4">Payment Statistics</h3>
                <div className="flex justify-center">
                  {/* Donut chart */}
                  <div className="relative w-40 h-40">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Cash payments - Light blue */}
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#90CAF9" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="0" />
                      {/* Digital payments - Dark blue */}
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1565C0" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="201" />
                      {/* Wallet - Yellow */}
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#FFC107" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="226" />
                      {/* Center circle (white) */}
                      <circle cx="50" cy="50" r="30" fill="white" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-xl font-bold">${(earningData.paymentAmount / 1000).toFixed(1)}K+</div>
                      <div className="text-xs text-gray-500">Payments Amount</div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-4">
                  <div className="flex items-center mb-1">
                    <span className="w-3 h-3 rounded-full bg-blue-300 mr-2"></span>
                    <span className="text-xs">Cash payments (${earningData.payments.cash.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <span className="w-3 h-3 rounded-full bg-blue-800 mr-2"></span>
                    <span className="text-xs">Digital payments (${earningData.payments.digital.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <span className="w-3 h-3 rounded-full bg-gray-400 mr-2"></span>
                    <span className="text-xs">Offline payments (${earningData.payments.offline.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
                    <span className="text-xs">Wallet (${earningData.payments.wallet.toLocaleString()})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Table Section */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-medium">Total Earnings <span className="bg-gray-200 px-1 rounded text-xs">+2</span></h3>
                <button className="px-3 py-1 border rounded bg-white text-sm flex items-center text-green-600">
                  <span className="mr-1">⬇️</span> Export
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-xs">
                      <th className="py-2 px-3 border text-left">SL</th>
                      <th className="py-2 px-3 border text-left">Duration</th>
                      <th className="py-2 px-3 border text-left">In-House Earning</th>
                      <th className="py-2 px-3 border text-left">Commission Earning</th>
                      <th className="py-2 px-3 border text-left">Earn From Shipping</th>
                      <th className="py-2 px-3 border text-left">Deliveryman Incentive</th>
                      <th className="py-2 px-3 border text-left">Discount Given</th>
                      <th className="py-2 px-3 border text-left">VAT/TAX</th>
                      <th className="py-2 px-3 border text-left">Refund Given</th>
                      <th className="py-2 px-3 border text-left">Total Earning</th>
                      <th className="py-2 px-3 border text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row) => (
                      <tr key={row.sl} className="text-gray-700 text-sm">
                        <td className="py-2 px-3 border">{row.sl}</td>
                        <td className="py-2 px-3 border">{row.duration}</td>
                        <td className="py-2 px-3 border">${row.inHouseEarning.toFixed(2)}</td>
                        <td className="py-2 px-3 border">${row.commissionEarning.toFixed(2)}</td>
                        <td className="py-2 px-3 border">${row.earnFromShipping.toFixed(2)}</td>
                        <td className="py-2 px-3 border">${row.deliverymanIncentive.toFixed(2)}</td>
                        <td className="py-2 px-3 border">${row.discountGiven.toFixed(2)}</td>
                        <td className="py-2 px-3 border">${row.vatTax.toFixed(2)}</td>
                        <td className="py-2 px-3 border">${row.refundGiven.toFixed(2)}</td>
                        <td className="py-2 px-3 border">${row.totalEarning.toFixed(2)}</td>
                        <td className="py-2 px-3 border">
                          <button className="text-green-500">⬆️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningReports;