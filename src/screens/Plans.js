import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import "../styles/Plans.css";

export default function Plans() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    //fetch des produits avec 'active' == true
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async productDoc => {
            products[productDoc.id] = productDoc.data();
            const priceSnap = await productDoc.ref.collection('prices').get();
            priceSnap.docs.forEach(price => {
                products[productDoc.id].prices = {
                    priceID: price.id,
                    priceData: price.data()
                };
            });
        });
        setProducts(products);
      });
  }, []);

  const loadCheck = async (priceID) => {

  
  }
  return <div className="plans">
    {/* mapper dans l'objet */}
    {Object.entries(products).map(([productId, productData]) => {
        // savoir si le user a un abonnement actif
        return (
            <div key={productId} className='abonnement'>
                <div className="plans_info">
                    <h5>{productData.name}</h5>
                    <h6>{productData.description}</h6>
                    <button onClick={()=> loadCheck(productData.prices.priceID)}>Choisir cette formule</button>
                </div>
            </div>
        )
    })}
  </div>;
}
