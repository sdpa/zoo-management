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
import { useRouteMatch } from "react-router-dom";
import Link from "@material-ui/core/Link";

// styling should change a little bit
function Navbar() {
  const { user, logout } = useContext(UserContext);

  let { url } = useRouteMatch();

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
    let path = "/history";
    history.push(path);
  };

  const goToTicketPage = (role) => {
    if (role) {
      let path = "/ticket";
      history.push(path);
    }
  };

  const goToGiftShop = (role) => {
    if (role) {
      let path = "/giftshops";
      history.push(path);
    }
  };

  const goToDashboard = (role) => {
    if (role == "Admin") {
      history.push("/admin_dashboard");
    } else if (role == "Employee") {
      history.push("/employee_dashboard");
    } else {
      history.push("/user_dashboard");
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense" style={{ padding: 0 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={goBackToHomePage}>
            <HomeIcon />
          </IconButton>
          <Typography variant="h6">Better Houston Zoo</Typography>
          {!user.auth && (
            <div>
              <Button onClick={goToLogInPage}>Log in</Button>
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

              <Button
                onClick={() => {
                  history.push("/");
                  logout();
                }}>
                Sign out
              </Button>
              {user.auth ? (
                <>
                  {user.role === "Admin" ? (
                    <Link href={`/admin_dashboard`}>
                      <Button>Dash Board</Button>
                    </Link>
                  ) : null}
                  {user.role === "Employee" ? (
                    <>
                      <Link href={`/employee_dashboard`}>
                        <Button>Dash Board</Button>
                      </Link>
                      <Link href={`/messages`}>
                        <Button>Messages</Button>
                      </Link>
                      <Link href={`/employee_profile`}>
                        <Button>Profile</Button>
                      </Link>
                    </>
                  ) : null}
                  {user.role === "Customer" ? (
                    <Link href={`/user_dashboard`}>
                      <Button>Dash Board</Button>
                    </Link>
                  ) : null}
                </>
              ) : null}

              {user.auth ? (
                <>
                  {user.role === "Customer" ? (
                    <Link href={`/history`}>
                      <Button>Purchase History</Button>
                    </Link>
                  ) : null}

                  <Link href={`/giftshops`}>
                    <Button>Gift Shop</Button>
                  </Link>

                  {user.role === "Customer" ? (
                    <Link href={`/ticket`}>
                      <Button>Buy Tickets</Button>
                    </Link>
                  ) : null}
                </>
              ) : null}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
