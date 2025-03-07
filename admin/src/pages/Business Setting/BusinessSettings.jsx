import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import General from '../Business Setup/General';
import PaymentOptions from '../Business Setup/PaymentOptions';
import Products from '../Business Setup/Products';
import PrioritySetup from '../Business Setup/PrioritySetup';
import Orders from '../Business Setup/Orders';
import Vendors from '../Business Setup/Vendors';
import Customers from '../Business Setup/Customers';
import DeliveryMen from '../Business Setup/DeliveryMen';
import ShippingMethod from '../Business Setup/ShippingMethod';
import DeliveryRestriction from '../Business Setup/DeliveryRestriction';
import Invoice from '../Business Setup/Invoice';



const BusinessSettings = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [activeContent, setActiveContent] = useState(' ');

  const tabs = [
    'General', 'Payment Options', 'Products', 'Priority Setup', 'Orders',
    'Vendors', 'Customers', 'Delivery Men', 'Shipping Method', 'Delivery Restriction', 'Invoice'
  ];


  const renderContent = () => {
    switch (activeTab) {
      case 'General':
        return <General />;
      case 'Payment Options':
        return <PaymentOptions />;
      case 'Products':
        return <Products />;
      case 'Priority Setup':
        return <PrioritySetup />;
      case 'Orders':
        return <Orders />;
      case 'Vendors':
        return <Vendors />;
      case 'Customers':
        return <Customers />;
      case 'Delivery Men':
        return <DeliveryMen />;
      case 'Shipping Method':
        return <ShippingMethod />;
      case 'Delivery Restriction':
        return <DeliveryRestriction />;
      case 'Invoice':
        return <Invoice />;




      default:
        return <General />;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Business Setup</h1>
              </div>

              {/* Navigation Tabs */}
              <div className="border-b border-gray-200 mb-6 overflow-x-auto">
                <nav className="flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Content Area */}
              <div className="bg-white rounded-lg shadow">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSettings;