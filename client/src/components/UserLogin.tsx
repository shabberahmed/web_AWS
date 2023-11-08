// import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
// import axios, { AxiosError } from 'axios';
// import { useNavigate } from 'react-router-dom';
// import backgroundImage from './background.jpg'; // Update the image path accordingly
// import logo from './Bjplogo.png';
// import SanjayImage from './Sanjay.jpg';

// const UserLogin = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState<string>('');
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSuccessfulLogin = (token: string) => {
//     localStorage.setItem('userToken', token);
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const response = await axios.post('http://localhost:1001/admin/login', formData);
//       const token = (response.data as { token: string }).token; // Type assertion
//       localStorage.setItem("username", (response.data as { name: string }).name);
//       localStorage.setItem("id", (response.data as { id: string }).id);
//       handleSuccessfulLogin(token);
//       if ((response.data as { role: string }).role === "admin") {
//         navigate('/admin/page');
//       } else {
//         navigate('/home');
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError;
//         if (axiosError.response && axiosError.response.data) {
//           setError((axiosError.response.data as { message: string }).message);
//         } else {
//           setError('An error occurred during the login process. Please try again later.');
//         }
//       } else {
//         setError('An unknown error occurred. Please try again later.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false); // Simulating a loading time of 2 seconds
//     }, 2000);

//     return () => clearTimeout(timer); // Clear timeout on component unmount
//   }, []);

//   if (isLoading) {
//     return (
//       <div
//       style={{
//         height: "100vh",
//         width: "100%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: `url(${backgroundImage}) no-repeat center center fixed`,
//         backgroundSize: "cover",
//       }}
//     >
//       <h1 style={{ fontSize: '1.2em' }}>Loading...</h1>
//     </div>
//     );
//   }
//   return (
//     <div
//       style={{
//         height: "100vh",
//         backgroundImage: `url(${SanjayImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "column",
//       }}
//     >
//       <div style={{ width: "80%", maxWidth: 300, backgroundColor: "white", padding: 20,fontSize: '1.2em' }}>
//         <img src={logo} alt="logo" style={{ marginBottom: 10, width: '30%' }} />
//         <form onSubmit={handleSubmit}>
//           {error && <div className="alert alert-danger">{error}</div>}
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">
//               Email address
//             </label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">
//               Password
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </div>
//           <button type="submit" className="btn bg-blue-400" style={{ width: '100%',fontSize: '1.2em' }}>
//             Login
//           </button>
//         </form>
//         <p style={{ marginTop: 10, textAlign: "center",fontSize: '1.2em' }}>
//           Don't have an account? <a href="/user/signup">Signup</a>.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "./Mobilebjp.jpg"; // Update the image path accordingly
import logo from "./Bjplogo.png";
import SanjayImage from "./Sanjay.jpg";
import axios, { AxiosError } from "axios";

const UserLogin = () => {
  const handleSuccessfulLogin = (token: string) => {
    localStorage.setItem("userToken", token);
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:1001/admin/login`,
        formData
      );
      const token = (response.data as { token: string }).token; // Type assertion

      // Storing name and id in localStorage
      const { name, id } = response.data;
      localStorage.setItem("username", name); // Store name directly from response.data
      localStorage.setItem("id", id);

      console.log("Token:", token);
      console.log("Username:", name);
      console.log("ID:", id);

      handleSuccessfulLogin(token);
      if ((response.data as { role: string }).role === "admin") {
        navigate("/admin/page");
        console.log("this is data", response.data);
      } else {
        navigate("/home");
        console.log("this is data", response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.data) {
          setError((axiosError.response.data as { message: string }).message);
          console.log(
            "Error Message:",
            (axiosError.response.data as { message: string }).message
          );
        } else {
          setError(
            "An error occurred during the login process. Please try again later."
          );
          console.log("Unknown Error");
        }
      } else {
        setError("An unknown error occurred. Please try again later.");
        console.log("Unknown Error");
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulating a loading time of 2 seconds

    return () => clearTimeout(timer); // Clear timeout on component unmount
  }, []);

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
          backgroundSize: "contain",
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
          width: "80%",
          maxWidth: 300,
          backgroundColor: "white",
          padding: 20,
          fontSize: "1.2em",
        }}
      >
        <img src={logo} alt="logo" style={{ marginBottom: 10, width: "30%" }} />
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn bg-blue-400"
            style={{ width: "100%", fontSize: "1.2em" }}
          >
            Login
          </button>
        </form>
        <p style={{ marginTop: 10, textAlign: "center", fontSize: "1.2em" }}>
          Don't have an account? <a href="/Askleader">Signup</a>.
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
