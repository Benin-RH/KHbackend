const staffschema = require('./staffschema');

const staffRegistration = (req, res) => {
  let { Name, Email:email, Password, Contact } = req.body;

  let pass = Password.toString().split("").length;  
  if (!Name || !email || !Password || !Contact) {
    return res.status(400).json({ message: "All fields are required." });
  }
  if(!/^\S+@\S+\.\S+$/.test(email)){
    return res.status(400).json({ message: "Enter Valid Email Address" });
  }
  staffschema.findOne({ email })
    .then((existingStaff) => {
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
            message: "successfully Registered",
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

const staffLogin = (req, res) => {
  const { Email:email, Password } = req.body; 
  const pass = parseInt(Password);

  if (!email || !Password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if(!/^\S+@\S+\.\S+$/.test(email)){
    return res.status(400).json({ message: "Enter Valid Email Address" });
  }

  staffschema
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


module.exports = {
  staffRegistration,
  staffLogin,
};
