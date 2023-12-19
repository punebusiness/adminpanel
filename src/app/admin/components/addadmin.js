"use client"
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Load from "./load"
const dfdata = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  joining_date:new Date()
}
const AddAdminForm = () => {
  const [formData, setFormData] = useState(dfdata);

  const [errors, setErrors] = useState({});
const [load,setLoad] = useState('')
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(<Load/>)
    if (!validateForm()) {
      setLoad('')
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if(data.error){
        toast.error(data.message);
        setLoad("")
      }
      if (response.ok) {
        toast.success('Admin added successfully!');
        setLoad("")
        e.target.reset()
        setFormData(dfdata)
      } else {
        toast.error(data.error || 'Failed to add admin.');
        setLoad("")
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An unexpected error occurred.');
      setLoad("")
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {load}
      <form id="addadminform" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full text-black mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.name && 'border-red-500'}`}
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="new-password"
            className={`w-full text-black mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.email && 'border-red-500'}`}
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-600">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
            className={`w-full text-black mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.phone && 'border-red-500'}`}
            required
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            className={`w-full text-black mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.password && 'border-red-500'}`}
            required
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-600">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            className={`w-full mt-1 p-2 text-black border rounded-md focus:outline-none focus:border-blue-500 ${errors.confirmPassword && 'border-red-500'}`}
            required
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Add Admin
        </button>
      </form>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default AddAdminForm;
