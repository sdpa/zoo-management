const express = require("express");
const cors = require("cors");
// const fileupload = require("express-fileupload");
// const bodyParser = require("body-parser");

var enclosuresRouter = require("./routes/enclosures");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(fileupload());

const PORT = process.env.PORT || 5000;

app.use("/enclosures", enclosuresRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
