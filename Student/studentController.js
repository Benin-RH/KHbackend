const studentSchema = require("./studentSchema");

const studentRegistration = async (req, res) => {
  const { userName, email, password, phoneNumber } = req.body;

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
  const { email, password } = req.body; // Extract email and password
  const pass = parseInt(password);

  if (!email || !pass) {
    return res.status(400).json({ message: "All fields are required" });
  }

  studentSchema.findOne({ email })
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
        data:{
          studentName:user.studentName,
          contact:user.contact,
          email:user.email,
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Server error" });
    });
};

module.exports = {
  studentRegistration,
  studentLogin,
};
