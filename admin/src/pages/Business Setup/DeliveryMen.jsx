import React, { useState } from 'react';

const DeliveryMen = () => {
    const [uploadPicture, setUploadPicture] = useState(false);
    const [verificationMethod, setVerificationMethod] = useState('phone');

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm max-w-4xl mx-auto">
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <span className="inline-block">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                    </span>
                    Delivery Man Settings
                </h2>

                <div className="space-y-6">
                    {/* Upload Picture Toggle */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-2">
                            <span>Upload Picture on Delivery</span>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                title="More information"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 16v-4" />
                                    <path d="M12 8h.01" />
                                </svg>
                            </button>
                        </div>
                        <button
                            className={`w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${uploadPicture ? 'bg-blue-600' : 'bg-gray-200'
                                } relative`}
                            onClick={() => setUploadPicture(!uploadPicture)}
                        >
                            <span
                                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${uploadPicture ? 'translate-x-6' : 'translate-x-0'
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Verification Method */}
                    <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-4">
                            <span>Forgot Password Verification By</span>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                title="More information"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 16v-4" />
                                    <path d="M12 8h.01" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="verification"
                                    value="email"
                                    checked={verificationMethod === 'email'}
                                    onChange={(e) => setVerificationMethod(e.target.value)}
                                    className="hidden"
                                />
                                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${verificationMethod === 'email' ? 'border-blue-600' : 'border-gray-300'
                                    }`}>
                                    {verificationMethod === 'email' && (
                                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                                    )}
                                </span>
                                <span>Email</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="verification"
                                    value="phone"
                                    checked={verificationMethod === 'phone'}
                                    onChange={(e) => setVerificationMethod(e.target.value)}
                                    className="hidden"
                                />
                                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${verificationMethod === 'phone' ? 'border-blue-600' : 'border-gray-300'
                                    }`}>
                                    {verificationMethod === 'phone' && (
                                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                                    )}
                                </span>
                                <span>Phone (OTP)</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Save
                </button>
            </div>
        </div>
    );
};

export default DeliveryMen;