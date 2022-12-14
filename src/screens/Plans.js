import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { db } from "../firebase";
import "../styles/Plans.css";
import { loadStripe } from "@stripe/stripe-js";

export default function Plans() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);

  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds, // conveti en secondes
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);

  useEffect(() => {
    //fetch des produits avec 'active' == true
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceID: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  const loadCheckout = async (priceID) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceID,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        //Affiche une erreur au user et inspecter la cloud function dans la console firebase
        alert(`Une erreur s'est produite: ${error.message}`);
      }
      if (sessionId) {
        // user connecté, redirection et init Stripe
        const stripe = await loadStripe(
          "pk_test_51MEW0QL6jRpDTW9TQEfhvL8NiVdh5xI51i14a5fOdqDbe7CqAaikc7lf6gIsJLbeYcGujpoxBdftQVZuKqRnn838000iV1iEJn"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };
  return (
    <div className="plansScreen">
      {subscription && (
        <p>
          Date de renouvellement:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {/* mapper dans l'objet */}
      {Object.entries(products).map(([productId, productData]) => {
        // savoir si le user a un abonnement actif
        // savoir quel abo est en cours
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);
        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "planScreen_abonnement_actif"
            } plansScreen_abonnement`}
          >
            <div className="plansScreen_info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceID)
              }
            >
              {isCurrentPackage ? "Abonnement en cours" : "Souscrire"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
