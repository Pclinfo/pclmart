import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Coupons = () => {
  const couponsData = [
    {
      type: 'percentage',
      value: '10%',
      code: 'rtzxx8n8lr',
      store: 'PCL Mart',
      validTill: '10 Jun, 2025',
      minPurchase: '$100.00',
      emoji: '🔥'
    },
    {
      type: 'delivery',
      value: 'Free Delivery',
      code: 'pcuw655ytg',
      store: 'PCL Mart',
      validTill: '31 Dec, 2027',
      minPurchase: '$10.00',
      emoji: '🛵'
    },
    {
      type: 'fixed',
      value: '$100.00',
      code: 'ogpuqyeeoe',
      store: 'PCL Mart',
      validTill: '06 Oct, 2028',
      minPurchase: '$200.00',
      emoji: '💵'
    },
    {
      type: 'fixed',
      value: '$50.00',
      code: '2ul59rwkw2',
      store: 'PCL Mart',
      validTill: '31 Dec, 2026',
      minPurchase: '$500.00',
      emoji: '💵'
    },
    {
      type: 'fixed',
      value: '$10.00',
      code: '856gmef66p',
      store: 'PCL Mart',
      validTill: '10 Jun, 2026',
      minPurchase: '$100.00',
      emoji: '💵'
    },
    {
      type: 'delivery',
      value: 'Free Delivery',
      code: 'I2oDTJKF3z',
      store: 'PCL Mart',
      validTill: '31 Jan, 2029',
      minPurchase: '$2,000.00',
      emoji: '🛵'
    },
    {
      type: 'percentage',
      value: '75%',
      code: 'rFhfx7XiCm',
      store: 'PCL Mart',
      validTill: '31 Jan, 2029',
      minPurchase: '$7,000.00',
      emoji: '🔥'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Coupons</h1>
            
            {/* Coupons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {couponsData.map((coupon, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col">
                      <div className="text-2xl mb-1 font-bold">
                        <span className="mr-2">{coupon.emoji}</span>
                        {coupon.value}
                      </div>
                      <div className="text-sm text-gray-500">
                        On {coupon.store}
                      </div>
                    </div>
                    <div className="border border-dashed border-blue-400 rounded px-3 py-1.5">
                      <span className="text-blue-500 font-medium text-sm">{coupon.code}</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    Valid till {coupon.validTill}
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Available from minimum purchase {coupon.minPurchase}
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

export default Coupons;