import React, { useState } from "react";
import axios from "axios";
import logo from "./Bjplogo.png";

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:1001/admin/signup",
        formData
      );
      console.log(response.data);
    } catch (error: any) {
      setError(error.response.data.message); // Assuming the error response contains a "message" property
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <img
        src={logo}
        alt="logo"
        style={{
          display: "block",
          margin: "auto",
          marginBottom: "20px",
          width: "100px",
        }}
      />
      <h2
        style={{ color: "orange", textAlign: "center", marginBottom: "20px" }}
      >
        Admin Sign Up
      </h2>
      <p
        style={{
          fontSize: "12px",
          color: "gray",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        We do not share your information with anyone.
      </p>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              width: "100%",
            }}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              width: "100%",
            }}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              width: "100%",
            }}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            style={{
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              width: "100%",
            }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{
            width: "100%",
            backgroundColor: "orange",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            color: "white",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminSignup;
