const studentSchema = require("./studentSchema");

const studentRegistration = async (req, res) => {  
  const { userName, email, password, phoneNumber } = req.body;
  console.log(req.body);
  
  if (!userName || !email || !password || !phoneNumber) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingStudent = await studentSchema.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Email is already registered." });
    }
    const student = new studentSchema({
      studentName: userName,
      email,
      password,
      contact: phoneNumber,
    });
    const response = await student.save();
    res
      .status(201)
      .json({ message: "Registration successful!", data: response });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

const studentLogin = (req, res) => {
  const { email, password } = req.body; 
  const pass = parseInt(password);

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if(!/^\S+@\S+\.\S+$/.test(email)){
    return res.status(400).json({ message: "Enter Valid Email Address" });
  }

  studentSchema
    .findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          data: user,
        });
      }

      if (user.password !== pass) {
        return res.status(400).json({
          message: "Password incorrect",
        });
      }

      return res.status(200).json({
        message: "Logged in successfully",
        data: user,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Server error" });
    });
};

const findStudent = (req, res) => {
  const { _id } = req.body;
  if (!_id) {
    return res.status(400).json({
      message: "ID is required",
    });
  }
  studentSchema
    .findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          message: "No user found",
          data: user,
        });
      }
      res.status(200).json({
        message: "Success",
        data: user,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Server error" });
    });
};

const studentCheckMail = (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "Enter your email",
    });
  }
  studentSchema
    .findOne({ email })
    .then((response) => {
      console.log(response);
      
      if (!response) {
        return res.status(400).json({
          message: "user not found",
        });
      }
      return res.status(200).json({
        message: "success",
        data: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        messsge: "error occured",
      });
    });
};

const setNewPassword=(req,res)=>{
  const{email,password}=req.body
  if(!password){
    return res.status(400).json({
      message:'Enter Your Password'
    })
  }
  const pass=password.toString().split('').length  
  if(pass<6){
    return res.status(400).json({
      message:'password length should be atleast 6'
    })
  }
  if(isNaN(password)){
    return res.status(400).json({
      message:'password should be a number'
    })
  }
  studentSchema.findOneAndUpdate({email,password})
  .then((data)=>{
    return res.status(200).json({
      data:data,
      message:"changed successfully"
    })
  })
  .catch((err)=>{
    res.status(500).json({
      messsge: "error occured",
    });
  })
}

const getAllStudents=(req,res)=>{
  studentSchema.find()
  .then((student)=>{
    if(!student||student.length===0){
      return 
      res.status(404).json({
        msg:"no students found"
      })
    }
    res.status(200).json(student)
  })
  .catch((err)=>{
    console.log(err,"error in fetching students");
    res.status(500).json({
      msg:"an error accured while fetching students"
    })
  });
};

module.exports = {
  studentRegistration,
  studentLogin,
  findStudent,
  studentCheckMail,
  setNewPassword,
  getAllStudents
};
