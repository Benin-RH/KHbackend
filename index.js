const express = require("express");
const cors = require("cors");
const routes = require("./routes.js");
const db = require("./dbConnection.js");
const fileUpload = require("express-fileupload");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = 5001;

// CORS settings
app.use(fileUpload());
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Enable file upload middleware

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use routes
app.use("/", routes);

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
