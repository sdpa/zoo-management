import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";

// LOGIN STUFF NEEDS TO CHANGE !!!! IMPORTANT
// styling should change a little bit
function Navbar() {
  const { user, login, logout } = useContext(UserContext);

  const history = useHistory();

  const goBackToHomePage = () => {
    let path = "/";
    history.push(path);
  };

  const goToLogInPage = () => {
    let path = "/login";
    history.push(path);
  };

  const goToSignUpPage = () => {
    let path = "/create";
    history.push(path);
  };

  // needs to go to account page/purchase history when it's created.
  const goToAccountPage = () => {
    let path = "/";
    history.push(path);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense" style={{padding:0}}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={goBackToHomePage}>
            <HomeIcon />
          </IconButton>
          <Typography variant="h6">Better Houston Zoo</Typography>

          {/* this needs to change! "login(customer)" should go to UserLogin.js later 
              should combine log in buttuns into 1 later */}
          {!user.auth && (
            <div>
              {/* <Button>Welcome, guest</Button> */}
              <Button
                onClick={() => {
                  // needs to change
                  // login("customer", "customer", 1);
                  goToLogInPage();
                }}>
                Log in
              </Button>
              {/* <Button
                onClick={() => {
                  // needs to change
                  // login("employee", "employee", 2);
                  goToLogInPage();
                }}>
                Log in (employee)
              </Button> */}
              <Button onClick={goToSignUpPage}>Sign up</Button>
            </div>
          )}

          {user.auth && (
            <div>
              <Button>Welcome, {user.name}</Button>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={goToAccountPage}>
                <AccountCircleIcon />
              </IconButton>

              <Button onClick={logout}>Sign out</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
