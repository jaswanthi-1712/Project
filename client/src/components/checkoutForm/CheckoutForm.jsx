import React, { useState } from "react";

const CheckoutForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulating a payment process with a delay using setTimeout
    // Replace this with your actual payment gateway integration logic
    try {
      // Simulate payment processing time (2 seconds delay)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      setMessage("Payment successful!");
    } catch (error) {
      setIsLoading(false);
      setMessage("Payment failed. Please try again.");
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button disabled={isLoading} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
