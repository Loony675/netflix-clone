import React from "react";
import "../styles/SignUp.css";

export default function SignUp() {
  return (
    <div className="signUp">
      <form>
        <h1>S'identifier</h1>
        <input placeholder="Email ou numéro de téléphone" type="email"></input>
        <input placeholder="Mot de passe" type="password"></input>
        <button type="submit">S'identifier</button>
        <h4>
          <span className="signUp_greyText">Première visite sur Netflix ?</span> Inscrivez-vous.
        </h4>
      </form>
    </div>
  );
}
