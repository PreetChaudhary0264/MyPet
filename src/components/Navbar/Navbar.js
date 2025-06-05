import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../../context/UserContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef();

  const navigate = useNavigate();

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function registerhandler(){
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(!user){
        
        toast.success("Please login before registering your pet...", {
         position: "top-center",
         autoClose: 2000
         });
      navigate('/signup');
    }else{
      toast.success("now good",{
        position:"top-center",
        autoClose:2000
      })
    }
  }

  // const handleLogout = () => {
  //   sessionStorage.removeItem('token'); // or remove cookie if using cookies
  //   // optionally, call logout API on server
  //   navigate('/'); // redirect to homepage
  // };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          MyPet 🐾
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">Home</Link>
          </li>
          <li  onClick={registerhandler} className="nav-item">
            <Link to="/register" className="nav-links">Register Pet</Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/my-pets" className="nav-links">My Pets</Link>
          </li> */}
          <li className="nav-item">
            <Link to="/generate-qr" className="nav-links">Generate QR</Link>
          </li>

          {!user ? (
            <li className="nav-item">
              <Link to="/signup" className="nav-links">Sign Up</Link>
            </li>
          ) : (
            <li className="nav-item profile-dropdown" ref={profileRef}>
              <button
                className="profile-icon"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                👤
              </button>
              {showProfileMenu && (
  <div className="profile-menu">
    <p><strong>Name:</strong> {user.name}</p>
    <p><strong>Email:</strong> {user.email}</p>
    <p><strong>Phone:</strong> {user.phone}</p>
    <Link to="/update-profile" className="update-button">
      Update Profile
    </Link>
    <button onClick={logout} className="logout-button">
      Logout
    </button>
  </div>
)}

            </li>
          )}
        </ul>
      </div>
       <ToastContainer />
    </nav>
  );
};

export default Navbar;



