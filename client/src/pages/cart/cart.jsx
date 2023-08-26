import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery(["Cart"], async () => {
    const response = await newRequest.get(`/cart/${currentUser._id}`);
    return response.data;
  });

  const createOrderMutation = useMutation(
    (gigId) =>
      newRequest.post(`/orders/create-payment-intent/${gigId}`, {
        userId: currentUser._id,
      }),
    {
      onSuccess: async (response) => {
        console.log("Order placed:", response);

        const gigId = response.data.gigId; 

        // Delete the cart item after successful payment
        try {
          await newRequest.delete(`/cart/${currentUser._id}`, {
            data: { gigId: gigId } , // Adjust the response data structure
          });
          console.log("Cart item deleted successfully.");
        } catch (error) {
          console.error("Error deleting cart item:", error);
        }

        // Navigate to orders page after successful payment and deletion
        navigate(`/orders/${currentUser._id}`);
        //window.location.href = `/carts/${currentUser._id}`;
      },
      onError: (error) => {
        console.error("Error placing order:", error);
      },
    }
  );

  const handlePay = async (cartItem) => {
    try {
      console.log(cartItem.gigId);
      await createOrderMutation.mutateAsync(cartItem.gigId);
    } catch (error) {
      console.log("Error creating order:", error);
    }
  };




  return (
    <div className="orders">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "An error occurred."
      ) : (
        <div className="container">
          <div className="title">
            <h1>Cart</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Click to Pay</th> {/* New column */}
              </tr>
            </thead>
            <tbody>
              {data.map((cartItem) => (
                <tr key={cartItem.id}>
                  <td>{cartItem.title}</td>
                  <td>{cartItem.price}</td>
                  <td>
                    <button onClick={() => handlePay(cartItem)}>Click to Pay</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cart;
