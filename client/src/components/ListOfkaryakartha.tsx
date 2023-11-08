import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UserData {
  [x: string]: any;
  name: string;
  vid: string;
  partno: string;
  tel: string;
  _id: string;
}

function Allforms() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1001/form/${localStorage.getItem(
          "id"
        )}`
      );
      const data = response.data.data.filter(
        (item: any) => Object.keys(item).length !== 0
      ); // Filtering out empty objects
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const navigateToAdminPage = () => {
    navigate("/admin/page");
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <button
        onClick={navigateToAdminPage}
        style={{
          backgroundColor: "#ff6f61",
          color: "white",
          fontWeight: "bold",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          marginTop: "20px",
        }}
      >
        Home
      </button>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "40px", color: "#333" }}>
        All Voters Data
      </h1>
      {userData.map((user, index) => (
        <div
          key={index}
          style={{
            width: "300px",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "lightgoldenrodyellow",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.3s",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p
              style={{
                fontSize: "1.4rem",
                fontWeight: "bold",
                color: "darkorange",
                marginBottom: "10px",
              }}
            >
              {user.name}
            </p>
            <p style={{ fontSize: "1.2rem", color: "#555" }}>VID: {user.vid}</p>
            <p style={{ fontSize: "1.2rem", color: "#555" }}>
              Part Number: {user.partno}
            </p>
            <p style={{ fontSize: "1.2rem", color: "#555" }}>
              Telephone: {user.tel}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Allforms;
