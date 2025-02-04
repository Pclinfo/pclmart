import React, { useState, useRef, useEffect } from 'react';
import { User, Edit2, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import config from '../pages/config';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const fileInputRef = useRef(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [originalData, setOriginalData] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        phone_number: '',
        email: '',
        newPassword: '',
        confirmPassword: '',
        profile_picture: null // Make sure this is part of the formData
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            loadUserData();
        } else {
            alert('Please log in to continue');
        }
    }, []);

    const loadUserData = async () => {
        try {
            const userId = localStorage.getItem('user');
            const token = localStorage.getItem('token');

            if (!token || !userId) {
                alert('Please log in to continue');
                return;
            }

            const response = await fetch(`${config.apiUrl}/user_login/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const userData = await response.json();
                const initialData = {
                    name: userData.name || '',
                    phone_number: userData.phone_number || '',
                    email: userData.email || '',
                    newPassword: '',
                    confirmPassword: '',
                    profile_picture: userData.profile_picture
                };
                setFormData(initialData);
                setOriginalData(initialData);

                if (userData.profile_picture) {
                    setProfilePicture(`${config.apiUrl}/${userData.profile_picture}`);
                }
            } else {
                console.error('Failed to load user data');
                alert('Failed to load user data');
            }
        } catch (error) {
            console.error('Error loading user data:', error);
            alert('Error loading user data');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleProfilePictureChange = (e) => {
        if (!isEditing) return;

        const file = e.target.files[0];
        if (file) {
            // Clean up previous preview URL if it exists
            if (typeof profilePicture === 'string' && profilePicture.startsWith('blob:')) {
                URL.revokeObjectURL(profilePicture);
            }

            // Create a preview URL for the image
            const previewUrl = URL.createObjectURL(file);
            setProfilePicture(previewUrl);
            setFormData(prev => ({
                ...prev,
                profile_picture: file  // Store the actual file object
            }));
        }
    };

    const handleFileUpload = () => {
        if (!isEditing) return;
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('user');

        // Validate passwords if changing
        if (formData.newPassword) {
            if (formData.newPassword !== formData.confirmPassword) {
                alert("Passwords don't match!");
                return;
            }
            if (formData.newPassword.length < 8) {
                alert("Password must be at least 8 characters long!");
                return;
            }
        }

        try {
            // Create FormData to handle file upload
            const formDataToSend = new FormData();

            // Append user data
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phone_number', formData.phone_number || '');

            if (formData.newPassword) {
                formDataToSend.append('password', formData.newPassword);
            }

            // Handle profile picture
            if (formData.profile_picture instanceof File) {
                formDataToSend.append('profile_picture', formData.profile_picture);
            }

            const response = await fetch(`${config.apiUrl}/update-profile`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            if (response.ok) {
                // Clean up any object URLs we created
                if (typeof profilePicture === 'string' && profilePicture.startsWith('blob:')) {
                    URL.revokeObjectURL(profilePicture);
                }
                alert('Profile updated successfully');
                loadUserData();
                setIsEditing(false);
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile');
        }
    };

    const handleCancel = () => {
        // Clean up any object URLs we created
        if (typeof profilePicture === 'string' && profilePicture.startsWith('blob:')) {
            URL.revokeObjectURL(profilePicture);
        }
        setFormData(originalData);
        setIsEditing(false);
        if (originalData.profile_picture) {
            setProfilePicture(originalData.profile_picture);
        } else {
            setProfilePicture(null);
        }
    };



    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
                <Sidebar />

                <div className="flex-1 p-4">
                    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
                        <div className="max-w-3xl mx-auto">
                            <form onSubmit={handleSubmit} className="p-6">
                                {/* Header */}
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-2xl font-semibold">Profile Info</h1>
                                    <button
                                        type="button"
                                        onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isEditing
                                            ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                            }`}
                                    >
                                        {isEditing ? (
                                            <>
                                                <X size={16} />
                                                Cancel
                                            </>
                                        ) : (
                                            <>
                                                <Edit2 size={16} />
                                                Edit Profile
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Profile Picture */}
                                <div className="flex justify-center mb-8">
                                    <div className="relative">
                                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                            {profilePicture ? (
                                                <img
                                                    src={typeof profilePicture === 'string'
                                                        ? profilePicture
                                                        : URL.createObjectURL(profilePicture)}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <User size={40} className="text-gray-400" />
                                            )}
                                        </div>
                                        {isEditing && (
                                            <button
                                                type="button"
                                                onClick={handleFileUpload}
                                                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                                            >
                                                <User size={16} />
                                            </button>
                                        )}
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleProfilePictureChange}
                                            className="hidden"
                                            accept="image/*"
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={`w-full p-2 border rounded-lg ${!isEditing && 'bg-gray-100'}`}
                                            disabled={!isEditing}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <div className="flex">
                                            <select
                                                className={`p-2 border rounded-l-lg bg-white ${!isEditing && 'bg-gray-100'}`}
                                                disabled={!isEditing}
                                            >
                                                <option value="+91">🇮🇳 +91</option>
                                            </select>
                                            <input
                                                type="tel"
                                                name="phone_number"
                                                value={formData.phone_number}
                                                onChange={handleInputChange}
                                                className={`w-full p-2 border-t border-b border-r rounded-r-lg ${!isEditing && 'bg-gray-100'}`}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full p-2 border rounded-lg ${!isEditing && 'bg-gray-100'}`}
                                            disabled={!isEditing}
                                        />
                                    </div>

                                    {isEditing && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    New Password
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        name="newPassword"
                                                        value={formData.newPassword}
                                                        onChange={handleInputChange}
                                                        className="w-full p-2 border rounded-lg"
                                                        placeholder="Minimum 8 characters long"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                                    >
                                                        {showPassword ? "Hide" : "Show"}
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Confirm Password
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        name="confirmPassword"
                                                        value={formData.confirmPassword}
                                                        onChange={handleInputChange}
                                                        className="w-full p-2 border rounded-lg"
                                                        placeholder="Minimum 8 characters long"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                                    >
                                                        {showConfirmPassword ? "Hide" : "Show"}
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {isEditing && (
                                    <div className="mt-6 flex justify-end">
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Update
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;