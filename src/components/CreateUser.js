import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import { useFormik } from "formik";
import { Typography, Grid, TextField, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    width: "50ch",
    position: "fixed",
    top: "25%",
    left: "50%",
    textAlign: "center",
    transform: "translate(-50%, -50%)",
    marginTop: theme.spacing(2),
  },
  formTitle: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  signUp: {
    float: "left",
  },
}));

function CreateUser() {
  const classes = useStyles();

  const [alertError, setAlertError] = useState(null);

  const handleLogin = (values) => {
    axios
      .post("/login", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        console.log(res);
        const access_token = res.data.accessToken;
        localStorage.setItem("access_token", res.data.accessToken);
        localStorage.setItem("user_id", res.data.user_id);
        // props.setLoggedIn(true);
        //Make request to profile, it if exists, we go to dashboard.
        axios
          .get("http://localhost:9000/profile", {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then((res) => {
            console.log(res);
            props.setLoggedIn(true);
          })
          .catch((err) => {
            //Can't find profile
            console.log(err);
            history.push("/profile");
          });
      })
      .catch((err) => {
        //Log In failed.
        console.log(err.response);
        console.log("Errors: ", err.response.data);
        let errors_response = err.response.data.errors;
        let new_errors = { email: "", password: "" };
        if (Array.isArray(errors_response)) {
          errors_response.forEach((error) => {
            new_errors[error.param] = error.msg;
          });
          setErrors(new_errors);
        } else {
          setAlertError(err.response.data.error);
        }
      });
  };
  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    } else if (values.email.length > 25) {
      errors.email = "Max 25 characters";
    }
    if (values.password.length < 4) {
      errors.password = "Minimum 4 characters";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  return (
    <Grid container spacing={1} direction="column" className={classes.root}>
      <Typography className={classes.formTitle}>Sign Up</Typography>
      {alertError ? (
        <Alert severity="error" style={{ paddingBottom: "10px" }}>
          {alertError}
        </Alert>
      ) : null}
      <Grid item xs={12}>
        <TextField
          label="Email"
          id="email"
          onChange={formik.handleChange}
          name="email"
          variant="outlined"
          style={{ width: "100%" }}
          error={errors.email || formik.errors.email}
          helperText={
            errors.email != ""
              ? errors.email
              : formik.errors.email != ""
              ? formik.errors.email
              : ""
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          variant="outlined"
          style={{ width: "100%" }}
          error={errors.password || formik.errors.password}
          helperText={
            errors.password != ""
              ? errors.password
              : formik.errors.password != ""
              ? formik.errors.password
              : ""
          }
        />
      </Grid>
      <Button
        onClick={formik.handleSubmit}
        variant="contained"
        size="large"
        color="primary">
        Sign Up
      </Button>
    </Grid>
  );
  // Only customers should be able to create their own accounts
  // We have to make employee accounts beforehand, they should end with "@zoo-staff" to signify they're an employee so we know which table to check in db with our queries
}

export default CreateUser;
