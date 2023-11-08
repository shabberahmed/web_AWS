import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import backgroundImage from "./AmithNadda.jpg";

interface User {
  _id: string;
  name: string;
  email: string;
  mobile: string; // Add the mobile field
}

const Allforms = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1001/getusers/${localStorage.getItem(
            "id"
          )}`
        ); // Replace with your API endpoint
        setUsers(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="container"
      style={{
        marginTop: "50px",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Link
        to="/admin/page"
        className="btn btn-primary"
        style={{
          fontSize: "1.2rem",
          padding: "10px 20px",
          borderRadius: "5px",
        }}
      >
        Home
      </Link>
      <h1 className="my-4" style={{ textAlign: "center", fontSize: "2.5rem" }}>
        All Karyakartha
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ul
          className="list-group"
          style={{ width: "50%", marginBottom: "50px" }}
        >
          {users.map((user) => (
            <li
              key={user._id}
              className="list-group-item"
              style={{
                marginBottom: "20px",
                padding: "15px",
                borderRadius: "5px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
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
                <p style={{ fontSize: "1.2rem", color: "#555" }}>
                  {user.email}
                </p>
                <a
                  href={`tel:${user.mobile}`}
                  className="btn btn-success"
                  style={{ marginTop: "10px" }}
                >
                  Call
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Allforms;
