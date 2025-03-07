import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import config from './config';

const ShippingPolicy = ({ policyType = 'shipping' }) => {
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

    // If the API isn't available or you prefer to use static content,
    // uncomment this useEffect and comment out the one above
    /*
    useEffect(() => {
        setPolicyData(`Shipping Policy
Welcome to PCLMart. This Shipping Policy outlines the terms and conditions governing the shipment and delivery of products purchased through pclmart.pclinfotech.com.
1. Shipping Coverage
We currently ship to locations within India. If your location is not covered, please contact our support team for further assistance.
2. Processing Time
• Orders are typically processed within 30 business days (excluding weekends and public holidays) from the date of payment confirmation.
• In case of high order volume or unforeseen circumstances, processing may take longer. Customers will be notified via email.
3. Shipping Methods & Delivery Time
We offer the following shipping options:
• Standard Shipping: Estimated delivery time: 45 business days
• Express Shipping: Estimated delivery time: 30 business days         
• International Shipping: Estimated delivery time varies by location
Delivery times are estimates and may be affected by factors beyond our control, such as weather conditions, customs processing, and carrier delays.
4. Shipping Charges
• Shipping costs are calculated at checkout based on the shipping method, destination, and order weight
5. Order Tracking
• Once your order is shipped, a tracking number will be provided via email.
• Customers can track their orders through the provided carrier's tracking system.
6. Address Accuracy & Undeliverable Packages
• Please ensure that the shipping address provided is accurate. We are not responsible for packages lost due to incorrect or incomplete addresses.
• If a package is returned due to an incorrect address, additional shipping fees may apply for re-delivery.
7. Shipping Restrictions
• Certain products may have shipping restrictions due to local regulations.
• Some fragile or perishable items may require special handling.
8. Damaged or Lost Shipments
• If your package is damaged upon arrival, please contact our support team within 10 days with photos of the damaged item and packaging.
• For lost shipments, please reach out to us within 7 days from the estimated delivery date for assistance.
9. Customs, Duties, and Taxes (International Orders)
• Customers are responsible for any customs duties, taxes, or additional charges imposed by their country.
• We are not responsible for delays due to customs processing.
10. Returns & Refunds
• For details on returns and refunds, please refer to our Return Policy.
11. Contact Information
For any shipping-related inquiries, please contact us at:
• Email: pclinfotechltd@gmail.com
• Phone: +91 73587 91015
• Customer Support: +91 72000 74253
By placing an order on PCLMart, you acknowledge that you have read, understood, and agreed to our Shipping Policy.`);
        setLoading(false);
    }, []);
    */

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

    // This assumes the API returns the content in a format that needs to be
    // preserved with proper line breaks and bullet points
    const formatPolicyContent = (content) => {
        if (!content) return '';
        
        // Keep the original formatting, replace new lines with <br/> and preserve bullet points
        return content
            .split('\n')
            .map((line, i) => {
                // Detect bullet points (• character)
                if (line.trim().startsWith('•')) {
                    return `<div class="ml-6 flex" key="${i}">
                        <span class="mr-2">•</span>
                        <span>${line.trim().substring(1)}</span>
                    </div>`;
                }
                
                // Detect numbered sections (1., 2., etc.)
                if (/^\d+\./.test(line.trim())) {
                    return `<h3 class="font-semibold text-md mt-4 mb-2" key="${i}">${line}</h3>`;
                }
                
                // Detect section headers (ALL CAPS)
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

export default ShippingPolicy;