import axios from "axios";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { Chart, Line } from "react-chartjs-2";
import { CryptoState } from "../context/CryptoContext";
import { HistoricalChart } from "../config/api";
import { Chart as ChartJS } from "chart.js/auto";
import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  createTheme,
  styled,
  ThemeProvider,
} from "@mui/material";

const CoinInfo = ({ coinID }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();

  useEffect(() => {
    const fetchHistoricData = async () => {
      if (coinID !== undefined) {
        const { data } = await axios.get(
          HistoricalChart(coinID, days, currency)
        );
        setHistoricData(data.prices);
      }
    };
    fetchHistoricData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
      type: "dark",
    },
  });

  const StyledContainer = styled(Box)(({ theme }) => ({
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  }));

  return (
    <ThemeProvider theme={darkTheme}>
      <StyledContainer>
        {!historicData ? (
          <CircularProgress size={250} thickness={1} sx={{ color: "gold" }} />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `price ( Past ${days} days) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                marginTop: "20px",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => {
                return (
                  <SelectButton
                    key={day.value}
                    onClick={() => setDays(day.value)}
                    selected={day.value === days}
                  >
                    {day.label}
                  </SelectButton>
                );
              })}
            </Box>
          </>
        )}
      </StyledContainer>
    </ThemeProvider>
  );
};

export default CoinInfo;
