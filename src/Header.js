import React from "react";
import logo from "./assets/ultima-online-logo.png";

const Header = () => {
  return (
    <div className="header">
      <img alt="ultima-online-logo" style={{ height: "100px" }} src={logo} />
      <span style={{ fontSize: "50px", color: "#404040" }}>MIB Assistant</span>
    </div>
  );
};

export default Header;
