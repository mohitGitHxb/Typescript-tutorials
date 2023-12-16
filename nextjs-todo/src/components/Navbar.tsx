import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {
  const clickHandler = () => {
    window.open("https://bit.ly/3BlS71b", "_blank");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {"(-_0)"}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo Using Typescript and NextJS
          </Typography>
          <Button color="inherit" onClick={clickHandler} variant="outlined">
            Do not click
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
