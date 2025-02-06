const AdminSchema=require("./AdminSchema")


const admins = [
    { email: "admin1@gmail.com", password: 123456 },
    { email: "admin2@gmail.com", password: 123456 },
    { email: "admin3@gmail.com", password: 123456 },
];

// Admin login (compare hashed passwords with stored hashed passwords)
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    console.log("Received email:", email);
    console.log("Received password:", password);

    // Check if the entered email exists in the admin list
    const admin = admins.find((admin) => admin.email === email);

    if (!admin) {
        return res.status(400).json({ message: "Invalid email or password!" });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordValid = (password, admin.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password!" });
    }

    // Respond with success message
   
     res.json({
        message: "Login successful!", 
        adminEmail: admin.email,
    });
};

module.exports={
    loginAdmin
};