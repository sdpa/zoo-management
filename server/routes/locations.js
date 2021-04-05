const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const db = require("../database");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

//Get all enclosures
router.get("/all_enclsoures", (req, res, next) => {
  let sql = "SELECT * FROM locations WHERE location_type='Enclosure'";

  let response = {};
  db.query(sql, (error, result) => {
    if (error) throw error;
    response = JSON.parse(JSON.stringify(result));
    return res.send(response);
  });
});

//Get all gift_shops
router.get("/all_gift_shops", (req, res, next) => {
  let sql = "SELECT * FROM locations WHERE location_type='Gift shop'";

  let response = {};
  db.query(sql, (error, result) => {
    if (error) throw error;
    response = JSON.parse(JSON.stringify(result));
    return res.send(response);
  });
});

//Get location by ID
router.get("/by_id", (req, res, next) => {
  let location_id = parseInt(req.query.location);
  let sql = "SELECT * FROM locations WHERE location_id=?";

  let response = {};
  db.query(sql, [location_id], (error, result) => {
    if (error) throw error;
    response = JSON.parse(JSON.stringify(result));
    return res.send(response);
  });
});

//Create a location
router.post(
  "/",
  [
    // body("location_type").notEmpty(),
    // body("location_name").notEmpty(),
    upload.single("location_image"),
  ],
  (req, res, next) => {
    const err = validationResult(req);
    console.log(err);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }
    // console.log(req);
    console.log(req.body);
    console.log(req.file);

    let filename = "";
    if (req.file) {
      filename = req.file.originalname;
    }

    // let img = req.files.img;
    let body = req.body;

    //Object to insert
    let location = {
      location_type: body.location_type,
      location_name: body.location_name,
      location_image: filename,
    };

    // console.log(location);

    // //Make query
    let sql = `INSERT INTO locations SET ?`;

    let reponse = {};

    // Open a connection and make a post request to the server.
    db.query(sql, location, (error, result) => {
      if (error) throw error;
      response = JSON.parse(JSON.stringify(result));
      return res.send(response);
    });
    // res.send(200);
  }
);

module.exports = router;
