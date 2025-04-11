import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const EditBankInfo = () => {
    const [activeContent, setActiveContent] = useState('');
    const [formData, setFormData] = useState({
        bankName: 'City Bank',
        branchName: 'Mirpur- 12',
        holderName: 'Fatema',
        accountNo: '12345678'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Form submitted:', formData);
    };

    const handleCancel = () => {
     
        console.log('Form cancelled');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex flex-col md:flex-row">
                <Sidebar setActiveContent={setActiveContent} />
                <main className="flex-1 p-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6">
                            <h1 className="text-2xl font-semibold text-gray-800">Edit Bank Info</h1>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-medium text-gray-700 mb-6">Edit Bank Info</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Bank Name Field */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Bank Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="bankName"
                                            value={formData.bankName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    {/* Branch Name Field */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Branch Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="branchName"
                                            value={formData.branchName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    {/* Holder Name Field */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Holder Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="holderName"
                                            value={formData.holderName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    {/* Account Number Field */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Account No <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="accountNo"
                                            value={formData.accountNo}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end space-x-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="px-4 py-2 text-white bg-pink-500 rounded-md hover:bg-pink-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                        {activeContent}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default EditBankInfo;