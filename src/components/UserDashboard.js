import React, { useContext, useEffect, useState } from "react";
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
import { UserContext } from "./UserContext";

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
  const { user } = useContext(UserContext);

  //Get all the enclosure names:
  const [enclosureNames, setEnclosureNames] = useState([]);
  const [species, setSpecies] = useState([]);
  const [animals, setAnimals] = useState([]);

  const [animal, setAnimal] = useState({
    date_arrived: null,
    deceased_date: null,
    birth_day: null,
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

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handlecheck = (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  const validate = (values) => {
    console.log("testing...");
    let errors = {};
    if (
      values.amount_spent.length > 0 &&
      !Number.isInteger(Number(values.amount_spent))
    ) {
      errors.amount_spent = "Must be a valid number";
    }
    return errors;
  };

  const reportForm = useFormik({
    initialValues: {
      date_from: "",
      date_to: "",
      shop_name: "",
      amount_spent: "",
      customer_id: user.userID,
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      //   axios
      //     .post("/reports/customer_report", values)
      //     .then((res) => {
      //       setAnimals(res.data);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
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
              onChange={reportForm.handleChange}
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
            <InputLabel id="shop_name">Shop Name</InputLabel>
            <Select
              labelId="shop_name"
              onChange={reportForm.handleChange}
              name="shop_name"
              error={reportForm.errors.shop_name}
              className={classes.select}>
              {enclosureNames.map((e, index) => (
                <MenuItem key={index} value={e.location_id}>
                  {e.location_name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText className={classes.errMessage}>
              {reportForm.errors.shop_name}
            </FormHelperText>
          </FormControl>
          <FormControl
            style={{ marginBottom: "20px", width: "40%" }}
            className={clsx(classy.margin, classy.textField)}
            variant="outlined">
            <InputLabel htmlFor="amount_spent">
              Purchases above this value
            </InputLabel>
            <Input
              id="amount_spent"
              onChange={reportForm.handleChange}
              name="amount_spent"
              error={reportForm.errors.amount_spent}
            />
            <FormHelperText style={{ color: "red" }}>
              {reportForm.errors.amount_spent}
            </FormHelperText>
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
            onChange={reportForm.handleChange}
          />
        </FormControl>
        <FormControl>
          <InputLabel id="Activity To" shrink>
            Activity date from:
          </InputLabel>
          <Input
            labelId="activity-to"
            type="date"
            onChange={reportForm.handleChange}
          />
        </FormControl>

        <div>
          <Button variant="contained" onClick={reportForm.handleSubmit}>
            Get Report
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
