const express = require("express");
const cors = require("cors");
const routes = require("./routes.js");
const db = require("./dbConnection.js");
const path = require("path");

const app = express();
const port = 5001;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Static file serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/", routes);

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
