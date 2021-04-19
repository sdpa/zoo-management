const { AirlineSeatReclineNormal } = require("@material-ui/icons");
const express = require("express");
const router = express.Router();
const db = require("../database");

//Enter a animal into zoo
router.post("/", (req, res, next) => {
  let body = req.body;
  let animal = {
    species_id: body.species,
    date_arrived: body.date_arrived,
    deceased_date: body.deceased_date,
    birth_date: body.birth_date,
    location_id: body.location,
    animal_name: body.animal_name,
  };

  console.log(req.body);

  let sql = "INSERT INTO animals SET ?";

  let response = {};
  db.query(sql, animal, (error, result) => {
    if (error) throw error;
    response = JSON.parse(JSON.stringify(result));
    return res.send(response);
  });
  //   return res.send(200);
});

//Get All animals.
router.get("/all", (req, res, next) => {
  let sql = "SELECT * FROM animals";
  db.query(sql, (error, result) => {
    if (error) throw error;
    response = JSON.parse(JSON.stringify(result));
    return res.send(response);
  });
});

//Get Animals based on enclosure.
router.get("/list_by_enclosure", (req, res, next) => {
  let location_id = parseInt(req.query.location);

  let sql =
    "SELECT animals.*, species.species_name   FROM animals  JOIN species on animals.species_id = species.species_id  WHERE animals.location_id = ? and animals.health_status != 'Deceased' ";
  db.query(sql, [location_id], (error, result) => {
    if (error) throw error;
    response = JSON.parse(JSON.stringify(result));
    return res.send(response);
  });
  //   return res.send(200);
});

//Change health Status of animal.
router.put("/change_health", (req, res, next) => {
  //Get animal from database
  db.query(
    "SELECT * FROM animals WHERE animal_id = ? ",
    [req.body.animal_id],
    (err, results) => {
      if (err) throw err;
      animal = JSON.parse(JSON.stringify(results))[0];
      let current_health = animal.health_status;
      let new_health = req.body.health_status;

      db.query(
        "UPDATE animals SET ? where animal_id = ? ",
        [{ health_status: new_health }, req.body.animal_id],
        (err, result) => {
          if (err) throw err;
          return res.send(200);
        }
      );
    }
  );
});
router.delete("/delete/:id", (req, res, next) => {
    let animal_id = req.params.id;
    console.log(animal_id);
    console.log(req.params);
    console.log(req.body);
    db.query(
        "UPDATE animals SET is_active = ? WHERE animal_id = ? ",
        [false, animal_id],
        (err, results) => {
            if (err) throw err;
            console.log(results);
            db.query(
                "SELECT * FROM animals WHERE animal_id = ? ",
                [animal_id],
                (err, results) => {
                    if (err) throw err;
                    rows = JSON.parse(JSON.stringify(results));
                    console.log("rows: ", rows);
                    let user_id = rows[0].user_id;
                    db.query(
                        "UPDATE users SET is_active = ? WHERE user_id = ? ",
                        [false, user_id],
                        (err, results) => {
                            if (err) throw err;
                            return res.send(200);
                        }
                    );
                }
            );
        }
    );
});
module.exports = router;
