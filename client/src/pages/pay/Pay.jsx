import React from "react";
import "./Pay.scss";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const Pay = () => {
  return (
    <div className="pay">
      <div className="container">
        <h1>Payment Page</h1>
        <CheckoutForm />
      </div>
    </div>
  );
};

export default Pay;
