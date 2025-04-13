'use client';
import React, { useRef, useState } from 'react';
import MainThemeButton from '../Buttons/MainThemeButton';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { CheckCircle, XCircle, Eye, EyeOff, Clipboard } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

const AddAgentForm = () => {
  const formRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Choose...');
  const [errors, setErrors] = useState({ name: '', email: '', password: '', phone: '', location: '', role: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const options = ['Agent', 'Customer'];

  const toastErrorOptions = {
    icon: <XCircle size={20} className="text-red-500" />,
  };

  const toastSuccessOptions = {
    icon: <CheckCircle size={20} className="text-green-500" />,
  };

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  const validateForm = () => {
    let formErrors = { name: '', email: '', password: '', phone: '', location: '', role: '' };
    let isValid = true;

    // Name Validation (cannot start with number or have special characters)
    const namePattern = /^[A-Za-z][A-Za-z0-9 ]*$/;
    if (!formRef.current?.name.value) {
      formErrors.name = 'Name is required';
      isValid = false;
    } else if (!namePattern.test(formRef.current?.name.value)) {
      formErrors.name = 'Name cannot start with a number and must not have special characters';
      isValid = false;
    }

    // Email Validation (check valid email format)
    if (!formRef.current?.email.value) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formRef.current?.email.value)) {
      formErrors.email = 'Invalid email format';
      isValid = false;
    }

    // Password Validation (should not be empty and min 8 characters)
    if (!passwordValue) {
      formErrors.password = 'Password is required';
      isValid = false;
    } else if (passwordValue.length < 8) {
      formErrors.password = 'Password must be at least 8 characters long';
      isValid = false;
    }

    // Phone Validation (only digits and 10 digits max)
    const phonePattern = /^\d{10}$/;
    if (!formRef.current?.phone.value) {
      formErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!phonePattern.test(formRef.current?.phone.value)) {
      formErrors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }

    // Location Validation (only letters and spaces)
    const locationPattern = /^[A-Za-z\s]*$/;
    if (!formRef.current?.location.value) {
      formErrors.location = 'Location is required';
      isValid = false;
    } else if (!locationPattern.test(formRef.current?.location.value)) {
      formErrors.location = 'Location can only contain letters and spaces';
      isValid = false;
    }

    // Role Validation
    if (selected === 'Choose...') {
      formErrors.role = 'Please select a role';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the validation errors before submitting.', toastErrorOptions);
      return;
    }

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = passwordValue;
    const phone = formData.get('phone');
    const location = formData.get('location');
    const role = selected.toUpperCase();

    try {
      const response = await fetch("http://localhost:8000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password, phone, location, role })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Something went wrong');
      }

      toast.success(`Successfully added new ${selected}`, toastSuccessOptions);

      // Reset form and role dropdown
      formRef.current?.reset();
      setSelected('Choose...');
      setErrors({ name: '', email: '', password: '', phone: '', location: '', role: '' }); // Clear errors
      setPasswordValue(''); // Clear password value
    } catch (error) {
      toast.error(error.message || "Something went wrong.", toastErrorOptions);
    }
  };

  const handlePasswordVisibilityToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard!', toastSuccessOptions);
    });
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
        style={{ fontFamily: 'Inter, sans-serif', borderRadius: '10px', padding: '8px' }}
        toastStyle={{
          background: '#333',
          color: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '16px 20px',
          fontSize: '14px',
        }}
      />

      <form onSubmit={handleSubmit} ref={formRef} className="flex flex-col gap-4">
        {/* Name Input */}
        <div className='flex gap-4 text-gray-700 font-semibold'>
          <div className='flex-1 flex flex-col gap-1'>
            <label htmlFor="name">Name</label>
            <input
              type="text" name="name" id="name"
              className={`border ${errors.name ? 'border-red-500' : 'border-gray-300'} outline-none rounded-lg p-2 w-full`}
              placeholder='Name'
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>

          {/* Password Input with Eye and Copy Buttons */}
          <div className='flex-1 flex flex-col gap-1 relative'>
            <label htmlFor="password">Password</label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              id="password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'} outline-none rounded-lg p-2 w-full`}
              placeholder='Password'
            />
            <button
              type="button"
              onClick={handlePasswordVisibilityToggle}
              className="absolute right-2 p-1 top-8 text-gray-600"
            >
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <button
              type="button"
              onClick={() => copyToClipboard(passwordValue)}
              className={`absolute right-10 top-9 ${
                !passwordValue 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 cursor-pointer'
              }`}
              disabled={!passwordValue}
            >
              <Clipboard size={20} />
            </button>
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>
        </div>

        {/* Email and Phone Inputs */}
        <div className='flex gap-4 text-gray-700 font-semibold'>
          <div className='flex-1 flex flex-col gap-1'>
            <label htmlFor="email">Email</label>
            <input
              type="email" name="email" id="email"
              className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} outline-none rounded-lg p-2 w-full`}
              placeholder='Email'
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          <div className='flex-1 flex flex-col gap-1'>
            <label htmlFor="phone">Phone</label>
            <input
              type='tel' name="phone" id="phone"
              className={`border ${errors.phone ? 'border-red-500' : 'border-gray-300'} outline-none rounded-lg p-2 w-full`}
              placeholder='Phone'
              maxLength={10}
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
          </div>
        </div>

        {/* Role and Location Inputs */}
        <div className='flex gap-4 text-gray-700 font-semibold'>
          <div className='flex w-full gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <label htmlFor="role">Role</label>
              <div className="relative w-full" ref={dropdownRef}>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className={`border ${errors.role ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2 w-full text-left bg-white cursor-pointer`}
                >
                  <span className={selected === 'Choose...' ? "text-gray-400" : "text-gray-700"}>
                    {selected}
                  </span>
                  <span className="float-right">&#9662;</span>
                </div>
                {isOpen && (
                  <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {options.map((option, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelect(option)}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}
            </div>

            <div className='flex flex-col gap-1 flex-1'>
              <label htmlFor="location">Location</label>
              <input
                type="text" name="location" id="location"
                className={`border ${errors.location ? 'border-red-500' : 'border-gray-300'} outline-none rounded-lg p-2 w-full`}
                placeholder='Location'
              />
              {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
            </div>
          </div>
        </div>

        <div>
          <MainThemeButton text={'Submit'} />
        </div>
      </form>
    </div>
  );
};

export default AddAgentForm;
