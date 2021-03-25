import React, { useState } from "react"; 
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import './TicketStyle.css';

function Ticket() {

  const [adultTicketCount, setAdultTicketCount] = useState(0); 
  const [childTicketCount, setChildTicketCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0); 
  const [showTotalCost, setShowTotalCost] = useState(false); 

  function decrement(ticketCount, setTicketCount) {
    if (ticketCount - 1 < 0) {
      setTicketCount(0);
    } else {
      setTicketCount(ticketCount - 1); 
    }
  }

  function calculateTotalCost() {
    setTotalCost(childTicketCount * 5 + adultTicketCount * 10);
  }

  function displayTotalCost() {
    setShowTotalCost(true); 
  }

  return(
    <div>

    <AppBar position="static">
      <Toolbar variant="dense">
        
      </Toolbar>

    </AppBar>

      <h1>
      Tickets
      </h1>

    <Grid container spacing={4}>
      <Grid item xs={6}>
        <Card className="ticketCard" variant="outlined">
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Adult Ticket
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              Ages 18+
            </Typography>
            <Typography variant="h5" component="h2">
              $10
            </Typography>
            <Typography className="taxIncludedText" color="textSecondary">
              tax included.
            </Typography>
            <ButtonGroup size="small" aria-label="small outlined button group">
              <Button onClick={() => decrement(adultTicketCount, setAdultTicketCount)}>-</Button>
              <Button color="primary">{adultTicketCount}</Button>
              <Button onClick={() => setAdultTicketCount(adultTicketCount + 1)}>+</Button>
          </ButtonGroup>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card className="ticketCard" variant="outlined">
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Child Ticket
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              Ages 3-17
            </Typography>
            <Typography variant="h5" component="h2">
              $5
            </Typography>
            <Typography className="taxIncludedText" color="textSecondary">
              tax included.
            </Typography>
            <ButtonGroup size="small" aria-label="small outlined button group">
              <Button onClick={() => decrement(childTicketCount, setChildTicketCount)}>-</Button>
              <Button color="primary">{childTicketCount}</Button>
              <Button onClick={() => setChildTicketCount(childTicketCount + 1)}>+</Button>
          </ButtonGroup>
        </CardContent>
      </Card>
      </Grid>
        
      </Grid>
    

    

    <Button className="purchaseButton" variant="outlined" color="primary" 
      onClick={() => {
        calculateTotalCost();
        displayTotalCost(); 
        }}>
      Purchase
    </Button>

    {showTotalCost && (
      <h3>Your total cost is: ${totalCost}</h3>
    )}
    
    </div>
    
  ); 
}

export default Ticket; 