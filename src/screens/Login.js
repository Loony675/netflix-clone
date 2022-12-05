import React from "react";
import { useState } from "react";
import SignUp from "./SignUp";

import "../styles/Login.css";

function Login() {
  const [signIn, setSignIn] = useState(false);

  return (
    <div className="login">
      <div className="login_background">
        <img
          className="login_logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="netflix-logo"
        />
        <button className="login_button" onClick={() => setSignIn(true)}>
          S'identifier
        </button>
        <div className="login_gradient"></div>
      </div>
      <div className="login_body">
        {signIn ? (
          <SignUp />
        ) : (
          <>
            <h1>Films, séries et bien plus en illimité.</h1>
            <h2>Où que vous soyez. Annulez à tout moment.</h2>
            <h3>
              Prêt à regarder Netflix ? Saisissez votre adresse e-mail pour vous
              abonner ou réactiver votre abonnement.
            </h3>
            <div className="login_input">
              <form>
                <input type="email" placeholder="Adresse e-mail" />
                <button
                  className="login_commencer"
                  onClick={() => setSignIn(true)}
                >
                  Commencer
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
