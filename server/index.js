const express = require("express");
const cors = require("cors");
// const fileupload = require("express-fileupload");
// const bodyParser = require("body-parser");

var locationRouter = require("./routes/locations");
var speciesRouter = require("./routes/species");
var animalsRouter = require("./routes/animals");
var purchaseHistoryRouter = require("./routes/purchaseHistory");
var merchandiseRouter = require("./routes/merchandise");
var signupRouter = require("./routes/signup");
var loginRouter = require("./routes/login");
var employeeRouter = require("./routes/employee");
var reportsRouter = require("./routes/reports");
var messagesRouter = require("./routes/messages");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(fileupload());

const PORT = process.env.PORT || 5000;

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/locations", locationRouter);
app.use("/species", speciesRouter);
app.use("/animals", animalsRouter);
app.use("/merchandise", merchandiseRouter);
app.use("/purchasehistory", purchaseHistoryRouter);
app.use("/employees", employeeRouter);
app.use("/reports", reportsRouter);
app.use("/messages", messagesRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
