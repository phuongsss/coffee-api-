const express = require("express");
const morgan = require("morgan");
const cookieprs = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

app.use(morgan("dev"));
app.use(cors({ credentials: true, origin: true }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cookieprs());
app.use(express.json());
app.use(express.static(`${__dirname}`));

const routeCoffe = require("./routes/coffeeRouter");
const routeBill = require("./routes/billRouter");
const routeUser = require("./routes/userRouter");
const routerKind = require("./routes/typeRouter");

// http://localhost:3001/app/api/bill
// http://localhost:3001/app/api/user
// http://localhost:3001/app/api/coffe
// http://localhost:3001/app/api/kind

app.use("/app/api/coffe", routeCoffe);
app.use("/app/api/bill", routeBill);
app.use("/app/api/user", routeUser);
app.use("/app/api/kind", routerKind);

app.use(function handleError(err, req, res, next) {
  return res.status(404).json({
    message: "Error",
    data: err,
  });
});

module.exports = app;
