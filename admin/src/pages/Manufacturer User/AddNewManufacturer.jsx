import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';


const AddNewManufacturer = () => {

  const [activeContent, setActiveContent] = useState(' ');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    shopName: '',
    shopAddress: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="max-w-7xl mx-auto p-4 bg-white">
            <h1 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-6 h-6 text-gray-600">👤</span>
              Add New Vendor
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Vendor Information Section */}
              <section className="space-y-4">
                <h2 className="text-lg font-medium flex items-center gap-2">
                  <span className="w-5 h-5 text-gray-600">👤</span>
                  Vendor Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      placeholder="Ex: Jhone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      placeholder="Ex: Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <div className="flex">
                      <select className="px-3 py-2 border border-gray-300 rounded-l-md border-r-0">
                        <option>🇺🇸 +1</option>
                      </select>
                      <input
                        type="tel"
                        placeholder="Enter phone number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-r-md"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Vendor Image (Ratio 1:1)</label>
                    <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                      <div className="w-32 h-32 mx-auto bg-gray-100 rounded-md flex items-center justify-center">
                        <span className="text-gray-400">📷</span>
                      </div>
                      <button className="mt-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm">
                        Browse
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Account Information Section */}
              <section className="space-y-4">
                <h2 className="text-lg font-medium flex items-center gap-2">
                  <span className="w-5 h-5 text-gray-600">🔑</span>
                  Account Information
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      placeholder="Ex: Jhone@company.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password minimum 8 characters"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      >
                        👁️
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      >
                        👁️
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Shop Information Section */}
              <section className="space-y-4">
                <h2 className="text-lg font-medium flex items-center gap-2">
                  <span className="w-5 h-5 text-gray-600">🏪</span>
                  Shop Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Shop Name</label>
                    <input
                      type="text"
                      placeholder="Ex: Jhon"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Shop Address</label>
                    <textarea
                      placeholder="Ex: Doe"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Shop logo (Ratio 1:1)</label>
                    <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                      <div className="w-32 h-32 mx-auto bg-gray-100 rounded-md flex items-center justify-center">
                        <span className="text-gray-400">🖼️</span>
                      </div>
                      <button className="mt-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm">
                        Browse
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Shop banner (Ratio 4:1 2000 x 500 px)</label>
                    <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                      <div className="w-full h-32 bg-gray-100 rounded-md flex items-center justify-center">
                        <span className="text-gray-400">🖼️</span>
                      </div>
                      <button className="mt-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm">
                        Browse
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex justify-end gap-4">
                <button type="button" className="px-6 py-2 border border-gray-300 rounded-md">
                  Reset
                </button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewManufacturer;