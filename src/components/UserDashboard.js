import React, { useEffect, useState } from "react";
import {
  // TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Input,
  Grid,
  FormHelperText,
  // Modal,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
// import { base_url } from "../config";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
const theStyles = makeStyles((theme) => ({
  root: {
    width: "900px",
    variant: "contained",
    position: "right",
    border: "3px solid #4A90E2",
    borderColor: "gray",
    color: "black",
    align: "right",
    minWidth: 50,
    "& .MuiTextField-root": {
      margin: theme.spacing(4),
      width: "10ch",
    },
  },
}));

const useStyles = makeStyles({
  select: {
    minWidth: 150,
  },
  errMessage: {
    color: "red",
  },
});

const UserDashboard = () => {
  const classes = useStyles();

  //Get all the enclosure names:
  const [enclosureNames, setEnclosureNames] = useState([]);
  const [species, setSpecies] = useState([]);

  const [animal, setAnimal] = useState({
    date_arrived: null,
    deceased_date: null,
    birth_date: null,
    location: "",
    animal_name: "",
  });

  const getEnclosureNames = () => {
    axios
      .get(`/locations/all_shops`)
      .then((res) => {
        console.log(res.data);

        setEnclosureNames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getEnclosureNames();
  }, []);

  const validate = (values) => {
    let errors = {};
    if (!values.animal_name) {
      errors.animal_name = "Required";
    }
    if (!values.location) {
      errors.location = "Required";
    }
    if (!values.date_arrived) {
      errors.date_arrived = "Required";
    }
    if (!values.birth_date) {
      errors.birth_date = "Required";
    }
    if (!values.species) {
      errors.species = "Required";
    }
    return errors;
  };
  const [values, setValues] = useState({
    investigator: "",
    checked: true,
    purchase: "",
    enclosure: "",
    animal: "",
    customer: "",
    dateFrom: "",
    dateTo: "",
  });
  const handleReport = (values) => {
    console.log("handleReport called");
    axios
      .post("/values", {
        investigator: values.investigator,
        checked: true,
        purchase: values.purchase,
        enclosure: values.ensloure,
        animal: values.animal,
        customer: values.customer,
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handlecheck = (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  const handleSubmit = (values) => {
    console.log("handleSubmit called");
    axios
      .post(`/animals`, {
        date_arrived: values.date_arrived,
        deceased_date: values.deceased_date,
        birth_date: values.birth_date,
        location: values.location,
        animal_name: values.animal_name,
        species: values.species,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formik = useFormik({
    initialValues: {
      date_arrived: "",
      deceased_date: null,
      birth_date: "",
      location: "",
      animal_name: "",
      species: "",
      amount_spent: "",
    },
    validate,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const classy = theStyles();

  return (
    <>
      <div className={classy.root} noValidate autoComplete="off">
        <div>
          <Typography
            style={{
              align: "middle",
              fontSize: "32px",
            }}>
            Report Request
          </Typography>
          <Typography
            align="left"
            style={{
              fontSize: "22px",
              fontWeight: "bold",
            }}>
            Activity Report{"\n"}
          </Typography>
        </div>
        <div>
          <FormControl
            spacing={2}
            style={{ marginBottom: "20px", width: "40%" }}
            className={clsx(classy.margin, classy.textField)}
            variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">
              Investigator
            </InputLabel>
            <OutlinedInput
              id="outline"
              label="name"
              value={values.investigtor}
              onChange={handleReport("investigator")}
              aria-describedby="outlined-weight-helper-text"
              labelWidth={0}
            />
          </FormControl>

          <FormControlLabel
            padding="30px"
            control={
              <Checkbox
                checked={values.checked}
                onChange={handlecheck}
                name="checked"
                color="primary"
              />
            }
            label="Include Inactive Employees or something"
          />
        </div>

        <Typography
          align="left"
          style={{
            fontSize: "18px",
          }}>
          Select atleast one item:{" "}
        </Typography>
        <div>
          <FormControl>
            <InputLabel id="enclosureName">Enclosure Name</InputLabel>
            <Select
              labelId="enclosureName"
              onChange={formik.handleChange}
              name="location"
              error={formik.errors.location}
              className={classes.select}>
              {enclosureNames.map((e, index) => (
                <MenuItem key={index} value={e.location_id}>
                  {e.location_name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText className={classes.errMessage}>
              {formik.errors.location}
            </FormHelperText>
          </FormControl>
          <FormControl
            style={{ marginBottom: "20px", width: "40%" }}
            className={clsx(classy.margin, classy.textField)}
            variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">
              Amount Spent
            </InputLabel>
            <Input
              id="amount_spent"
              onChange={formik.handleChange}
              name="amount_spent"
              error={formik.errors.amount_spent}
            />
          </FormControl>
        </div>
        <div></div>
        <FormControl style={{ marginBottom: "20px", marginRight: "40px" }}>
          <InputLabel id="Activity From" shrink>
            Activity date from:
          </InputLabel>
          <Input
            labelId="activity-from"
            type="date"
            onChange={handleReport("activityFrom")}
          />
        </FormControl>
        <FormControl>
          <InputLabel id="Activity To" shrink>
            Activity date from:
          </InputLabel>
          <Input
            labelId="activity-to"
            type="date"
            onChange={handleReport("activityTo")}
          />
        </FormControl>

        <div></div>
      </div>
    </>
  );
};

export default UserDashboard;
