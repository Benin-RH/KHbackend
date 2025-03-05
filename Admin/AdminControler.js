const admins = [
    { email: "admin1@gmail.com", password: 123456 },
    { email: "admin2@gmail.com", password: 123456 },
    { email: "admin3@gmail.com", password: 123456 },
];
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    console.log("Received email:", email);
    console.log("Received password:", password);

    const admin = admins.find((admin) => admin.email === email);

    if (!admin) {
        return res.status(400).json({ message: "Invalid email or password!" });
    }

    const isPasswordValid = (password, admin.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password!" });
    }
   
     res.json({
        message: "Login successful!", 
        adminEmail: admin.email,
    });
};

module.exports={
    loginAdmin,
};