import React, { useEffect, useState } from "react";
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

//Import images
import Elephant from "../images/Elephant.jpg";
import Giraffe from "../images/Giraffe.jpg";
import Lion from "../images/Lion.jpg";
import Rhinoceros from "../images/Rhinoceros.jpg";
import Tiger from "../images/Tiger.jpg";

import Navbar from "./Navbar";

import axios from "axios";

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
  categoryContainer: {
    width: "80%",
  },
  listCategory: {
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  divider: {
    height: "5px",
    backgroundColor: "green",
    width: "100%",
  },
});

const cardStyles = makeStyles({
  root: {
    width: "280px",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  media: {
    height: 140,
  },
});

const EnclosureCard = ({ name, description, image }) => {
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
          <CardActions>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </div>
      </Card>
    </div>
  );
};

const EnclosureList = () => {
  const classes = useStyles();

  const [enclosure, setEnclosure] = useState("");

  const getAllEnclosures = () => {
    axios
      .get("enclosures/")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllEnclosures();
    // console.log(enclosures);
  }, []);

  return (
    <div className={classes.categoryContainer}>
      <Navbar></Navbar>

      <Divider className={classes.divider}></Divider>
      <Typography className={classes.listCategory}>Enclosures</Typography>
      <Grid direction="row" container spacing={2}>
        {enclosure_data.map((enclosure, i) => {
          return (
            <Grid item key={i}>
              <EnclosureCard
                name={enclosure.enclosureName}
                description={enclosure.description}
                image={enclosure.img}
              />
            </Grid>
          );
        })}
      </Grid>
      {/* <Button onClick={createEnclosure}>Create Enclosure</Button> */}
    </div>
  );
};

export default EnclosureList;
