import { addListener } from "@reduxjs/toolkit";
import React, { useRef } from "react";
import { auth } from "../firebase";
import "../styles/SignUp.css";

export default function SignUp() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
      
  };

  return (
    <div className="signUp">
      <form>
        <h1>S'identifier</h1>
        <input
          ref={emailRef}
          placeholder="Email ou numéro de téléphone"
          type="email"
        ></input>
        <input
          ref={passwordRef}
          placeholder="Mot de passe"
          type="password"
        ></input>
        <button type="submit" onClick={signIn}>
          S'identifier
        </button>
        <h4>
          <span className="signUp_greyText">Première visite sur Netflix ? </span>
          <span className="signUp_link" onClick={register}>
            Inscrivez-vous.
          </span>
        </h4>
      </form>
    </div>
  );
}
