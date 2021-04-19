import React, { useEffect, useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";

//Import images
import Elephant from "../images/Elephant.jpg";
import Giraffe from "../images/Giraffe.jpg";
import Lion from "../images/Lion.jpg";
import Rhinoceros from "../images/Rhinoceros.jpg";
import Tiger from "../images/Tiger.jpg";
import The_Safari from "../images/The_Safari.jpg";

import {
  List,
  ListItem,
  ListItemIcon,
  Chip,
  ListItemText,
  LinearProgress,
  Paper,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core";

import axios from "axios";
import { base_url } from "../config";
import { TextField } from "@material-ui/core";
import { images_path } from "../config";
import { useRouteMatch } from "react-router-dom";

import { UserContext } from "./UserContext";
import { useFormik } from "formik";
import Alert from "@material-ui/lab/Alert";

const enclosure_data = [
  {
    enclosureName: "Elepant",
    img: Elephant,
    description: "This enclosure consists of Afriran American Elephants",
  },
  {
    enclosureName: "Rhinoceros",
    img: Rhinoceros,
    description: "Come witness on of the most magnificent mammals",
  },
  {
    enclosureName: "Giraffe",
    img: Giraffe,
    description: "Come meet the tallest terrestrial animal",
  },
  {
    enclosureName: "Tiger",
    img: Tiger,
    description: "The Largest and most fierce cat",
  },
  {
    enclosureName: "Lion",
    img: Lion,
    description: "The King of the Junge is here!",
  },
];

const useStyles = makeStyles({
  listCategory: {
    textTransform: "uppercase",
    fontWeight: "bold",
    paddingTop: "10px",
  },
  divider: {
    height: "5px",
    backgroundColor: "green",
    width: "100%",
  },
  grid: {
    padding: "10px",
  },
});

const cardStyles = makeStyles({
  root: {
    width: "280px",
    // height: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  media: {
    height: 140,
  },
});

const EnclosureCard = ({ name, description, image, id }) => {
  let { url } = useRouteMatch();
  const classes = cardStyles();

  return (
    <div>
      <Card className={classes.root}>
        <div>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={image}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </div>
        <div>
          <Link style={{ textDecoration: "none" }} href={`${url}/${id}`}>
            <CardActions>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Link>
        </div>
      </Card>
    </div>
  );
};

const EnclosureList = () => {
  const classes = useStyles();

  const [enclosures, setEnclosures] = useState([]);

  const getAllEnclosures = () => {
    axios
      .get(`/locations/all_enclosures`)
      .then((res) => {
        console.log(res);

        // console.log(res);
        // const with_image = res.data.map((e) => {
        //   return {
        //     ...e,
        //     location_img: URL.createObjectURL(new Blob(e.image.data, {type: "application/zip"}),
        //   };
        // });
        console.log(res.data);
        setEnclosures(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { user } = useContext(UserContext);
  const [alertError, setAlertError] = useState(null);

  const [addDialog, setAddDialog] = useState(false);
  const [location_image_file, setLocation_image_file] = useState(false);
  const openAddDialog = () => {
    setAddDialog(true);
  };

  const closeAddDialog = () => {
    setAddDialog(false);
  };

  const validate = (values) => {
    let errors = {};
    if (!values.location_name) {
      errors.location_name = "Required";
    } //else if (
    //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    // ) {
    //   errors.email = "Invalid email address";
    // } else if (values.email.length > 25) {
    //   errors.email = "Max 25 characters";
    // }
    // if (values.password.length < 4) {
    //   errors.password = "Minimum 4 characters";
    // }
    if (values.location_type == "") {
      errors.location_type = "Required";
    }
    if (values.location_image == "") {
      errors.location_image = "Required";
    }
    
    // if (values.worK_location == "") {
    //   errors.work_location = "Required";
    // }
    return errors;
  };

  const handleCreateEmployee = (values) => {
    console.log(values);
    axios
      .post("/locations", {
        location_name: values.location_name,
        location_type: "Enclosure",
        location_image: location_image_file,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        //Log In failed.
        console.log(err.response);
        console.log("Errors: ", err.response.data);
        let errors_response = err.response.data.errors;
        // let new_errors = { email: "", password: "" };
        // if (Array.isArray(errors_response)) {
        //   errors_response.forEach((error) => {
        //     new_errors[error.param] = error.msg;
        //   });
        //   setErrors(new_errors);
        // } else {
        //   setAlertError(err.response.data.error);
        // }
      });
  };

  const formik = useFormik({
    initialValues: {
      location_name: "",
      location_type: "Enclosure",
      location_image: "",
    },
    
    onSubmit: (values) => {
      handleCreateEmployee(values);
      setAddDialog(false);
    },
  });


  useEffect(() => {
    getAllEnclosures();
    // console.log(enclosures);
  }, []);

  return (

    
    <div className={classes.categoryContainer}>
      {/* <Navbar></Navbar> */}

      

      <Typography className={classes.listCategory}>Enclosures</Typography>

      

      <Grid direction="row" container spacing={2} className={classes.grid}>
        {enclosures.map((enclosure, i) => {
          return (
            <Grid item key={i}>
              <EnclosureCard
                name={enclosure.location_name}
                image={`/uploads/${enclosure.location_image}`}
                id={enclosure.location_id}
              />
            </Grid>
          );
        })}
      </Grid>


      {user.role == "Admin" ? (
          <Grid item>
          <Button variant="contained" onClick={openAddDialog}>
            Add Enclosure
          </Button>
          </Grid>
        ) : null} 


        {/* Modal for adding new item to gift shop */}
        <div>
                <Dialog open={addDialog} onClose={closeAddDialog}>
                  <DialogTitle>Add New Enclosure</DialogTitle>
                  <DialogContent>
                    <Grid
                      container
                      spacing={1}
                      direction="column"
                      className={classes.root}>
                      <Typography className={classes.formTitle}>
                        
                      </Typography>
                      {alertError ? (
                        <Alert
                          severity="error"
                          style={{ paddingBottom: "10px" }}>
                          {alertError}
                        </Alert>
                      ) : null}
                      <Grid item xs={12}>
                        <TextField
                          label="Name"
                          id="location_name"
                          onChange={formik.handleChange}
                          name="location_name"
                          variant="outlined"
                          style={{ width: "100%" }}
                          // error={formik.errors.full_name}
                          // helperText={
                          //   formik.errors.full_name !== ""
                          //     ? formik.errors.full_name
                          //     : ""
                          // }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          component="label"
                        >
                          Upload File
                          <input id="file" name="file" type="file" onChange={(event) => {
                          setLocation_image_file("location_image", event.currentTarget.files[0]);
                        }} />
                      </Button>
                      </Grid>
                      
                      
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={formik.handleSubmit}
                      variant="contained"
                      color="secondary">
                      
                      Save
                    </Button>
                    <Button
                      onClick={closeAddDialog}
                      variant="contained"
                      color="secondary">
                      CANCEL
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>

    </div>

    
  );
};

export default EnclosureList;
