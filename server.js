require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./utils/errorHandler");
const foodRoutes = require("./routes/foodRoutes");

connectDB();

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/api/foods", foodRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
