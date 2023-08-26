import React, { useState } from "react"; // Import useState
import { useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useLocation ,useParams} from "react-router-dom"; // Import useLocation
import { useQuery ,useMutation} from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";


const Messages = () => {
  const { sellerId, buyerId } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to access state from the previous page

  const { isLoading, error, data } = useQuery(["message"], async () => {
    const response = await newRequest.get(`/messages`);
    return response.data;
  });

  const [messageText, setMessageText] = useState(""); // State for message text

  const isCurrentUserSeller = currentUser.isSeller;

  // Mutation function for sending new message
  const sendMessageMutation = useMutation(async () => {
    //console.log(location.state);
    const requestBody = {
      userOne: currentUser._id,
      userTwo:isCurrentUserSeller ? buyerId : sellerId, // Assuming this is the buyerId passed from Orders
      description: messageText,
    };
    console.log(requestBody);
    await newRequest.post("/messages", requestBody);
  }, {
    onSuccess: () => {
      // Invalidate and refetch the data after successful mutation
      navigate(`/messages/${sellerId}/${buyerId}`);
     // window.location.reload();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageText.trim() !== "") {
      sendMessageMutation.mutate(); // Trigger the mutation
      setMessageText(""); // Clear the message text after sending
    }
  };


  return (
    <div className="orders">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>  {isCurrentUserSeller ? "Buyer" : "Seller"}</th>
                <th>You</th>
              </tr>
            </thead>
            <tbody>
              {data.map((message) => (
                <tr key={message._id}>
                  <td>
                    {message.userTwo === currentUser._id
                      ? message.description
                      : ""}
                  </td>
                  <td>
                    {message.userOne === currentUser._id
                      ? message.description
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="add">
            <h3>Type your message</h3>
            <form action="" className="addForm" onSubmit={handleSubmit}>
              <input type="text" 
              value={messageText} // Bind input value to messageText state
              onChange={(e) => setMessageText(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
