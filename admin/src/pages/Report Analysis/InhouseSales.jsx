import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const InhouseSales = () => {
  const [activeContent, setActiveContent] = useState(' ');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

 
  const salesData = [
    { id: 1, name: 'Straps Plaid Patchwork Dress', totalSale: 7 },
    { id: 2, name: 'Bohemiantee Shirt Tops', totalSale: 7 },
    { id: 3, name: '4 French Door Refrigerator', totalSale: 12 },
    { id: 4, name: 'Beauty Jelly Lipstick', totalSale: 1 },
    { id: 5, name: 'One Dark Window', totalSale: 5 },
    { id: 6, name: 'Handbag Bags for Women', totalSale: 1 },
    { id: 7, name: 'Assortment Concrete Planter', totalSale: 4 },
    { id: 8, name: 'T900 Smart Watch', totalSale: 7 },
    { id: 9, name: 'Short Sleeve Shirt', totalSale: 1 },
    { id: 10, name: 'Sunscreen Serum', totalSale: 0 },
    { id: 11, name: 'Japan Sakura Serum', totalSale: 0 },
    { id: 12, name: 'Girls Polo Dress', totalSale: 0 },
    { id: 13, name: 'Splice Romper Jumpsuit Shorts', totalSale: 0 },
  ];

  const handleFilter = () => {

    console.log('Filtering by:', selectedCategory);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          <div className="bg-white rounded-md shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-2 p-4 border-b">
              <div className="w-5 h-5 bg-blue-500 rounded-sm"></div>
              <h1 className="text-xl font-medium text-gray-800">Inhouse Sale</h1>
            </div>

            {/* Filter Section */}
            <div className="p-4 flex flex-col md:flex-row justify-between gap-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <div className="relative w-full md:w-80">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="All">All</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Home">Home</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <button
                onClick={handleFilter}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition w-full md:w-auto"
              >
                Filter
              </button>
            </div>

            {/* Sales Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                      SL
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Sale
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {salesData.map((item) => (
                    <tr key={item.id} className={item.id % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {item.totalSale}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-end px-4 py-3 bg-white border-t border-gray-200">
              <nav className="flex items-center">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-2 py-1 rounded-md mr-1 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-md mx-1 ${currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === 8}
                  className="px-2 py-1 rounded-md ml-1 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InhouseSales;