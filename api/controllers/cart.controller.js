import cart from "../models/cart.model.js";
import Gig from "../models/gig.model.js";
import User from "../models/user.model.js";


export const intent = async (req, res, next) => {
  try {
    //console.log("reached intent payment on the backend", req.params);
    const gig = await Gig.findById(req.params.id);
    //console.log("gig is", gig);

    const newcart = new cart({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.body.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: "SIMULATED_PAYMENT_INTENT_ID",
    });
    //console.log("new cart is", newcart);
    await newcart.save();

    res.status(200).send({
      clientSecret: "SIMULATED_CLIENT_SECRET",
    });
  } catch (err) {
    next(err);
  }
};

export const getcarts = async (req, res, next) => {
  try {
     //console.log("1",req.params.id);
    const user = await User.findById(req.params.id);
     //console.log("2",user);
    
    let carts;
    if (!user.isSeller) {
       // console.log("3",user);
        carts = await cart.find({
            buyerId: req.params.id,
        });
        //console.log("4");
    }
   // console.log("5");
    res.status(200).send(carts);
  } catch (err) {
    next(err);
  }
};
export const deletecarts = async (req, res, next) => {
  try {
    //console.log("1",req.params.id,req.body,req.body.gigId);
    const user = await User.findById(req.params.id);
    //console.log("2",user);
    
    if (!user.isSeller) {
      const buyerId = req.params.id;
      const gigId = req.body.gigId; // Assuming you pass gigId in the request body
      //console.log("3",buyerId,gigId);
      
      await cart.deleteOne({
        buyerId: buyerId,
        gigId: gigId,
      });

      
      //console.log("4");
      res.status(200).send({ message: "Cart item deleted successfully." });
    } else {
      res.status(403).send({ message: "Only buyers can delete cart items." });
    }
  } catch (err) {
    //console.log("5",err);
    next(err);
  }
};



