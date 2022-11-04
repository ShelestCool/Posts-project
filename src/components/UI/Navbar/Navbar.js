import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contex";
import MyButton from "../button/MyButton";

const Navbar = () => {
  const { setIsAuth } = useContext(AuthContext);

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
  };
  return (
    <div className="navbar">
      <div className="navbar__links">
        <Link to="/posts">Posts</Link>
        <Link to="/about">About</Link>
      </div>
      <MyButton onClick={logout}>Выйти</MyButton>
    </div>
  );
};

export default Navbar;
