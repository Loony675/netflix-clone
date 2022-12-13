import React from "react";
import "../styles/Nav.css";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

export default function NavScreen() {
  const [show, handleShow] = useState(false);

  const navigate = useNavigate();

  const transitioNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitioNavBar);
    return () => {
      window.removeEventListener("scroll", transitioNavBar);
    };
  }, []);
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <div className="nav_contents">
        <img
        onClick={()=> navigate('/')}
          className="nav_logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="netflix-logo"
        />
        <img
          onClick={() => navigate("/profile")}
          className="nav_profil"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="avatar-pic"
        />
      </div>
    </div>
  );
}
