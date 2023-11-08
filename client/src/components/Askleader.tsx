import React from "react";
import { useNavigate } from "react-router-dom";
import flagImage from "./Flag.jpg";

const WarningComponent = () => {
  const navigate = useNavigate();

  function goToHome() {
    navigate("/");
  }

  return (
    <div
      className="container-fluid d-flex flex-column align-items-center justify-content-center position-relative"
      style={{
        backgroundImage: `url(${flagImage})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        backgroundPosition: "center",
      }}
    >
      <div
        className="text-center text-black fw-bold fs-5 position-absolute top-20 start-50 translate-middle"
        style={{ transform: "rotate(-5deg)" }}
      >
        Note: Please consult your Leader for membership in the app.
      </div>
      <div
        className="text-center text-black fw-bold fs-5 position-absolute top-50 start-50 translate-middle"
        style={{ transform: "rotate(-5deg)" }}
      >
        VOTE FOR BJP FOR A BETTER NATION
      </div>
      <button
        className="btn btn-primary fw-bold position-absolute bottom-20 start-50 translate-middle"
        style={{ transform: "rotate(-5deg)" }}
        onClick={goToHome}
      >
        Home
      </button>
    </div>
  );
};

export default WarningComponent;
