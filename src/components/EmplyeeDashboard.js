import React, { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Input,
  Grid,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { base_url } from "../config";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  select: {
    minWidth: 150,
  },
});

const EmployeeDashboard = () => {
  const classes = useStyles();

  //Get all the enclosure names:
  const [enclosureNames, setEnclosureNames] = useState([]);
  const [species, setSpecies] = useState([]);

  const [animal, setAnimal] = useState({
    date_arrived: null,
    deceased_date: null,
    birth_day: null,
    location: "",
    animal_name: "",
  });

  const getEnclosureNames = () => {
    axios
      .get(`${base_url}/enclosures`)
      .then((res) => {
        // console.log(res);
        // const with_image = res.data.map((e) => {
        //   return {
        //     ...e,
        //     location_img: URL.createObjectURL(new Blob(e.image.data, {type: "application/zip"}),
        //   };
        // });
        console.log(res.data);
        let names = res.data.map((e) => {
          return e.location_name;
        });
        setEnclosureNames(names);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllSpecies = () => {
    axios
      .get(`${base_url}/species`)
      .then((res) => {
        // console.log(res);
        // const with_image = res.data.map((e) => {
        //   return {
        //     ...e,
        //     location_img: URL.createObjectURL(new Blob(e.image.data, {type: "application/zip"}),
        //   };
        // });
        console.log(res.data);
        setSpecies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getEnclosureNames();
    getAllSpecies();
  }, []);

  const handleAnimalChange = (e) => {
    setAnimal({
      ...animal,
      [e.target.name]: e.target.value,
    });
  };

  const createAnimal = () => {
    axios
      .post(`${base_url}/animals`, animal)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="form">
      <Typography>Add Animal to Zoo</Typography>
      <Grid container spacing={2}>
        <Grid item>
          <FormControl>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input id="name" onChange={handleAnimalChange} name="animal_name" />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel id="enclosureName">Enclosure Name</InputLabel>
            <Select
              labelId="enclosureName"
              onChange={handleAnimalChange}
              name="location"
              className={classes.select}>
              {enclosureNames.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel id="species">Species</InputLabel>
            <Select
              labelId="species"
              onChange={handleAnimalChange}
              name="species"
              className={classes.select}>
              {species.map((s, index) => (
                <MenuItem key={index} value={s.species_id}>
                  {s.species_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel id="dob" shrink>
              Date of Birth
            </InputLabel>
            <Input
              labelId="dob"
              type="date"
              onChange={handleAnimalChange}
              name="birth_day"
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel id="dob" shrink>
              Arrival Date
            </InputLabel>
            <Input
              labelId="dob"
              type="date"
              defaultValue={new Date().toDateString()}
              onChange={handleAnimalChange}
              name="date_arrived"
            />
          </FormControl>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={createAnimal}>
            Add Animal
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EmployeeDashboard;
