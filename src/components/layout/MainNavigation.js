import React, { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router";

//Components
import AuthContext from "../../store/auth-context";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "0",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
}));

export default function MenuAppBar(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuthPage, setIsAuthPage] = useState(true);

  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  //Fix an issue with overflow hidden on auth page component.
  useEffect(() => {
    if (location.pathname.includes("/auth")) {
      setIsAuthPage(true);
    } else {
      setIsAuthPage(false);
    }
  }, [location]);

  // Fix overflow: hidden  bug
  const paddingStyle = isAuthPage ? "1rem" : "0";

  const authContext = useContext(AuthContext);

  const isLogin = authContext.isLogin;

  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    authContext.logout();
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ paddingBottom: paddingStyle, backgroundColor: "#404040" }}
      >
        <Toolbar>
          <Typography
            variant="h3"
            className={classes.title}
            color="primary"
            onClick={() => history.push("/")}
          >
            Athens Cinema
          </Typography>
          {!isLogin && (
            <Button onClick={() => history.push("/auth")}>
              Login/Register
            </Button>
          )}
          {isLogin && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
