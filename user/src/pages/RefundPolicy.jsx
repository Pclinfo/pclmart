import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import config from './config';

const RefundPolicy = ({ policyType = 'refund' }) => {
    const [policyData, setPolicyData] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPolicy = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${config.apiUrl}/show_terms/${policyType}`);
                setPolicyData(response.data[policyType] || '');
                setError(null);
            } catch (err) {
                console.error('Error fetching policy data:', err);
                setError('Failed to load policy data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPolicy();
    }, [policyType]);

    const formatTitle = (type) => {
        return type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' & ');
    };

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex justify-center items-center flex-grow">
                    <div className="animate-pulse text-lg font-medium text-gray-600">
                        Loading policy information...
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex justify-center items-center flex-grow">
                    <div className="text-red-500 font-medium text-lg">{error}</div>
                </div>
            </div>
        );
    }

    
    const formatPolicyContent = (content) => {
        if (!content) return '';

        
        return content
            .split('\n')
            .map((line, i) => {
                
                if (line.trim().startsWith('•')) {
                    return `<div class="ml-6 flex" key="${i}">
                        <span class="mr-2">•</span>
                        <span>${line.trim().substring(1)}</span>
                    </div>`;
                }

                if (line.trim() === line.trim().toUpperCase() && line.trim().length > 3) {
                    return `<h2 class="font-bold text-lg mt-6 mb-2" key="${i}">${line}</h2>`;
                }

                return line ? `<p class="mb-2" key="${i}">${line}</p>` : '<br/>';
            })
            .join('');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8 flex-grow">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="px-6 py-4 bg-blue-600 text-white">
                        <h1 className="text-2xl font-bold text-center">
                            {formatTitle(policyType)} Policy
                        </h1>
                    </div>
                    <div className="p-6">
                        {/* Option 1: If API returns pre-formatted HTML */}
                        {policyData.includes('<') && policyData.includes('>') ? (
                            <div className="policy-content"
                                dangerouslySetInnerHTML={{ __html: policyData }} />
                        ) : (
                            /* Option 2: If API returns plain text that needs formatting */
                            <div className="policy-content"
                                dangerouslySetInnerHTML={{ __html: formatPolicyContent(policyData) }} />
                        )}
                    </div>
                </div>
            </div>
            <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
                <p>© {new Date().getFullYear()} PCL Mart. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default RefundPolicy;