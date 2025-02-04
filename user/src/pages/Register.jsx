import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import assets from '../assets/pcl_mart.svg';
import config from '../pages/config';
import {
  User,
  Mail,
  Lock,
  EyeOff,
  Eye,
  ArrowRight,
  Phone
} from 'lucide-react';
import Navbar from '../components/Navbar';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    mobileNo: ""
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Existing validation functions remain the same...
  const validateFullName = (name) => {
    if (!name) return "Full name is required";
    if (name.length < 2) return "Full name must be at least 2 characters";
    if (name.length > 50) return "Full name must not exceed 50 characters";
    if (!/^[a-zA-Z\s]+$/.test(name)) return "Full name can only contain letters and spaces";
    return "";
  };

  const validateEmail = (email) => {
    // Existing email validation...
    if (!email) return "Email is required";
    email = email.trim();
    if (email.length < 10 || email.length > 320)
      return "Email must be between 5 and 320 characters";
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email))
      return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password))
      return "Password must include uppercase, lowercase, number, and special character";
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone) return "Phone number is required";
    if (phone.length < 8) return "Please enter a valid phone number";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    switch (name) {
      case 'fullname':
        setErrors(prev => ({ ...prev, fullname: validateFullName(value) }));
        break;
      case 'email':
        setErrors(prev => ({ ...prev, email: validateEmail(value) }));
        break;
      case 'password':
        setErrors(prev => ({ ...prev, password: validatePassword(value) }));
        break;
      case 'mobileNo':
        setErrors(prev => ({ ...prev, mobileNo: validatePhone(value) }));
        break;
    }
  };

  const validateForm = () => {
    const newErrors = {
      fullname: validateFullName(formData.fullname),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      mobileNo: validatePhone(formData.mobileNo)
    };

    setErrors(newErrors);

    return !(newErrors.fullname || newErrors.email || newErrors.password || newErrors.mobileNo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${config.apiUrl}/user_register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message || "Registration failed. Try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-[#f4f6f9] p-4 relative">
        {/* Existing background elements... */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-300/30 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-md z-10 relative">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-grey"></div>

            <div className="flex justify-center mb-4">
              <img
                src={assets}
                alt="PCL Mart Logo"
                className="h-11 w-auto object-contain"
              />
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-3 tracking-tight">
                Create Account
              </h2>
              <p className="text-gray-500 font-medium">
                Start your journey for Business growth !
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg mb-6">
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Existing fullname input... */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-gray-400" size={20} />
                </div>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
                {errors.fullname && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>
                )}
              </div>

              {/* Existing email input... */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-gray-400" size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Existing password input... */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400" size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* New Phone Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="text-gray-400" size={20} />
                </div>
                <div className="pl-10">
                  <PhoneInput
                    country={"eg"}
                    enableSearch={true}
                    value={formData.mobileNo}
                    onChange={(phone) =>
                      setFormData((prev) => ({
                        ...prev,
                        mobileNo: `+${phone}`,
                      }))
                    }
                    inputClass="w-full py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                    containerClass="phone-input-container"
                  />
                </div>
                {errors.mobileNo && (
                  <p className="text-red-500 text-xs mt-1">{errors.mobileNo}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl 
                hover:from-blue-600 hover:to-purple-700 
                transition duration-300 
                active:scale-95
                flex items-center justify-center gap-2
                shadow-lg hover:shadow-xl"
              >
                {loading ? "Registering..." : "Register"} <ArrowRight size={20} />
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="px-4 text-gray-500 text-sm">Or</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold transition"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;