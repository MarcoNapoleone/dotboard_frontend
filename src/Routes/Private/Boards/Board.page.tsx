import PageFrame from "../../../Components/PageFrame/PageFrame";
import {Responsive, WidthProvider} from "react-grid-layout";
import React, {ReactNode, useContext, useEffect, useMemo, useState} from "react";
import _ from "lodash";
import {Box, Card, CardActions, CardContent, CardMedia, Container, Grid, Skeleton, useMediaQuery} from "@mui/material";
import theme from "@mui/material/styles/defaultTheme"
import {useTheme} from "@mui/material/styles";
import {useAlert, useAlertContext} from "../../../Components/Providers/Alert/Alert.provider";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../../Components/Providers/Authorization/Authorization.provider";
import {getReasonAlert} from "../../../utils/requestAlertHandler";
import {defaultBoard, defaultBoards, getAllBoards, getBoard} from "../../../services/boards.services";
import DetailsPage from "../../../Components/DetailsPage/DetailsPage";
import {getUpdatedTime} from "../../../utils/dateHandler";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import MinMaxLayout from "../../../Components/GridLayout/MinMaxLayout";
import TextBoardItem from "../../../Components/BordItem/Text.boardItem";
import PictureBoardItem from "../../../Components/BordItem/Picture.boardItem";
import ButtonBoardItem from "../../../Components/BordItem/Button.boardItem";
import WeatherBoardItem from "../../../Components/BordItem/Weather.boardItem";

type PageParamsType = {
  boardId: string;
}
export const BoardPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {boardId} = useParams<PageParamsType>();
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState(defaultBoard);
  const [birthDate, setBirthDate] = React.useState<Date | null>(null);
  const [updatedTime, setUpdatedTime] = useState(getUpdatedTime());
  const {setAlertEvent} = useContext(useAlertContext);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const layout = [
    {i: "a", x: 0, y: 0, w: 2, h: 2, static: true},
    {i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
    {i: "c", x: 4, y: 0, w: 1, h: 2}
  ];
  const breadcrumbs = [
    <Link
        underline="hover"
        key="1"
        color="inherit"
        href={`/app/boards`}
    >
      App
    </Link>,
    <Typography
        key="3" color="text.primary"
    >
      {loading
          ? <Skeleton animation="wave" width="30px"/>
          : board?.name
      }
    </Typography>,
  ];

  const fetchData = async () => {
    const _board = await getBoard(boardId)
    setBoard(_board);
  }

  useEffect(() => {
    handleRefresh()
  }, []);

  const handleRefresh = () => {
    setLoading(true)
    setUpdatedTime(getUpdatedTime());
    fetchData()
        .then(() => setLoading(false))
        .catch((err) => {
          setAlertEvent(getReasonAlert(err));
          setLoading(false)
        })
  }

  const handleDelete = () => {

  }

  const handleSubmitEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  };

  return (
      <DetailsPage
          title={board?.name}
          loading={loading}
          updatedTime={updatedTime}
          breadcrumbs={breadcrumbs}
          allowModify={{edit: true, delete: true}}
          onDelete={handleDelete}
          onSubmit={handleSubmitEdit}
          onRefresh={handleRefresh}
          editChildren={
            <Grid container direction="column" spacing={1}>

            </Grid>
          }
          baseChildren={

            <Box height={100}>

            </Box>
          }
      >

        <MinMaxLayout/>
        <Box p={2}>
          <Grid xs={12} container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextBoardItem title={"To do"} caption={"lavare i piatti"}/>
            </Grid>
            <Grid item xs={12} md={3}>
              <PictureBoardItem caption="Iguana verde"
                                picture="https://mui.com/static/images/cards/contemplative-reptile.jpg"/>
            </Grid>
            <Grid item xs={12} md={3}>
              <ButtonBoardItem title={"Lamp"}/>
            </Grid>
            <Grid item xs={12} md={3}>
              <WeatherBoardItem city="New York" />
            </Grid>
          </Grid>
        </Box>
      </DetailsPage>
  );
}
