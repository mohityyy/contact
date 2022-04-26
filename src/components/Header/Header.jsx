import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => {
  return (
    <div className="header-top">
      <li>
         
        <p> <Link to={"/"}>
              Home
          </Link></p>
          <p> <Link to={"/add-contact"}>
              Add Contact
          </Link></p>
        
      </li>
    </div>
  );
};

export default Header;
