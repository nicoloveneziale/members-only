const path = require("node:path");
const express = require("express");
const router = require("./routes/indexRouter");
const assetsPath = path.join(__dirname, "public");
const sessionConfig = require("./config/sessionConfig");
const passport = require("passport");

require("dotenv").config();

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

//Authentication
app.use(sessionConfig());
app.use(passport.session());
require("./config/passportConfig");

//Server
const PORT = process.env.PORT || 8000;

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
