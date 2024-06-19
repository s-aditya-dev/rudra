import React, { useState } from "react";
import newRequest from "../../../../utils/newRequest.js";
import { useNavigate } from "react-router-dom";
import './AddUser.css';

import Unauthorized from '../../../../Components/Unauthorized/Unauthorized.jsx'

const AddUser = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  console.log(currentUser.manager);

  const [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    admin: false,
    dob_date: null,
    dob_month: null,
    dob_year: null,
    phone: null,
    alt_phone: null,
    address: "",
    pincode: null,
    manager: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAdmin = (e) => {
    setUser((prev) => ({
      ...prev,
      admin: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newRequest.post("/auth/userRegister", { ...user });
      if (!user.admin) navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  if (!currentUser) {
    return <Unauthorized />;
  }

  if (!currentUser.admin) {
    return <Unauthorized />;
  }

  return (
    <div className="reg-form">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <h2>Personal Information</h2>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" onChange={handleChange} />

        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" onChange={handleChange} />

        <label htmlFor="dob_date">Birth Date</label>
        <input id="dob_date" name="dob_date" type="number" placeholder="dd" onChange={handleChange} />

        <label htmlFor="dob_month">Birth Month</label>
        <input id="dob_month" name="dob_month" type="number" placeholder="mm" onChange={handleChange} />

        <label htmlFor="dob_year">Birth Year</label>
        <input id="dob_year" name="dob_year" type="number" placeholder="yyyy" onChange={handleChange} />

        <h2>Contact Information</h2>
        <label htmlFor="address">Address</label>
        <input id="address" name="address" type="text" onChange={handleChange} />

        <label htmlFor="pincode">Pin Code</label>
        <input id="pincode" name="pincode" type="number" onChange={handleChange} />

        <h2>Security</h2>
        <label htmlFor="phone">Phone No.</label>
        <input id="phone" name="phone" type="number" onChange={handleChange} />

        <label htmlFor="alt_phone">Alternate Phone No.</label>
        <input id="alt_phone" name="alt_phone" type="number" onChange={handleChange} />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" onChange={handleChange} />

        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" onChange={handleChange} />

        <label htmlFor="manager">Manager</label>
        <select id="manager" name="manager" required onChange={handleChange}>
                <option value="" disabled selected>
                  Select Manager
                </option>
                <option value="source">Source</option>
                <option value="relation">Relation</option>
                <option value="closing">Closing</option>
              </select>

        <label>
          <input type="checkbox" name="admin" onChange={handleAdmin} /> Admin
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUser;
