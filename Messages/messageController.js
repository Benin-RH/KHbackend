const messageSchema = require("./messageSchema");

const sendMessage = async (req, res) => {    
  try {
    const { userId,userName, userEmail, userSubject, userMessage } = req.body;
    const newMessage = new messageSchema({
      userId,
      userName,
      userEmail,
      userSubject,
      userMessage,
    });
    await newMessage.save();

    return res.status(201).json({
      message: "Contact message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Server error while sending contact message",
    });
  }
};

const getUserMessage=()=>{

}

module.exports = {
  sendMessage,
};
