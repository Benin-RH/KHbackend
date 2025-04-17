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
      message: "message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Server error while sending contact message",
    });
  }
};

const getUserMessage= async (req,res)=>{

 try{
    const id=req.params.id;

    if(!id){
      return res.status(400).json({
        error:"user id required"
      })
    }

  const message = await messageSchema.find({userId:id})

  if(!message){
    return res.status(400).json({
      error:"no message found"
    })
  }
  res.status(200).json(message);
 }catch{
  res.status(500).json({
    error:"something went wrong"
  })
 }


};

module.exports = {
  sendMessage,
  getUserMessage
};
