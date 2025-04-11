import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import config from '../config';

const BannerSetup = () => {
    const [activeContent, setActiveContent] = useState(' ');
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [banners, setBanners] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editBanner, setEditBanner] = useState(null);
    const [formData, setFormData] = useState({
        banner_type: '',
        published: true,
        banner_image: null
    });
    const [imagePreview, setImagePreview] = useState('');
    const [imageLoadErrors, setImageLoadErrors] = useState({});

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/show_banner`);

            const bannersData = Array.isArray(response.data) ? response.data : [];
            console.log('Banners data:', bannersData);

            const processedBanners = bannersData.map(banner => ({
                ...banner,

                imageUrl: banner.image ? formatImageUrl(banner.image) : null
            }));

            setBanners(processedBanners);
        } catch (error) {
            console.error('Error fetching banners:', error);
            setBanners([]);
        }
    };


    const formatImageUrl = (imagePath) => {
        if (!imagePath) return null;

        let fixedPath = imagePath.replace(/\\/g, '/');

        fixedPath = fixedPath.replace(/^\.?\/?/, '');

        const baseUrl = config.apiUrl.replace(/\/api$/, '');


        return `${baseUrl}/${fixedPath}`;
    };

    const handlePublishToggle = async (id, currentState) => {
        try {
            const banner = banners.find(b => b.id === id);
            if (!banner) return;

            await axios.put(`${config.apiUrl}/update_banner/${id}`, {
                ...banner,
                published: !currentState
            });
            fetchBanners();
        } catch (error) {
            console.error('Error toggling publish status:', error);
        }
    };

    const handleEdit = (banner) => {
        setEditBanner(banner);
        setFormData({
            banner_type: banner.banner_type || '',
            published: !!banner.published,
            banner_image: null
        });
        setShowAddForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this banner?')) {
            try {
                await axios.delete(`${config.apiUrl}/delete_banner/${id}`);
                fetchBanners();
            } catch (error) {
                console.error('Error deleting banner:', error);
            }
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, banner_image: file });


            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('banner_type', formData.banner_type);
        data.append('published', formData.published);
        if (formData.banner_image) {
            data.append('banner_image', formData.banner_image);
        }

        try {
            if (editBanner) {
                await axios.put(`${config.apiUrl}/update_banner/${editBanner.id}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                await axios.post(`${config.apiUrl}/banner`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }


            setShowAddForm(false);
            setEditBanner(null);
            setFormData({
                banner_type: '',
                published: true,
                banner_image: null
            });
            setImagePreview('');

            setImageLoadErrors({});
            fetchBanners();
        } catch (error) {
            console.error('Error saving banner:', error);
        }
    };

    const handleImageError = (bannerId) => {

        setImageLoadErrors(prev => ({
            ...prev,
            [bannerId]: true
        }));
    };


    const bannersArray = Array.isArray(banners) ? banners : [];

    return (
        <div>
            <Navbar />
            <div className="flex">
                <Sidebar setActiveContent={setActiveContent} />
                <div className="flex-1 p-4">
                    {activeContent}
                    <div className="max-w-7xl mx-auto p-4">
                        <div className="flex items-center gap-2 mb-6">
                            <h1 className="text-xl font-semibold">Banner Setup</h1>
                            <span className="text-sm text-gray-500">(Default)</span>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <div className="flex items-center gap-2">
                                <h2 className="font-medium">Banner Table</h2>
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{bannersArray.length}</span>
                            </div>

                            <div className="flex flex-wrap gap-2 items-center w-full sm:w-auto">
                                <select
                                    className="flex-1 sm:flex-none px-4 py-2 border rounded"
                                    value={selectedFilter}
                                    onChange={(e) => setSelectedFilter(e.target.value)}
                                >
                                    <option>All</option>
                                    <option>Main Banner</option>
                                    <option>Footer Banner</option>
                                    <option>Popup Banner</option>
                                </select>

                                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                    Filter
                                </button>

                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
                                    onClick={() => {
                                        setEditBanner(null);
                                        setFormData({
                                            banner_type: '',
                                            published: true,
                                            banner_image: null
                                        });
                                        setImagePreview('');
                                        setShowAddForm(true);
                                    }}
                                >
                                    <span>+</span> Add Banner
                                </button>
                            </div>
                        </div>

                        {showAddForm && (
                            <div className="bg-white p-6 mb-6 rounded shadow-md">
                                <h2 className="text-lg font-medium mb-4">
                                    {editBanner ? 'Edit Banner' : 'Add New Banner'}
                                </h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium">
                                                Banner Type
                                            </label>
                                            <select
                                                name="banner_type"
                                                value={formData.banner_type}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border rounded"
                                                required
                                            >
                                                <option value="">Select Type</option>
                                                <option value="Main Banner">Main Banner</option>
                                                <option value="Footer Banner">Footer Banner</option>
                                                <option value="Popup Banner">Popup Banner</option>
                                                <option value="Main Section Banner">Main Section Banner</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium">
                                                Published
                                            </label>
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="published"
                                                    checked={formData.published}
                                                    onChange={handleInputChange}
                                                    className="mr-2 h-4 w-4"
                                                />
                                                <span>Publish immediately</span>
                                            </div>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block mb-2 text-sm font-medium">
                                                Banner Image
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="w-full px-4 py-2 border rounded"
                                            />
                                            {imagePreview && (
                                                <div className="mt-4">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="w-40 h-32 object-cover border rounded"
                                                    />
                                                </div>
                                            )}
                                            {!imagePreview && editBanner && editBanner.imageUrl && (
                                                <div className="mt-4">
                                                    <p className="text-sm text-gray-500 mb-1">Current image:</p>
                                                    <img
                                                        src={editBanner.imageUrl}
                                                        alt="Current Banner"
                                                        className="w-40 h-32 object-cover border rounded"
                                                        onError={() => handleImageError(editBanner.id)}
                                                    />
                                                    {imageLoadErrors[editBanner.id] && (
                                                        <p className="text-sm text-red-500 mt-1">
                                                            Unable to load current image
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-6 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setShowAddForm(false)}
                                            className="px-4 py-2 border rounded"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            {editBanner ? 'Update Banner' : 'Add Banner'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-4 py-3 text-left">SL</th>
                                        <th className="px-4 py-3 text-left">Image</th>
                                        <th className="px-4 py-3 text-left">Banner Type</th>
                                        <th className="px-4 py-3 text-left">Published</th>
                                        <th className="px-4 py-3 text-left">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bannersArray.length > 0 ? (
                                        bannersArray
                                            .filter(banner => selectedFilter === 'All' || banner.banner_type === selectedFilter)
                                            .map((banner, index) => (
                                                <tr key={banner.id || index} className="border-t">
                                                    <td className="px-4 py-3">{index + 1}</td>
                                                    <td className="px-4 py-3">
                                                        {imageLoadErrors[banner.id] ? (
                                                            <div className="w-20 h-16 flex items-center justify-center bg-gray-100 rounded">
                                                                <span className="text-xs text-gray-500">Image not available</span>
                                                            </div>
                                                        ) : (
                                                            <img
                                                                src={banner.imageUrl || '/api/placeholder/80/60'}
                                                                alt={`Banner ${banner.id}`}
                                                                className="w-20 h-16 object-cover rounded"
                                                                // Add cache-busting parameter to prevent blinking on rerender
                                                                key={`banner-img-${banner.id}`}
                                                                onError={() => handleImageError(banner.id)}
                                                                loading="eager" // Force eager loading instead of lazy loading
                                                            />
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3">{banner.banner_type || 'Unknown'}</td>
                                                    <td className="px-4 py-3">
                                                        <div className="relative inline-block w-12 h-6">
                                                            <input
                                                                type="checkbox"
                                                                className="opacity-0 w-0 h-0"
                                                                checked={!!banner.published}
                                                                onChange={() => handlePublishToggle(banner.id, banner.published)}
                                                            />
                                                            <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${banner.published ? 'bg-blue-600' : 'bg-gray-300'
                                                                }`}>
                                                                <span className={`absolute h-5 w-5 bg-white rounded-full transition-all duration-300 ${banner.published ? 'left-6' : 'left-1'
                                                                    }`} />
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleEdit(banner)}
                                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                                            >
                                                                <Pencil size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(banner.id)}
                                                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-4 py-3 text-center">
                                                No banners found. Please add a new banner.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerSetup;