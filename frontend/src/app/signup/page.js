"use client";
import { useState } from "react";
// Import desired icons from lucide-react
import { Eye, EyeOff, Loader2, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoginImage from "../../../public/Login.png";
// Import react-toastify and a transition
import { ToastContainer, toast, Slide } from 'react-toastify'; // Import Slide transition
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    location: ''
  });

  // --- Validation Regular Expressions ---
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  const emailRegex = /^\S+@\S+\.\S+$/;
  const phoneRegex = /^\d{10}$/;
  const locationRegex = /^[a-zA-Z\s]+$/;

  // --- Toast Options with Icons ---
  const toastErrorOptions = {
    icon: <XCircle size={20} className="text-red-500" />, // Red icon for error
  };

  const toastSuccessOptions = {
    icon: <CheckCircle size={20} className="text-green-500" />, // Green icon for success
  };

  // --- Updated Validation Function ---
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    const trimmedUsername = formData.username.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPassword = formData.password;
    const trimmedPhone = formData.phone.trim();
    const trimmedLocation = formData.location.trim();

    if (!trimmedUsername) {
      newErrors.username = 'Username is required';
      toast.error('Username is required', toastErrorOptions);
      isValid = false;
    } else if (!usernameRegex.test(trimmedUsername)) {
      newErrors.username = 'Username must contain only letters and numbers';
      toast.error('Username must contain only letters and numbers', toastErrorOptions);
      isValid = false;
    }

    if (!trimmedEmail) {
      newErrors.email = 'Email is required';
      toast.error('Email is required', toastErrorOptions);
      isValid = false;
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = 'Invalid email format';
      toast.error('Invalid email format (e.g., user@example.com)', toastErrorOptions);
      isValid = false;
    }

    if (!trimmedPassword) {
      newErrors.password = 'Password is required';
      toast.error('Password is required', toastErrorOptions);
      isValid = false;
    } else if (trimmedPassword.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      toast.error('Password must be at least 8 characters long', toastErrorOptions);
      isValid = false;
    }

    if (!trimmedPhone) {
      newErrors.phone = 'Phone number is required';
      toast.error('Phone number is required', toastErrorOptions);
      isValid = false;
    } else if (!phoneRegex.test(trimmedPhone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
      toast.error('Phone number must be exactly 10 digits', toastErrorOptions);
      isValid = false;
    }

    if (!trimmedLocation) {
      newErrors.location = 'Location is required';
      toast.error('Location is required', toastErrorOptions);
      isValid = false;
    } else if (!locationRegex.test(trimmedLocation)) {
      newErrors.location = 'Location must contain only letters and spaces';
      toast.error('Location must contain only letters and spaces', toastErrorOptions);
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password,
          phone: formData.phone.trim(),
          location: formData.location.trim(),
          role: 'CUSTOMER'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Signup failed (Status: ${response.status})`);
      }

      // Use defined options for success toast
      toast.success('Signup successful! Redirecting to login...', toastSuccessOptions);

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.error('Signup error:', error);
      // Use defined options for error toast
      toast.error(error.message || 'Failed to create account. Please try again.', toastErrorOptions);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6">
      {/* Configure ToastContainer for better appearance */}
      <ToastContainer
        position="top-right"
        autoClose={5000} // 5 seconds
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // dark theme for a modern look
        transition={Slide} // use the Slide transition
        style={{
          fontFamily: 'Inter, sans-serif',
          borderRadius: '10px', // Modern rounded corners
          padding: '8px', // Space between toasts
        }}
        toastStyle={{
          background: '#333', // Dark background for toast
          color: '#fff', // White text
          borderRadius: '8px', // Rounded corners for the toast itself
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for modern feel
          padding: '16px 20px',
          fontSize: '14px', // Smaller text size
        }}
      />
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md">
        <div className="flex justify-center mb-4 sm:mb-6">
          <Image
            src={LoginImage}
            alt="Logo"
            width={100}
            height={80}
            priority
            className="w-20 h-16 sm:w-24 sm:h-20"
          />
        </div>

        <h2 className="text-center text-lg sm:text-xl font-semibold text-gray-800">
          Sign up your account
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Username Field */}
          <div>
            <label className="block text-sm sm:text-base text-gray-600 font-medium">Username</label>
            <input
              type="text" name="username" value={formData.username} onChange={handleChange}
              placeholder="John"
              className={`mt-1 w-full p-2 sm:p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-black ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm sm:text-base text-gray-600 font-medium">Email</label>
            <input
              type="email" name="email" value={formData.email} onChange={handleChange}
              placeholder="john@example.com"
              className={`mt-1 w-full p-2 sm:p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-black ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm sm:text-base text-gray-600 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange}
                placeholder="John@123"
                className={`mt-1 w-full p-2 sm:p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-black pr-10 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <EyeOff size={18} className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye size={18} className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm sm:text-base text-gray-600 font-medium">Phone Number</label>
            <input
              type="tel" name="phone" value={formData.phone} onChange={handleChange}
              placeholder="8789778787" maxLength={10}
              className={`mt-1 w-full p-2 sm:p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-black ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>

          {/* Location Field */}
          <div>
            <label className="block text-sm sm:text-base text-gray-600 font-medium">Location</label>
            <input
              type="text" name="location" value={formData.location} onChange={handleChange}
              placeholder="New York"
              className={`mt-1 w-full p-2 sm:p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-black ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 text-sm sm:text-base">
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
                <span>Signing up...</span>
              </>
            ) : 'Sign up'}
          </button>
        </form>

        <p className="text-center text-xs sm:text-sm mt-4 sm:mt-6 text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
