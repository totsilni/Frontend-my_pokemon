import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to={"/"}>
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
          }
          alt=""
        />
      </Link>

      <Search />
      <div></div>
    </div>
  );
};

export default Navbar;
