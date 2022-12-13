import React from "react";
import { auth } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import "../styles/Profile.css";
import Nav from "./Nav";
import Plans from "./Plans";

export default function Profile() {
  const user = useSelector(selectUser);
  return (
    <div className="profil">
      <Nav />
      <div className="body">
        <h1>Edit profile</h1>
        <div className="info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="avatar-pic"
          />
          <div className="details">
            <h2>{user.email}</h2>
            <div className="plans">
              <h3>Abonnements</h3>
              <Plans />
              <button className="signOut" onClick={() => auth.signOut()}>
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
