import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import config from './config';
import assets from '../assets/pcl_mart.svg'
import {
  Mail,
  Lock,
  EyeOff,
  Eye,
  ArrowRight
} from 'lucide-react';


const api = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Validation Functions
  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a vaild email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
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
      case 'email':
        setErrors(prev => ({ ...prev, email: validateEmail(value) }));
        break;
      case 'password':
        setErrors(prev => ({ ...prev, password: validatePassword(value) }));
        break;
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password)
    };

    setErrors(newErrors);

    // Check if any errors exist
    return !(newErrors.email || newErrors.password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/login', formData);

      if (response.data && response.data.token) {
        // Use the login method from AuthContext
        login(response.data);
        navigate('/dashboard');
      } else {
        setError('Login failed: Invalid credentials');
      }
    } catch (error) {
      console.error('Login Error:', error.response || error);

      if (error.response) {
        setError(error.response.data.message || 'Login failed: Server error');
      } else if (error.request) {
        setError('No response from server. Please check your connection.');
      } else {
        setError('Error: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f6f9] p-4 relative overflow-hidden">
      {/* Floating Geometric Backgrounds */}

      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-300/30 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md z-10 relative">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 space-y-6 relative overflow-hidden">
          {/* Subtle Gradient Overlay */}
          <div className="absolute top-0 left-0 w-full h-1 "></div>

          <div className="flex justify-center mb-4">
            <img
              src={assets}
              alt="PCL Mart Logo"
              className="h-11 w-auto object-contain"  // Adjust size as needed
            />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-gray-500 font-medium">
              Sign in to continue your journey
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg mb-6">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
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

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-400" size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
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

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 transition"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl 
              hover:from-blue-600 hover:to-purple-700 
              transition duration-300 
              transform hover:scale-[1.02] active:scale-95
              flex items-center justify-center gap-2
              shadow-lg hover:shadow-xl"
            >
              Sign In <ArrowRight size={20} />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="px-4 text-gray-500 text-sm">Or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-700 font-semibold transition"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;