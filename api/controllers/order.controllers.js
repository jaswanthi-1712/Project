import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
import User from "../models/user.model.js";

export const intent = async (req, res, next) => {
  try {
    console.log("reached intent payment on the backend", req.params);
    const gig = await Gig.findById(req.params.id);
    console.log("gig is", gig);

    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.body.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: "SIMULATED_PAYMENT_INTENT_ID",
    });
    console.log("new order is", newOrder);
    await newOrder.save();

    res.status(200).send({
      clientSecret: "SIMULATED_CLIENT_SECRET",
      gigId: gig._id, // Include the gigId in the response
    });
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    // Fetch the user details to determine the user type (buyer or seller)
    // console.log(req.params);
    const user = await User.findById(req.params.id);

    let orders;
    if (user.isSeller) {
      // Fetch orders where the requesting user is the buyer
      // console.log("reached seller of order controllers");
      orders = await Order.find({
        sellerId: req.params.id,
      });
    } else {
      // console.log("reached buyer of order controllers");
      // Fetch orders where the requesting user is the seller
      orders = await Order.find({
        buyerId: req.params.id,
      });
    }

    // console.log("final data sent form getOrders is", orders);
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};
