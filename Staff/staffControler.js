const staffschema = require('./staffschema');

const staffRegistration = (req, res) => {
  let { Name, Email: email, Password, Contact } = req.body;

  let pass = Password.toString().split("").length;
  if (!Name || !email || !Password || !Contact) {
    return res.status(400).json({ message: "All fields are required." });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
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


const getAllUsers = (req, res) => {
  staffschema.find()
    .then((staffs) => {
      if (!staffs || staffs.length === 0) {
        return res.status(404).json({ msg: "No staff found" });
      }
      res.status(200).json(staffs); // Send staff data as response
    })
    .catch((err) => {
      console.error("Error fetching staff:", err);
      res.status(500).json({ msg: "An error occurred while fetching staff" });
    });
};


const staffLogin = (req, res) => {
  const { Email: email, Password } = req.body;
  const pass = parseInt(Password);

  if (!email || !Password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
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

const staffCheckMail = (req, res) => {
  console.log(req.body);

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "please enter your email",
    });
  }
  staffschema
    .findOne({ email })
    .then((response) => {
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

const setNewPassword = (req, res) => {
  const { email, password } = req.body
  if (!password) {
    return res.status(400).json({
      message: 'Please Enter Your Password'
    })
  }
  const pass = password.toString().split('').length
  if (pass < 6) {
    return res.status(400).json({
      message: 'password length should be atleast 6'
    })
  }
  if (isNaN(password)) {
    return res.status(400).json({
      message: 'password should be a number'
    })
  }
  staffschema.findOneAndUpdate({ email, password })
    .then((data) => {
      return res.status(200).json({
        data: data,
        message: "changed successfully"
      })
    })
    .catch((err) => {
      res.status(500).json({
        messsge: "error occured",
      });
    })
}

const findStaff = (req, res) => {
  const { _id } = req.body;
  if (!_id) {
    return res.status(400).json({
      message: "ID is required",
    });
  }
  staffschema
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



module.exports = {
  staffRegistration,
  staffLogin,
  staffCheckMail,
  setNewPassword,
  findStaff,
  getAllUsers
};
