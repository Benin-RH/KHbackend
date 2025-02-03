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
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  const user = studentSchema.findOne({ email })
    user
    .then((user) => {
      let pass = user?user.password:'';
      if (!user) {
        res.status(404).json({
          msg: "User not found",
          data: user,
        });
      } else if (pass !== password) {
        res.json({
          msg: "password incorrect try again",
        });
      } else if (pass === password) {
        res.json({
          msg: "Logged in successfully",
          data: user,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({msg:'server Error'})
    });
};

module.exports = {
  studentRegistration,
  studentLogin,
};
