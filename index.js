const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes.js");
const db = require("./dbConnection.js");

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
const port = 5001;
app.use(bodyParser.json())
app.use('/',routes)

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
