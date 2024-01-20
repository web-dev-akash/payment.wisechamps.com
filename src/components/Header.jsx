import React from "react";
import logo from "../assets/logo.png";

export const Header = () => {
  return (
    <header
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
      }}
      className="animate__animated animate__fadeInLeft"
    >
      <img src={logo} alt="Wisechamps" width={"120px"} />
    </header>
  );
};
