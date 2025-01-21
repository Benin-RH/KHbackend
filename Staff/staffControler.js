const staffSchema = require("./staffschema");  // Correct import

const addstaff = (req, res) => {
  let staff = new staffSchema({
    staffname: req.body.Name,
    email: req.body.Email,
    contact: req.body.Contact,
    password: req.body.Password,
  });

  staff.save().then((result) => {
    res.json({
      msg: "saved",
      data: result,
    });
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json({ msg: "Error saving staff", error });
  });
};

module.exports = {
  addstaff,
};
