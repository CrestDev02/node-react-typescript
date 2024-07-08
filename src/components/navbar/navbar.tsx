import { FC, useContext, useEffect, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";

export const Navbar: FC = () => {
  const navigate = useNavigate();

  const [isLogedIn, setIsLogedIn] = useState<boolean>(false);

  useEffect(() => {
    if (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("token") !== ""
    ) {
      setIsLogedIn(true);
    }
  }, [isLogedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogedIn(false);
    navigate("/");
  };

  return (
    <div className="navContainer">
      <div className="navbar">
        <Link to="/" className="logo">
          <strong>Dev Collaborator</strong>
        </Link>
        <div className="navLinks">
          {isLogedIn ? (
            <>
              <Link to="/developers">
                <strong>Developers</strong>
              </Link>
              <Link to="/profile">
                <strong>Profile</strong>
              </Link>
              <Link to="/">
                <span onClick={handleLogout}>
                  <strong>Logout</strong>
                </span>
              </Link>
            </>
          ) : (
            <Link to="login">
              <strong>Login</strong>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
