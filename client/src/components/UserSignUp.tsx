import React, { useState, useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SanjayImage from "./Sanjay.jpg";
import backgroundImage from "./background.jpg";
import logo from "./Bjplogo.png";

const Signup = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    oid: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigateToAdminPage = () => {
    navigate("/admin/page");
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Simulating a loading time of 2 seconds
    }, 1000);

    return () => clearTimeout(timer); // Clear timeout on component unmount
  }, []);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:1001/user/signup`,
        formData
      );
      setIsSignedUp(true);
      console.log(response.data);
      setTimeout(() => {
        navigate("/admin/page", { replace: true }); // Redirect to the home page and replace the current entry
      }, 2000); // Simulating a loading time of 2 seconds

      // You can redirect the user to a success page or do other actions here.
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response && axiosError.response.data) {
          setError(axiosError.response.data.message);
        } else {
          setError(
            "An error occurred during the signup process. Please try again later."
          );
        }
      } else {
        setError("An unknown error occurred. Please try again later.");
      }
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: `url(${backgroundImage}) no-repeat center center fixed`,
          backgroundSize: "cover",
        }}
      >
        <h1 style={{ fontSize: "1.2em" }}>Loading...</h1>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url(${SanjayImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: 300,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: 15,
          borderRadius: 10,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{ marginBottom: 15, width: "100%", borderRadius: 5 }}
        />
        <button
          onClick={navigateToAdminPage}
          style={{
            backgroundColor: "#ff6f61",
            color: "white",
            fontWeight: "bold",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          Home
        </button>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger" style={{ fontSize: "1.2em" }}>
              {error}
            </div>
          )}
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                fontSize: "1.2em",
                padding: 10,
                marginBottom: 10,
                borderRadius: 5,
              }}
            />
          </div>
          <div className="mb-2">
            <input
              type="email"
              className="form-control"
              placeholder="Email address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                fontSize: "1.2em",
                padding: 10,
                marginBottom: 10,
                borderRadius: 5,
              }}
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                fontSize: "1.2em",
                padding: 10,
                marginBottom: 10,
                borderRadius: 5,
              }}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              style={{
                fontSize: "1.2em",
                padding: 10,
                marginBottom: 10,
                borderRadius: 5,
              }}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="OID"
              name="oid" // Update the name attribute to "oid"
              value={formData.oid}
              onChange={handleChange}
              style={{
                fontSize: "1.2em",
                padding: 10,
                marginBottom: 10,
                borderRadius: 5,
              }}
            />
          </div>

          <button
            type="submit"
            className="btn bg-blue-400"
            style={{
              width: "100%",
              fontSize: "1.2em",
              padding: 10,
              borderRadius: 5,
            }}
          >
            Sign Up
          </button>
        </form>
        <p style={{ marginTop: 10, textAlign: "center", fontSize: "1.2em" }}>
          Already a member? <a href="/">Login</a>.
        </p>
      </div>
      {isSignedUp && (
        <p
          className="animate__animated animate__fadeIn" // Add the CSS animation classes
          style={{ marginTop: 10, textAlign: "center", fontSize: "1.2em" }}
        >
          User successfully signed up!
        </p>
      )}
    </div>
  );
};

export default Signup;
