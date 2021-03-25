import React, { useState } from "react"; 
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import Navbar from './Navbar';

//ticket info needs to be sent to db
function Ticket() {

  const [adultTicketCount, setAdultTicketCount] = useState(0); 
  const [childTicketCount, setChildTicketCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0); 
  const [showTotalCost, setShowTotalCost] = useState(false); 

  // ticket number doesn't go below 0
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

  // needs work later after db setup
  function sendTicketInfoToDB() {
    emptyStates(); 
  }

  // emptying all state values after confirming/cancelling purchase
  function emptyStates() {
    setAdultTicketCount(0);
    setChildTicketCount(0);
    setTotalCost(0);
    setShowTotalCost(false); 
  }

  // ticket card box
  const TicketCard = ({ name, age, price, ticketCount, setTicketCount }) => {
    return (
      <Grid item xs={6}>
        <Card className="ticketCard" variant="outlined">
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              {age}
            </Typography>
            <Typography variant="h5" component="h2">
              {price}
            </Typography>
            <Typography className="taxIncludedText" color="textSecondary">
              tax included.
            </Typography>
            <ButtonGroup size="small" aria-label="small outlined button group">
              <Button onClick={() => decrement(ticketCount, setTicketCount)}>-</Button>
              <Button color="primary">{ticketCount}</Button>
              <Button onClick={() => setTicketCount(ticketCount + 1)}>+</Button>
          </ButtonGroup>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  return(
    <div>

    <Navbar/>

    <h1>
    Tickets
    </h1>

    {/* ticket card boxes */}
    <Grid container spacing={4}>
      
      <TicketCard name="Adult Ticket" age="Age 18+" price="$10" ticketCount={adultTicketCount} setTicketCount={setAdultTicketCount}/>

      <TicketCard name="Child Ticket" age="Age 3-17" price="$5" ticketCount={childTicketCount} setTicketCount={setChildTicketCount}/>
        
    </Grid>
    

    {/* purchase button */}
    <Button className="purchaseButton" variant="outlined" color="primary" 
      onClick={() => {
        calculateTotalCost();
        setShowTotalCost(true); 
        }}>
      Purchase
    </Button>


    {/* only display once the user clicks "purchase" button  
        need to add "please log in" if not logged in */}
    {showTotalCost && totalCost !== 0 && (
      <div>
        <h3>Your total cost is: ${totalCost}</h3>

        <Button variant="outlined" color="primary" onClick={() => {
          alert("$" + totalCost + " success!"); 
          sendTicketInfoToDB();
        }}>Confirm</Button>

        <Button variant="outlined" onClick={() => emptyStates()}>Cancel</Button>
      </div>
    )}
    
    </div>
    
  ); 
}

export default Ticket; 