import React, { useState, useRef } from 'react';
import { ArrowRight, ArrowLeft, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
    CitySelect,
    CountrySelect,
    StateSelect,
} from 'react-country-state-city';
import config from '../config';
import 'react-country-state-city/dist/react-country-state-city.css';


const ManufacturerRegistrationForm = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [phone, setPhone] = useState("");
    const [countryid, setCountryid] = useState(0);
    const [stateid, setStateid] = useState(0);
    const [cityid, setCityid] = useState(0);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [businessCertificate, setBusinessCertificate] = useState(null);
    const [ieCertificate, setIECertificate] = useState(null);

    const [formData, setFormData] = useState({

        // Personal Information
        fullName: '',
        dob: '',
        countrys: '',
        state: '',
        place: '',
        mobileNo: '',
        email: '',
        profilePicture: null,

        // Business Registration
        companyName: '',
        country: '',
        officialMobileNo: '',
        officialEmail: '',
        certificateUpload: null,
        businessCertificate: '',

        // Bank Details
        bankName: '',
        branchIFSCCode: '',
        accountHolderName: '',
        accountNumber: '',
        swiftBIC: '',
        upiId: '',
        payPal: '',
        paymentTermsAccepted: false,

        // Exporter Details
        ieCode: '',
        ieCertificate: null,
        exporterTermsAccepted: false
    });

    const fileInputRefs = {
        profilePicture: useRef(null),
        digitalSignature: useRef(null),
        certificateUpload: useRef(null),
        ieCertificate: useRef(null)
    };

    const COUNTRY_DATA = {
        India: {
            flag: '🇮🇳',
            countryCode: '+91',
            businessCertificates: ['GSTIN (Goods and Services Tax Identification Number)']
        },
        China: {
            flag: '🇨🇳',
            countryCode: '+86',
            businessCertificates: ['Business License']
        },
        'South Korea': {
            flag: '🇰🇷',
            countryCode: '+82',
            businessCertificates: ['Business Registration Certificate']
        },
        Singapore: {
            flag: '🇸🇬',
            countryCode: '+65',
            businessCertificates: ['ACRA Business Profile']
        },
        'United Arab Emirates': {
            flag: '🇦🇪',
            countryCode: '+971',
            businessCertificates: ['Trade License']
        },
        'United States': {
            flag: '🇺🇸',
            countryCode: '+1',
            businessCertificates: ['EIN', 'Business License']
        },
        Canada: {
            flag: '🇨🇦',
            countryCode: '+1',
            businessCertificates: ['Business Number (BN)']
        },
        Mexico: {
            flag: '🇲🇽',
            countryCode: '+52',
            businessCertificates: ['RFC (Registro Federal de Contribuyentes)']
        },
        'United Kingdom': {
            flag: '🇬🇧',
            countryCode: '+44',
            businessCertificates: ['Certificate of Incorporation']
        },
        Germany: {
            flag: '🇩🇪',
            countryCode: '+49',
            businessCertificates: ['Handelsregisterauszug']
        },
        France: {
            flag: '🇫🇷',
            countryCode: '+33',
            businessCertificates: ['SIREN/SIRET Number']
        },
        Italy: {
            flag: '🇮🇹',
            countryCode: '+39',
            businessCertificates: ['VAT Number']
        },
        Netherlands: {
            flag: '🇳🇱',
            countryCode: '+31',
            businessCertificates: ['KVK Number']
        },
        'South Africa': {
            flag: '🇿🇦',
            countryCode: '+27',
            businessCertificates: ['CIPC Registration Certificate']
        },
        Nigeria: {
            flag: '🇳🇬',
            countryCode: '+234',
            businessCertificates: ['CAC Certificate']
        },
        Kenya: {
            flag: '🇰🇪',
            countryCode: '+254',
            businessCertificates: ['Business Registration Certificate']
        },
        Australia: {
            flag: '🇦🇺',
            countryCode: '+61',
            businessCertificates: ['ABN']
        },
        'New Zealand': {
            flag: '🇳🇿',
            countryCode: '+64',
            businessCertificates: ['NZBN']
        },
        Brazil: {
            flag: '🇧🇷',
            countryCode: '+55',
            businessCertificates: ['CNPJ']
        },
        Argentina: {
            flag: '🇦🇷',
            countryCode: '+54',
            businessCertificates: ['CUIT']
        },
        Chile: {
            flag: '🇨🇱',
            countryCode: '+56',
            businessCertificates: ['RUT']
        }
    };

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setFormData(prev => ({
            ...prev,
            country: selectedCountry,
            officialMobileNo: COUNTRY_DATA[selectedCountry].countryCode,
            businessCertificate: ''
        }));
    };


    const handleCountrysChange = (countrys) => {
        setSelectedCountry(countrys);
        setFormData(prev => ({
            ...prev,
            countrys: countrys.name,
        }));
        setStateid(0);
        setCityid(0);
    };

    const handleStateChange = (state) => {
        setSelectedState(state);
        setFormData(prev => ({
            ...prev,
            state: state.name,
        }));
        setCityid(0);
    };

    const handleCityChange = (city) => {
        setSelectedCity(city);
        setFormData(prev => ({
            ...prev,
            place: city.name,
        }));
    };


    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                profilePicture: file
            }));
            setProfilePicture(file);
        }
    };

    const handleBusinessCertificateChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                certificateUpload: file
            }));
            setBusinessCertificate(file);
        }
    };

    const handleIECertificateChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                ieCertificate: file
            }));
            setIECertificate(file);
        }
    };

    const countries = Object.keys(COUNTRY_DATA);


    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked :
                type === 'file' ? files[0] :
                    type === 'number' ? Number(value) : value
        }));
    };
    const handleFileUpload = (name) => {
        fileInputRefs[name].current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userStoredData = JSON.parse(localStorage.getItem('user'));
            const userId = userStoredData.user;

            const token = localStorage.getItem('token');


            if (!token) {
                alert('Please log in to continue');
                return;
            }

            const formDataToSend = new FormData();
            formDataToSend.append('user', userId);


            Object.keys(formData).forEach(key => {

                if (!(formData[key] instanceof File)) {
                    formDataToSend.append(key, formData[key]);
                }
            });


            if (formData.profilePicture) {
                formDataToSend.append('profilePicture', formData.profilePicture);
            }

            if (formData.certificateUpload) {
                formDataToSend.append('certificateUpload', formData.certificateUpload);
            }

            if (formData.ieCertificate) {
                formDataToSend.append('ieCertificate', formData.ieCertificate);
            }

            const response = await fetch(`${config.apiUrl}/register-seller`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend,
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registration Successful!');
                navigate('/dashboard');
            } else {

                if (response.status === 401) {
                    alert('Session expired. Please login again');

                } else {
                    alert(data.message || 'Registration Failed');
                }
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Error submitting registration');
        }
    };

    const nextStep = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                            className="p-2 border rounded"
                            required
                        />
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                            placeholder="Date of Birth"
                            className="p-2 border rounded"
                            required
                        />
                        <CountrySelect
                            onChange={handleCountrysChange}
                            placeHolder='Select Country'
                            className="p-2 border rounded"
                            required
                        />
                        <StateSelect
                            countryid={selectedCountry?.id || 0}
                            onChange={handleStateChange}
                            placeHolder='Select State'
                            disabled={!selectedCountry}
                            className="p-2 border rounded"
                            required
                        />
                        <CitySelect
                            countryid={selectedCountry?.id || 0}
                            stateid={selectedState?.id || 0}
                            onChange={handleCityChange}
                            placeHolder='Select City'
                            disabled={!selectedState}
                            className="p-2 border rounded"
                            required
                        />
                        <PhoneInput
                            country={"eg"}
                            enableSearch={true}
                            value={formData.mobileNo}
                            onChange={(phone, countryData, e, formattedValue) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    mobileNo: `+${phone}`,
                                }))
                            }
                            className="p-2 border rounded"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email Address"
                            className="p-2 border rounded"
                            required
                        />
                        <div className="col-span-2 flex items-center gap-4">
                            <input
                                type="file"
                                name="profilePicture"
                                ref={fileInputRefs.profilePicture}
                                onChange={handleProfilePictureChange}
                                className="hidden"
                                accept="image/*"
                            />
                            <button
                                type="button"
                                onClick={() => handleFileUpload('profilePicture')}
                                className="flex items-center gap-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                            >
                                <Upload size={20} /> Upload Profile Picture
                            </button>
                            {profilePicture && (
                                <span className="text-green-600">
                                    {profilePicture.name}
                                </span>
                            )}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            placeholder="Company Name"
                            className="p-2 border rounded"
                            required
                        />
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleCountryChange}
                            className="w-full p-2 border rounded appearance-none"
                            required
                        >
                            <option value="">Select Country</option>
                            {countries.map(country => (
                                <option key={country} value={country}>
                                    {COUNTRY_DATA[country].flag} {country}
                                </option>
                            ))}
                        </select>
                        {formData.country && (
                            <select
                                name="businessCertificate"
                                value={formData.businessCertificate}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded appearance-none"
                                required
                            >
                                <option value="">Select Business Certificate</option>
                                {COUNTRY_DATA[formData.country].businessCertificates.map(cert => (
                                    <option key={cert} value={cert}>{cert}</option>
                                ))}
                            </select>
                        )}
                        <span className="p-2 border border-r-0 rounded-l bg-gray-100">
                            {formData.country ? COUNTRY_DATA[formData.country].flag : '🌐'}
                            {formData.country ? COUNTRY_DATA[formData.country].countryCode : ''}
                        </span>
                        <input
                            type="text"
                            name="BusinessNumber"
                            value={formData.businessNumber}
                            onChange={handleInputChange}
                            placeholder="Business Number"
                            className="p-2 border rounded"
                            required
                        />
                        <PhoneInput
                            country={"eg"}
                            enableSearch={true}
                            value={formData.mobileNo}
                            onChange={(phone, countryData, e, formattedValue) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    mobileNo: `+${phone}`,
                                }))
                            }
                            className="p-2 border rounded"
                        />
                        <div className="col-span-2 flex items-center gap-4">
                            <input
                                type="file"
                                name="certificateUpload"
                                ref={fileInputRefs.certificateUpload}
                                onChange={handleBusinessCertificateChange}
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                            />
                            <button
                                type="button"
                                onClick={() => handleFileUpload('certificateUpload')}
                                className="flex items-center gap-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            >
                                <Upload size={20} /> Upload Business Certificate
                            </button>
                            {formData.certificateUpload && (
                                <span className="text-green-600">
                                    {formData.certificateUpload.name}
                                </span>
                            )}
                        </div>
                        <textarea
                            name="companyAddress"
                            value={formData.companyAddress}
                            onChange={handleInputChange}
                            placeholder="Company Address"
                            className="col-span-2 p-6 border rounded"
                            required
                        />
                        <input
                            type="email"
                            name="officialEmail"
                            value={formData.officialEmail}
                            onChange={handleInputChange}
                            placeholder="Official Email"
                            className="p-2 border rounded"
                            required
                        />
                    </div>
                );
            case 3:
                return (
                    <div className="grid grid-cols-2 gap-6">
                        <input
                            type="text"
                            name="accountHolderName"
                            value={formData.accountHolderName}
                            onChange={handleInputChange}
                            placeholder="Account Holder Name"
                            className="p-2.5 border rounded"
                            required
                        />
                        <input
                            type="number"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleInputChange}
                            placeholder="Account Number"
                            className="p-2.5 border rounded"
                            required
                        />
                        <input
                            type="text"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleInputChange}
                            placeholder="Bank Name"
                            className="p-2.5 border rounded"
                        />
                        <input
                            type="text"
                            name="swiftBIC"
                            value={formData.swiftBIC}
                            onChange={handleInputChange}
                            placeholder="Swift BIC"
                            className="p-2.5 border rounded"
                        />
                        <input
                            type="text"
                            name="branchIFSCCode"
                            value={formData.branchIFSCCode}
                            onChange={handleInputChange}
                            placeholder="Branch IFSC Code"
                            className="p-2.5 border rounded"
                        />
                        <input
                            type="text"
                            name="upiId"
                            value={formData.upiId}
                            onChange={handleInputChange}
                            placeholder="UPI ID"
                            className="p-2.5 border rounded"
                        />
                        <input
                            type="text"
                            name="payPal"
                            value={formData.payPal}
                            onChange={handleInputChange}
                            placeholder="PayPal Email/ID"
                            className="p-2.5 border rounded"
                        />
                        <div className="col-span-2 flex items-center">
                            <input
                                type="checkbox"
                                name="paymentTermsAccepted"
                                checked={formData.paymentTermsAccepted}
                                onChange={handleInputChange}
                                className="mr-2"
                                required
                            />
                            <label>I accept the Payment Terms & Conditions</label>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="ieCode"
                            value={formData.ieCode}
                            onChange={handleInputChange}
                            placeholder="IE Code"
                            className="p-2 border rounded"
                        />
                        <div className="col-span-2 flex items-center gap-4">
                            <input
                                type="file"
                                name="ieCertificate"
                                ref={fileInputRefs.ieCertificate}
                                onChange={handleIECertificateChange}
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                            />
                            <button
                                type="button"
                                onClick={() => handleFileUpload('ieCertificate')}
                                className="flex items-center gap-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            >
                                <Upload size={20} /> Upload IE Certificate
                            </button>
                            {formData.ieCertificate && (
                                <span className="text-green-600">
                                    {formData.ieCertificate.name}
                                </span>
                            )}
                        </div>
                        <div className="col-span-2 flex items-center">
                            <input
                                type="checkbox"
                                name="exporterTermsAccepted"
                                checked={formData.exporterTermsAccepted}
                                onChange={handleInputChange}
                                className="mr-2"
                                required
                            />
                            <label>I confirm my Exporter Details</label>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-9 bg-white shadow-lg rounded-lg">
            <div className="flex justify-center mb-8">
            </div>
            <div className="flex justify-between mb-6">
                <div className="flex space-x-2">
                    <div className={`w-10 h-1 rounded-md ${currentStep >= 1 ? ' bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-300'}`}></div>
                    <div className={`w-10 h-1 rounded-md ${currentStep >= 2 ? ' bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-300'}`}></div>
                    <div className={`w-10 h-1 rounded-md ${currentStep >= 3 ? ' bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-300'}`}></div>
                    <div className={`w-10 h-1 rounded-md ${currentStep >= 4 ? ' bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-300'}`}></div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">
                        {currentStep === 1 && 'Personal Information'}
                        {currentStep === 2 && 'Business Registration'}
                        {currentStep === 3 && 'Bank Details'}
                        {currentStep === 4 && 'Exporter Details'}
                    </h2>
                </div>

                {renderStep()}

                <div className="flex justify-end space-x-2 mt-6">
                    {currentStep > 1 && (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="flex items-center gap-2 bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300"
                        >
                            <ArrowLeft size={20} /> Previous
                        </button>
                    )}
                    {currentStep < 4 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-md 
                            hover:from-blue-600 hover:to-purple-700 
                            transition duration-300 
                            active:scale-95
                            shadow-lg hover:shadow-xl"
                        >
                            Save & Continue <ArrowRight size={20} />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-md 
                            hover:from-blue-600 hover:to-purple-700 
                            transition duration-300 
                            active:scale-95
                            shadow-lg hover:shadow-xl"
                        >
                            Save & Submit <ArrowRight size={20} />
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ManufacturerRegistrationForm;