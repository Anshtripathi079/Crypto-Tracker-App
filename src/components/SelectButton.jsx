import { Box, styled } from "@mui/material";
import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  const StyledBox = styled(Box)({
    border: "1px solid gold",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Poppins",
    cursor: "pointer",
    backgroundColor: selected ? "gold" : "",
    color: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
    width: "22%",
  });
  return <StyledBox onClick={onClick}>{children}</StyledBox>;
};

export default SelectButton;
