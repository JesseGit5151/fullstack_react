import React from "react";
import { useNavigate  } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear()
    navigate('/auth/login')
  }

  return (
    <nav>
      <Link to="/posts">Home</Link>
      <img src='' />;
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
