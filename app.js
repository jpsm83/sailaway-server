require("dotenv").config();
const express = require("express");

// DB config
require("./configs/db.config");

const app = express();

// Middleware config
require("./configs/middleware.config")(app);
require("./configs/cors.config")(app);

// Session config + Passport
require("./configs/session.config")(app);
// remember, code execute in line
// passport uses session so session comes first tham passport
require("./configs/passport.config")(app);

const authRouter = require("./routes/auth.routes");
const boatRouter = require("./routes/boat.routes");
// const reviewRouter = require("./routes/review.routes");
app.use("/api/auth", authRouter);
app.use("/api/boat", boatRouter);
// app.use("/api/review", reviewRouter);

//  Catch 404 and respond with error message
app.use((req, res, next) => {
  return res.status(404).json({ message: "Not found" });
});

module.exports = app;
