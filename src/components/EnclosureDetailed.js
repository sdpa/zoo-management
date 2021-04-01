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
} from "@material-ui/core";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({}));

const EnclosureDetailed = ({ match }) => {
  const classes = useStyles();
  //Get animals in the Enclosure.

  return (
    <>
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        //List of all animals in this Enclosure.
        <Typography>Enclosure Detailed</Typography>
      )}
    </>
  );
};

export default EnclosureDetailed;
