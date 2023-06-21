import { Box, LinearProgress, styled, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../context/CryptoContext";
import parse from "html-react-parser";

function numberWithCommas(x) {
  if (x !== undefined)
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinPage = () => {
  window.scrollTo(0, 0);
  const { id } = useParams();
  const [coin, setCoin] = useState([]);
  const { currency, symbol } = CryptoState();

  useEffect(() => {
    const fetchCoin = async () => {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    };
    fetchCoin();
  }, []);

  const StyledOuterContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    marginBottom: 70,
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const StyledSidebarContainer = styled(Box)(({ theme }) => ({
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  }));

  const StyledCoinAttributes = styled(Box)(({ theme }) => ({
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  }));

  const StyledCoinHeading = styled(Typography)({
    fontWeight: "bold",
    marginBottom: "20px",
    fontFamily: "Poppins",
  });

  const StyledCoinDesc = styled(Typography)({
    width: "100%",
    fontFamily: "Poppins",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  });

  var parsed_desc = "";
  let desc = coin?.description?.en.split(". ")[0];
  if (desc !== undefined)
    parsed_desc = parse(coin?.description?.en.split(". ")[0]);

  if (!coin) return <LinearProgress sx={{ backgroundColor: "gold" }} />;

  return (
    <StyledOuterContainer>
      <StyledSidebarContainer>
        <img
          src={coin?.image?.large}
          alt={coin?.name}
          height="200"
          sx={{ marginBottom: 20 }}
        />
        <StyledCoinHeading variant="h3">{coin?.name}</StyledCoinHeading>
        <StyledCoinDesc variant="subtitle1">{parsed_desc}.</StyledCoinDesc>

        <StyledCoinAttributes>
          <span sx={{ display: "flex" }}>
            <Typography variant="h5">
              Rank : <span>{coin?.market_cap_rank}</span>
            </Typography>
          </span>

          <span sx={{ display: "flex" }}>
            <Typography variant="h5">
              Current Price: {symbol}{" "}
              {numberWithCommas(
                coin?.market_data?.current_price[currency.toLowerCase()]
              )}{" "}
              {/*TODO : Change Styles of Attribute and Data*/}
            </Typography>
          </span>

          <span sx={{ display: "flex" }}>
            <Typography variant="h5">
              Market Cap : {symbol}{" "}
              {numberWithCommas(
                coin?.market_data?.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M {/* TODO : Change Styles of Attribute and Data*/}
            </Typography>
          </span>
        </StyledCoinAttributes>
      </StyledSidebarContainer>
      <CoinInfo coinID={coin.id} />
    </StyledOuterContainer>
  );
};

export default CoinPage;
