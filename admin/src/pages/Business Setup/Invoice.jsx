import React, { useState } from 'react';

const Invoice = () => {
    const [businessIdentity, setBusinessIdentity] = useState('taxId');
    const [termsText, setTermsText] = useState('');
    const [businessIdText, setBusinessIdText] = useState('');

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Handle file drop logic here
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
                <img
                    src="/api/placeholder/24/24"
                    alt="Invoice settings icon"
                    className="w-6 h-6"
                />
                <h2 className="text-lg font-medium">Invoice Settings</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Terms & Condition
                        </label>
                        <textarea
                            value={termsText}
                            onChange={(e) => setTermsText(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                            placeholder="Terms & Condition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Business Identity
                        </label>
                        <div className="flex gap-4 mb-3">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="businessIdentity"
                                    value="taxId"
                                    checked={businessIdentity === 'taxId'}
                                    onChange={(e) => setBusinessIdentity(e.target.value)}
                                    className="mr-2"
                                />
                                Tax Id
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="businessIdentity"
                                    value="binNumber"
                                    checked={businessIdentity === 'binNumber'}
                                    onChange={(e) => setBusinessIdentity(e.target.value)}
                                    className="mr-2"
                                />
                                Bin Number
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="businessIdentity"
                                    value="musak"
                                    checked={businessIdentity === 'musak'}
                                    onChange={(e) => setBusinessIdentity(e.target.value)}
                                    className="mr-2"
                                />
                                Musak
                            </label>
                        </div>
                        <input
                            type="text"
                            value={businessIdText}
                            onChange={(e) => setBusinessIdText(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Invoice Logo <span className="text-gray-500">(1000 X 308 Px)</span>
                    </label>
                    <div
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center min-h-[200px] flex items-center justify-center"
                    >
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">
                                Drag and drop file or{' '}
                                <button className="text-blue-600 hover:text-blue-700">
                                    Browse file
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-6">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Save
                </button>
            </div>
        </div>
    );
};

export default Invoice;