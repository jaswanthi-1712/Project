import Messages from "../models/messages.model.js";

export const createMessage = async (req, res, next) => {
  try {
    //console.log("reached message creation on the backend", req.params);
    //console.log("2", req);
    console.log("3", req.body.userTwo);
    const newMessage = new Messages({
      userOne:req.body.userOne,
      userTwo:req.body.userTwo,
      description:req.body.description
    });
    console.log("new message is", newMessage);
    await newMessage.save();

    res.status(200).send();
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req, res, next) => {
    try {
      const { userOne, userTwo } = req.params; // Assuming you're passing these as URL parameters
  
      const messages = await Messages.find({});
  
      res.status(200).send(messages);
    } catch (err) {
      next(err);
    }
  };