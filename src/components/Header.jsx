import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              style={{
                fontFamily: "Poppins",
                fontWeight: "bold",
                flex: 1,
                color: "gold",

                cursor: "pointer",
              }}
            >
              <Link to="/">Crypto Tracker</Link>
            </Typography>
            <Select
              variant="outlined"
              style={{
                width: 400,
                height: 40,
                marginRight: 15,
              }}
              value="INR"
            >
              <MenuItem value={"USD"}>USD $</MenuItem>
              <MenuItem value={"INR"}>INR ₹</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
