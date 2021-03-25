import React, { useState } from "react"; 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";


// styling should change a little bit
function Navbar() {

  // this should be changed so loggedIn status is consistent throughout all pages
  const [loggedIn, setLoggedIn] = useState(false); 

  const history = useHistory();

  const goBackToHomePage = () =>{ 
    let path = '/'; 
    history.push(path);
  }


  // needs to go to account page when it's created. 
  const goToAccountPage = () => {
    let path ='/';
    history.push(path); 
  }


  return(
    <div>
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={goBackToHomePage}>
          <HomeIcon/>
        </IconButton>
        <Typography variant="h6">
          Better Houston Zoo
        </Typography>
        


         {/* this needs to change! log in should redirect to another page   */}
        {
          !loggedIn && (
            <Button onClick={() => {setLoggedIn(!loggedIn)}}>
              Log in
            </Button>
          )
        }

        { 
          loggedIn && (
            <div>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={goToAccountPage}>
                <AccountCircleIcon/>
              </IconButton>

              <Button onClick={() => {setLoggedIn(!loggedIn)}}>
                Sign out
              </Button>
            </div>
          )
        }
        
      </Toolbar>

    </AppBar>
    </div>
  );
}

export default Navbar;