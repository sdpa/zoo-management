const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { encode, decode } = require("base64-arraybuffer");
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

//Get all locations
router.get("/", (req, res, next) => {
  let sql = "SELECT * FROM locations";

  let response = {};
  db.query(sql, (error, result) => {
    if (error) throw error;
    response = JSON.parse(JSON.stringify(result));
    return res.send(response);
  });
});

//Get all enclosures
router.get("/all_enclosures", (req, res, next) => {
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

//
router.get("/all_shops", (req, res, next) => {
  let sql = "SELECT * FROM locations WHERE location_type !='Enclosure'";

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
    // upload.single("location_image"),
  ],
  (req, res, next) => {
    let file = null;
    if (req.files) {
      file = req.files.location_image;
    }

    let body = req.body;

    let location = {
      location_type: body.location_type,
      location_name: body.location_name,
      location_image: file.name,
      img: file.data,
      img_64: body.img_64,
    };

    //Check if location already exisits.
    db.query(
      `SELECT * FROM locations WHERE location_name LIKE "${req.body.location_name}"`,
      (err, results) => {
        if (err) throw err;
        rows = JSON.parse(JSON.stringify(results));
        if (rows.length > 0) {
          return res.status(400).json({ error: "Already exists" });
        } else {
          let sql = `INSERT INTO locations SET ?`;

          // // Open a connection and make a post request to the server.
          db.query(sql, location, (error, result) => {
            if (error) throw error;
            response = JSON.parse(JSON.stringify(result));
            return res.send(response);
          });
        }
      }
    );
  }
);

router.get("/image/:id", (req, res, next) => {
  let id = req.params.id;
  db.query(
    "SELECT locations.img_64 FROM locations WHERE location_id = ? ",
    [id],
    (err, result) => {
      if (err) throw err;
      row = JSON.parse(JSON.stringify(result))[0];

      if (id == 41) {
        // console.log(row.img_64);
        // console.log(row.img.data);
        // console.log(row);
        // console.log(encoded.substring(0, 20));
        // let blob = new Blob(row.img, { type: "image/jpeg" });
        return res.send(row.img_64);
      } else {
        return res.send(200);
      }
    }
  );
});

module.exports = router;
