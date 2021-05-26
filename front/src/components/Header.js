import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import logo from "../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div style={{ background: "#ffA500" }} className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <img src={logo} alt="Logo" style={{ height: 35 }} />
            </Link>
          </Typography>
          <Link to="/about-us" style={{ textDecoration: "none" }}>
            <Button color="default">About</Button>
          </Link>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <Button color="default">Contact</Button>
          </Link>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <Button color="default">Profile</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
