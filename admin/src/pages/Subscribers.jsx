import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const SubscriberList = () => {

    const [activeContent, setActiveContent] = useState('');

    const [subscribers] = useState([
        { id: 1, email: 'p********@gmail.com', date: '21 Apr 2022, 04:12 AM' },
        { id: 2, email: 's********@gmail.com', date: '20 Apr 2022, 05:09 AM' }
       
    ]);

    return (
        <div>
            <Navbar />
            <div className="flex">
                <Sidebar setActiveContent={setActiveContent} />
                <div className="flex-1 p-4">
                    {activeContent}
                    <div className="p-6 max-w-7xl mx-auto">
                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row gap-4 mb-8 items-start">
                            <div className="w-full md:w-1/3">
                                <label className="block text-sm mb-2">Subscription Date</label>
                                <input
                                    type="date"
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Select Date"
                                />
                            </div>

                            <div className="w-full md:w-1/3">
                                <label className="block text-sm mb-2">Sort By</label>
                                <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Select mail sorting order</option>
                                </select>
                            </div>

                            <div className="w-full md:w-1/3">
                                <label className="block text-sm mb-2">Choose First</label>
                                <input
                                    type="text"
                                    placeholder="Ex: 100"
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 mb-8">
                            <button className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200">
                                Reset
                            </button>
                            <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                                Filter
                            </button>
                        </div>

                        {/* Search and Export Section */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-medium">Subscriber list</h2>
                                <span className="bg-gray-100 px-2 py-1 rounded text-sm">5</span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                <div className="relative flex-grow sm:flex-grow-0">
                                    <input
                                        type="text"
                                        placeholder="Search by email"
                                        className="w-full sm:w-64 pl-3 pr-10 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <Search className="w-4 h-4 text-gray-500" />
                                    </button>
                                </div>
                                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
                                    Export
                                </button>
                            </div>
                        </div>

                        {/* Table Section */}
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px]">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="text-left p-4 font-medium">SL</th>
                                        <th className="text-left p-4 font-medium">Email</th>
                                        <th className="text-left p-4 font-medium">Subscription Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subscribers.map((subscriber) => (
                                        <tr key={subscriber.id} className="border-t">
                                            <td className="p-4">{subscriber.id}</td>
                                            <td className="p-4">{subscriber.email}</td>
                                            <td className="p-4">{subscriber.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriberList;