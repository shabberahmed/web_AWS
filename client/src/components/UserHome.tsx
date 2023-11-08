import React from "react";
import { useNavigate } from "react-router-dom";
import modisanjayImage from "./SanjayModi.jpg";

const UserHome = () => {
  const navigate = useNavigate();

  const Logout = () => {
    navigate("/");
    localStorage.clear();
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${modisanjayImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Ensures the background image stays fixed while the content scrolls
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px", // Add padding to ensure content doesn't touch the border
        boxSizing: "border-box", // Include padding and border in the element's total width and height
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <div onClick={Logout}>
          <button className="btn btn-lg btn-danger mt-3">
            <i className="fa-solid fa-right-from-bracket"></i>Logout{" "}
          </button>
        </div>

        <div className="flex flex-col home-button-container items-center m-5">
          <button
            className="btn mt-4 w-80 h-40 rounded-lg bg-blue-700 leading-34 text-center drop-shadow-md buttonScale"
            style={{
              backgroundImage:
                'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZYhwPEJbNPzX0KApQk3B2Y954V_30S0h3wA&usqp=CAU")',
            }}
            onClick={() => {
              navigate("/print");
            }}
          >
            <span
              className="text-black text-4xl"
              style={{ textShadow: "10px 10px 10px white" }}
            >
              Fetch Voter
            </span>
            <p className="text-sm text-gray-500">Get a voter print</p>
          </button>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 0.7)",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                margin: "20px",
              }}
            >
              <button
                className="btn home-call-btns"
                style={{ backgroundColor: "green", border: "none" }}
              >
                <a
                  href="tel:+91-9652227222"
                  className="text-sm text-white"
                  style={{ textDecoration: "none" }}
                >
                  <i className="fa-solid fa-phone"></i> Call incharge-1
                </a>
              </button>
            </div>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.7)",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                margin: "20px",
              }}
            >
              <button
                className="btn home-call-btns"
                style={{ backgroundColor: "green", border: "none" }}
              >
                <a
                  href="tel:+91-9652227222"
                  className="text-sm text-white"
                  style={{ textDecoration: "none" }}
                >
                  <i className="fa-solid fa-phone"></i> Call incharge-2
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
