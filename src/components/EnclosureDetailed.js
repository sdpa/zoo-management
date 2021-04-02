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
  Modal,
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

const EnclosureDetailed = ({ match }) => {
  // console.log(match);

  let history = useHistory();
  console.log(history);

  const [loading, setLoading] = useState(true);

  //Modal
  const [currentAnimal, setCurretAnimal] = useState({
    animal_name: "",
  });
  const [open, setOpen] = useState(false);

  const handleModalOpen = (animal) => {
    console.log("Animal", animal);
    setCurretAnimal(animal);
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  //Get animals in the Enclosure.

  const [animals, setAnimals] = useState([]);

  const [enclosure, setEnclosure] = useState({});

  const getEnclosure = () => {
    axios
      .get(`enclosures/by_id`, {
        params: { location: match.params.id },
      })
      .then((res) => {
        console.log("Enclosure: ", res);
        setEnclosure(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    getEnclosure();
    getAnimals();
  }, []);

  return (
    <>
      {loading ? (
        <LinearProgress color="primary" />
      ) : (
        <>
          <Typography>{`Animals in ${enclosure.location_name} Enclosure`}</Typography>
          <TableContainer component={Paper} style={{ width: 800 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name </TableCell>
                  <TableCell align="right">Species</TableCell>
                  <TableCell align="right">Date of Birth</TableCell>
                  <TableCell align="right">Date Arrived</TableCell>
                  <TableCell align="right">Health Status</TableCell>
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
                    <TableCell align="right">{animal.health_status}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          handleModalOpen(animal);
                        }}>
                        Edit
                      </Button>
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
