"use client"
import { useState,useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';

export default function Add() {
  const sbtn = useRef()
  const defData = {
    name: '',
    email: '',
    phone: '',
    address: '',
    tcnumber: '',
    logo: '',
    password: '',
    confirmPassword: '',
  };

  const deferr = {
    name: '',
    email: '',
    phone: '',
    address: '',
    tcnumber: '',
    logo: '',
    password: '',
    confirmPassword: '',
  }
  const [formData, setFormData] = useState(defData);
  const [errors, setErrors] = useState(deferr);
  function validCp(){
    const { path, createError } = this;
    console.log(this);
    return this.test("validCp","Password Must Match!",(value)=>{
      if(value===formData.password){
        return true
      }else{
        return false;
      }
    })
  }
  yup.addMethod(yup.string,"validCp",validCp);
  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone is required'),
    address: yup.string().required('Address is required'),
    tcnumber: yup.number().required('TC Number is required'),
    logo: yup
      .mixed()
      .test('fileSize', 'Logo image should be less than 20MB', (value) => {
        return value && value.size <= 20000000;
      })
      .test('fileType', 'Invalid image file', (value) => {
        return value && value.type.startsWith('image/');
      }),
    password: yup.string().min(6).max(20).required('Password is required'),
    confirmPassword: yup.string().validCp()
    })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, logo: file });
    validateField('logo', file);
  };

  const validateField = async (name, value) => {
    try {
      await schema.validateAt(name, { [name]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sbtn.current.disabled = true;
    try {
      await schema.validate(formData, { abortEarly: false });
      const { confirmPassword, ...dataWithoutConfirmPassword } = formData;
      dataWithoutConfirmPassword.created_at = new Date();

      const response = await fetch("/api/institute", {
        method: "PUT",
        body: JSON.stringify(dataWithoutConfirmPassword),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.error) {
        toast.error(result.message);
    sbtn.current.disabled = false;

      } else {
        toast.success("Institute Added Successfully!");
        setFormData(defData); // Reset the form after successful submission
    sbtn.current.disabled = false;

      }
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((e) => {
        newErrors[e.path] = e.message;
      });
      setErrors(newErrors);
    sbtn.current.disabled = false;

    }
  };

  return (
    <div className="w-100 shadow-4 rounded m-3 bg-slate-700 p-5">
      <form id="addinstitute" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label><br />
          <input
            type="text"
            className="form-control mb-2"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="text-danger">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label><br />
          <input
          autoComplete='new-password'
            type="email"
            className="form-control mb-2"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="text-danger">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone">Phone</label><br />
          <input
            type="tel"
            className="form-control mb-2"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          {errors.phone && <p className="text-danger">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="address">Address</label><br />
          <input
            type="text"
            className="form-control mb-2"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          {errors.address && <p className="text-danger">{errors.address}</p>}
        </div>
        <div>
          <label htmlFor="tcnumber">TC Number</label><br />
          <input
            type="number"
            className="form-control mb-2"
            id="tcnumber"
            name="tcnumber"
            value={formData.tcnumber}
            onChange={handleInputChange}
          />
          {errors.tcnumber && <p className="text-danger">{errors.tcnumber}</p>}
        </div>
        <div>
          <label htmlFor="logo">Logo</label><br />
          <input
            type="file"
            className="form-control mb-2"
            id="logo"
            name="logo"
            onChange={handleLogoChange}
            required
          />
          {errors.logo && <p className="text-danger">{errors.logo}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label><br />
          <input
          autoComplete='new-password'
            type="password"
            className="form-control mb-2"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <p className="text-danger">{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label><br />
          <input
            type="password"
            className="form-control mb-2"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          {errors.confirmPassword && (
            <p className="text-danger">{errors.confirmPassword}</p>
          )}
        </div>
        <button className="btn btn-primary rounded-pill bg-blue-700" type="submit" ref={sbtn}>
          Save Institute
        </button>
      </form>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}
