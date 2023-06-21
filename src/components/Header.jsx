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
import { CryptoState } from "../context/CryptoContext";

const Header = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const { currency, setCurrency } = CryptoState();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              variant="h5"
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
                width: 100,
                height: 40,
                marginRight: 15,
              }}
              value={currency}
              onChange={(e) => {
                setCurrency(e.target.value);
              }}
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
