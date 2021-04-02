import React, { useEffect, useState, useCallback } from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemIcon,
  Typography,
  Grid,
  Chip,
  ListItemText,
  LinearProgress,
  Dialog,
  Paper,
} from "@material-ui/core";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const EnclosureDetailed = ({ match }) => {
  // console.log(match);

  let history = useHistory();
  console.log(history);
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  //Get animals in the Enclosure.

  const [animals, setAnimals] = useState([]);

  const getAnimals = () => {
    axios
      .get(`/animals/list_by_enclosure/`, {
        params: { location: match.params.id },
      })
      .then((res) => {
        console.log(res);
        setAnimals(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAnimals();
  }, []);

  return (
    <>
      {loading ? (
        <LinearProgress color="primary" />
      ) : (
        <>
          <Typography>Animals in</Typography>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name </TableCell>
                  <TableCell align="right">Species</TableCell>
                  <TableCell align="right">Date of Birth</TableCell>
                  <TableCell align="right">Date Arrived</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {animals.map((animal) => (
                  <TableRow key={animal.animal_id}>
                    <TableCell component="th" scope="row">
                      {animal.animal_name}
                    </TableCell>
                    <TableCell align="right">{animal.species_name}</TableCell>
                    <TableCell align="right">{animal.birth_day}</TableCell>
                    <TableCell align="right">{animal.date_arrived}</TableCell>
                    <TableCell align="right">
                      <Button variant="outlined">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default EnclosureDetailed;
