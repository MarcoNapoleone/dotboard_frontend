import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  alpha,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { getFormattedDate } from "../../utils/dateHandler";
import { Board } from "../../services/boards.services";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

type CompanyCardProps = {
  city: string;
  isLoading?: boolean;
};

const WeatherBoardItem: React.FC<CompanyCardProps> = ({
                                                        city,
                                                        isLoading,
                                                      }) => {
  const theme = useTheme();
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiEndPoint = `https://api.weatherapi.com/v1/current.json?key=9448cb3d7542441381860302231405&q=${city}&aqi=no&lang=it`;
        const response = await fetch(apiEndPoint);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (!isLoading) {
      fetchData();
    }
  }, [city, isLoading]);

  return (
      <>
        {isLoading ? (
            <Skeleton
                variant="rectangular"
                width="100%"
                animation="wave"
                sx={{ borderRadius: "16px" }}
            >
              <CardActionArea
                  sx={{
                    height: "100%",
                  }}
              >
                <CardContent>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <Box color="text.secondary">
                        <AccessTimeOutlinedIcon
                            fontSize="small"
                            color="inherit"
                        />
                      </Box>
                    </Grid>
                    <Grid item>
                      <Typography
                          gutterBottom
                          variant="body2"
                          component="div"
                          color="text.secondary"
                      >
                        loading
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography gutterBottom variant="h5" component="div">
                    loading
                  </Typography>
                  <Chip size="small" label="loading" />
                </CardContent>
              </CardActionArea>
            </Skeleton>
        ) : (
            <Card variant="outlined">
              <CardActionArea
                  sx={{
                    height: "100%",
                  }}
              >
                <CardContent>
                  {weatherData && (
                      <>
                         <Typography gutterBottom variant="body2" component="div" color="text.secondary">
                            {weatherData.location.name}
                         </Typography>
                        <Grid container justifyContent="space-between" alignItems="center">
                          <Grid item>
                            <Typography  variant="h4" component="div">
                              {weatherData.current.temp_c}°C
                            </Typography>
                          </Grid>
                          <Grid item>
                            <img height="48"  src={weatherData.current.condition.icon} alt=""/>
                          </Grid>
                        </Grid>
                        <Chip
                            size="small"
                            label={weatherData.current.condition.text}
                        />
                      </>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
        )}
      </>
  );
};

export default WeatherBoardItem;
