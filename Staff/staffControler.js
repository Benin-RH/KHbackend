const staffschema = require('./staffschema');

const staffRegistration = (req, res) => {
  let { Name, Email:email, Password, Contact } = req.body;

  let pass = Password.toString().split("").length;  
  if (!Name || !email || !Password || !Contact) {
    return res.status(400).json({ message: "All fields are required." });
  }
  staffschema.findOne({ email })
    .then((existingStaff) => {

      console.log(existingStaff);
      if (existingStaff) {
        return res.status(400).json({ message: "Email already exists" });
      }
      if (pass < 6) {
        return res.status(400).json({ message: "Password length must be at least 6" });
      }

      if (isNaN(Password)) {
        return res.status(400).json({ message: "Your password should be a number" });
      }

      const staff = new staffschema({
        staffname: Name,
        email,
        password: Password,
        contact: Contact,
      });

      staff.save()
        .then((response) => {
          return res.status(200).json({
            data: response,
            message: "Registration success",
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "An error occurred while saving the staff.",
          });
        });

    })
    .catch((err) => {
      return res.status(500).json({
        message: "An error occurred while checking the email.",
      });
    });
};


module.exports = {
  staffRegistration,
};
