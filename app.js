const path = require("node:path");
const express = require("express");
const router = require("");
const assetsPath = path.join(__dirname, "public");
require("dotenv").config();

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

const PORT = process.env.PORT || 8000;

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
