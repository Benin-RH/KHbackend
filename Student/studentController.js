const studentSchema = require("./studentSchema");

const studentRegistration = async (req, res) => {
  const { userName, email, password, phoneNumber } = req.body;

  // Validate Input
  if (!userName || !email || !password || !phoneNumber) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check for duplicate email
    const existingStudent = await studentSchema.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Save the student to the database
    const student = new studentSchema({
      studentName: userName,
      email,
      password,
      contact: phoneNumber,
    });
    const response = await student.save();
    res.status(201).json({ message: "Registration successful!", data: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

module.exports = {
  studentRegistration,
};
