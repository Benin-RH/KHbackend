const staffschema = require("./staffschema");

const staffRegistration = async (req, res) => {
  const { Name, Email, Password, Contact } = req.body;

  // Validate Input
  if (!Name || !Email || !Password || !Contact) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check for duplicate email
    const existingStaff = await staffschema.findOne({ Email });
    if (existingStaff) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Save the staff to the database
    const staff = new staffschema({
      staffname: Name,
      email:Email,
      password:Password,
      contact: Contact,
    });
    const response = await staff.save();
    res.status(201).json({ message: "Registration successful!", data: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};


module.exports = {
  staffRegistration,
};
