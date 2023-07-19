import React, {useContext, useEffect, useState} from "react";
import {
  alpha,
  Box,
  Card,
  CardContent,
  Chip,
  darken, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Divider, Fade,
  Grid,
  IconButton,
  lighten, LinearProgress,
  Skeleton,
  Tooltip, useMediaQuery
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useAlertContext} from "../../../Components/Providers/Alert/Alert.provider";
import {useNavigate, useParams} from "react-router-dom";
import {getReasonAlert, getResponseAlert} from "../../../utils/requestAlertHandler";
import {
  addBoardItem,
  createBoard,
  defaultBoard,
  deleteBoard,
  getBoard,
  getBoardItems, getPublicBoard, updateBoard
} from "../../../services/boards.services";
import DetailsPage from "../../../Components/DetailsPage/DetailsPage";
import {getUpdatedTime} from "../../../utils/dateHandler";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import GridLayout from "../../../Components/GridLayout/GridLayout";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import {BoardItem, defaultBoardItems, deleteBoardItem, updateBoardItem} from "../../../services/boardItems.services";
import {layoutFormatter} from "../../../utils/layoutFormatter";
import NoContentIcon from "../../../Components/NoContentIcon/NoContentIcon";
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import AddDialog from "../../../Components/AddDialog/AddDialog";
import TextField from "@mui/material/TextField";
import {BoardItemCategory} from "../../../entities/BoardItemCategory";
import AddIcon from '@mui/icons-material/Add';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Button from "@mui/material/Button";
import CodeIcon from '@mui/icons-material/Code';
import {Layout} from "react-grid-layout";
import TextBoardItem from "../../../Components/BordItem/Text.boardItem";
import ImageBoardItem from "../../../Components/BordItem/Image.boardItem";
import WeatherBoardItem from "../../../Components/BordItem/Weather.boardItem";
import IframeBoardItem from "../../../Components/BordItem/Iframe.boardItem";
import {LoadingButton} from "@mui/lab";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

type PageParamsType = {
  boardId: string;
}
export const PublicBoardPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const {boardId} = useParams<PageParamsType>();
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState(defaultBoard);
  const [boardItems, setBoardItems] = useState(defaultBoardItems);
  const [layout, setLayout]: [Layout, (post: Layout) => void] = useState([]);
  const [updatedTime, setUpdatedTime] = useState(getUpdatedTime());
  const [username, setUsername] = useState<string>();
  const {setAlertEvent} = useContext(useAlertContext);


  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href={`/login`}
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
    const data = await getPublicBoard(boardId);
    const _board = data.board;
    setUsername(data.username);
    const _boardItems = await getBoardItems(boardId)
    setBoard(_board);
    setBoardItems(_boardItems);
    setLayout(layoutFormatter(_boardItems));
  }

  useEffect(() => {
    handleRefresh()
  }, []);

  const handleRefresh = () => {
    setLoading(true)
    setUpdatedTime(getUpdatedTime());
    fetchData()
      .then(() => {
        setLoading(false)
      })
      .catch((err) => {
        setAlertEvent(getReasonAlert(err));
        setLoading(false)
      })
  }

  function generateLayout(layout: Layout[]): JSX.Element[] {
    return layout.map((l) => {
      const item = boardItems.find((i) => i.id === parseInt(l.i))
      if (item) {
        switch (item.category) {
          case "TEXT":
            return (
              <div key={l.i} data-grid={l}>
                <TextBoardItem
                  title={item?.title}
                  subtitle={item?.subtitle}
                  isLoading={loading}
                />
              </div>
            );
          case "IMAGE":
            return (
              <div key={l.i} data-grid={l}>
                <ImageBoardItem
                  title={item?.title}
                  url={item?.url}
                  isLoading={loading}
                />
              </div>
            );
          case "WEATHER":
            return (
              <div key={l.i} data-grid={l}>
                <WeatherBoardItem
                  city={item?.title}
                  isLoading={loading}
                />
              </div>
            );
          case "API":
            return (
              <Card variant="outlined" key={l.i} data-grid={l}>
                <CardContent>{l.i}</CardContent>
              </Card>
            );
          case "IFRAME":
            return (
              <div key={l.i} data-grid={l}>
                <IframeBoardItem
                  title={item?.title}
                  src={item?.url}
                  onClick={() => {
                  }}
                  isLoading={loading}
                />
              </div>
            )
        }
      }
    });
  }


  return (
    <DetailsPage
      title={board?.name}
      icon={<DashboardCustomizeOutlinedIcon/>}
      loading={loading}
      updatedTime={updatedTime}
      breadcrumbs={breadcrumbs}
      chips={
        <Chip
          icon={board?.public ? <PeopleAltOutlinedIcon/> : <LockOutlinedIcon/>}
          label={username}
          color="secondary"
          sx={{
            borderRadius: theme.spacing(1),
            backgroundColor: alpha(theme.palette.secondary.main, 0.10),
            color: theme.palette.secondary.main,
          }}
          size="small"
        />
      }
      allowModify={{edit: false, delete: false}}
      onRefresh={handleRefresh}
      cardChildren={false}
      editChildren={
        <></>
      }
      baseChildren={
        <>
          <Box
            mt={2}
            style={{
              borderRadius: 32,
              padding: 16,
            }}
          >
            <Box pb={1} pl={2}>
              <Typography variant="body2" color="text.secondary">
                {board?.description}
              </Typography>
            </Box>
            {layout.length > 0 ?
              <GridLayout isResizable={false} isDraggable={false} layout={generateLayout(layout)}/>
              : <Box py={2}><NoContentIcon caption="Non ci sono elementi, modifica per aggiungere"/></Box>}
          </Box>
        </>
      }
    >
    </DetailsPage>
  );
}




