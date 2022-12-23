require("dotenv").config();
const cookies = require("cookie-parser");
const express = require("express");
const routes = require("./routes/routes");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cookies());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/", routes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(8000, () => {
      console.log("banana is running 🍌");
    })
  )
  .catch((err) => console.error(err));
