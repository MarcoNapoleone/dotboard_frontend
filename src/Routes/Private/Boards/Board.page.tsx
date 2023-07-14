import React, {useContext, useEffect, useState} from "react";
import {
  alpha,
  Box, Card, CardContent, Chip,
  darken,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  lighten,
  Select,
  Skeleton,
  Tooltip
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useAlertContext} from "../../../Components/Providers/Alert/Alert.provider";
import {useNavigate, useParams} from "react-router-dom";
import {getReasonAlert, getResponseAlert} from "../../../utils/requestAlertHandler";
import {addBoardItem, defaultBoard, deleteBoard, getBoard, getBoardItems} from "../../../services/boards.services";
import DetailsPage from "../../../Components/DetailsPage/DetailsPage";
import {getUpdatedTime} from "../../../utils/dateHandler";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import GridLayout from "../../../Components/GridLayout/GridLayout";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import {BoardItem, defaultBoardItems, updateBoardItem} from "../../../services/boardItems.services";
import {layoutFormatter} from "../../../utils/layoutFormatter";
import NoContentIcon from "../../../Components/NoContentIcon/NoContentIcon";
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import AddDialog from "../../../Components/AddDialog/AddDialog";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {BoardItemCategory} from "../../../entities/BoardItemCategory";
import AddIcon from '@mui/icons-material/Add';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Button from "@mui/material/Button";
import CodeIcon from '@mui/icons-material/Code';
import {AxiosError} from "axios";

type PageParamsType = {
  boardId: string;
}
export const BoardPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {boardId} = useParams<PageParamsType>();
  const [loading, setLoading] = useState(true);
  const [selectLoading, setSelectLoading] = useState(true);
  const [board, setBoard] = useState(defaultBoard);
  const [boardItems, setBoardItems] = useState(defaultBoardItems);
  const [layout, setLayout] = useState([]);
  const [birthDate, setBirthDate] = React.useState<Date | null>(null);
  const [updatedTime, setUpdatedTime] = useState(getUpdatedTime());
  const {setAlertEvent} = useContext(useAlertContext);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedItemCategory, setSelectedItemCategory]: [BoardItemCategory, (posts: BoardItemCategory) => void] = useState(null);

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
        .then(() => setLoading(false))
        .catch((err) => {
          setAlertEvent(getReasonAlert(err));
          setLoading(false)
        })
  }

  const handleDelete = () => {
    deleteBoard(boardId)
        .then((res) => {
          setAlertEvent(getResponseAlert(res));
          setOpenDeleteDialog(false);
          navigate(`/app/boards`)
        })
        .catch((err) => {
              setAlertEvent(getReasonAlert(err));
            }
        )
  }

  const handleItemDrop = (item) => {
    setOpenAddDialog(true)
    console.log(item)
  }

  const handleSelectAddCategory = (item: BoardItemCategory) => {
    setSelectedItemCategory(item as BoardItemCategory)
    setOpenAddDialog(true)
  }

  const handleAddItem = (event: React.FormEvent<HTMLFormElement>, category: BoardItemCategory) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get('title') as string;
    const subtitle = data.get('subtitle') as string;
    const url = data.get('url') as string;

    const newBoardItem: BoardItem = {
      title: title,
      subtitle: subtitle,
      url: url,
      category: category,
      w: 2,
      h: 3,
      x: 0,
      y: getBottomPosition(layout),
    }

    setLoading(true)
    addBoardItem(boardId, newBoardItem)
        .then(() => {
          setOpenAddDialog(false);
        })
        .catch((err) => {
              setAlertEvent(getReasonAlert(err));
            }
        )
  }

  const handleSaveBordLayout = () => {
    setLoading(true)
    boardItems.forEach((item) => {
      const newItem = boardItems.find((i) => i.id === item.id)
      const layoutItem = layout.find((l) => l.i === item.id.toString())
      if (newItem) {
        if (layoutItem) {
          console.log(newItem)
          updateBoardItem(newItem?.id, {
            x: layoutItem.x,
            y: layoutItem.y,
            w: layoutItem.w,
            h: layoutItem.h,
          })
              .then((res) => {
                setAlertEvent(getResponseAlert(res));
              })
              .catch((err) => {
                setAlertEvent(getReasonAlert(err));
                setLoading(false)
              })
        } else {
          console.log("non ho trovato il layout")
        }
      } else {
        console.log("non ho trovato l'item")
      }
      setLoading(false)
    })
  }

  const handleSubmitEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSaveBordLayout()
  };

  const getBottomPosition = (layout) => {
    let bottomPosition = 0;
    layout.forEach((item) => {
      if (item.y + item.h > bottomPosition) {
        bottomPosition = item.y + item.h;
      }
    });
    return bottomPosition;
  }

  return (
      <DetailsPage
          title={board?.name}
          icon={<DashboardCustomizeOutlinedIcon/>}
          loading={loading}
          updatedTime={updatedTime}
          breadcrumbs={breadcrumbs}
          allowModify={{edit: true, delete: true}}
          onDelete={handleDelete}
          onSubmit={handleSubmitEdit}
          onRefresh={handleRefresh}
          cardChildren={false}
          editChildren={
            <>
              {/*<Grid xs={12} container>
                <Grid item xs={12} md={3}>
                  <BaseBoardItem editMode>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item>
                          <DragIndicatorIcon/>
                      </Grid>
                      <Grid item>
                        <Typography>
                          Nuovo elemento
                        </Typography>
                      </Grid>
                    </Grid>
                  </BaseBoardItem>
                </Grid>
              </Grid>*/}
              <Box
                  sx={{
                    borderRadius: 32,
                    boxShadow: 0,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  }}
                  p={1}
              >
                <Grid container direction="row" justifyContent="space-between">
                  <Grid item xs container alignItems="center">
                    <Grid item sx={{color: theme.palette.text.secondary, pr: 1}}>
                      <IconButton color="inherit">
                        <AddIcon fontSize="inherit"/>
                      </IconButton>
                    </Grid>
                    <Divider orientation="vertical" flexItem/>
                    <Grid item sx={{color: theme.palette.text.secondary, px: 1}}>
                      <Tooltip title="Aggiungi testo" arrow>
                        <IconButton color="inherit" onClick={() => handleSelectAddCategory("TEXT")}>
                          <TextFieldsIcon fontSize="inherit"/>
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item sx={{color: theme.palette.text.secondary, pr: 1}}>
                      <Tooltip title="Aggiungi immagine" arrow>
                        <IconButton color="inherit" onClick={() => handleSelectAddCategory("IMAGE")}>
                          <ImageOutlinedIcon fontSize="inherit"/>
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item sx={{color: theme.palette.text.secondary, pr: 1}}>
                      <Tooltip title="Aggiungi meteo" arrow>
                        <IconButton color="inherit" onClick={() => handleSelectAddCategory("WEATHER")}>
                          <ThunderstormOutlinedIcon fontSize="inherit"/>
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item sx={{color: theme.palette.text.secondary, pr: 1}}>
                      <Tooltip title="Aggiungi pulsante" arrow>
                        <IconButton color="inherit" onClick={() => handleSelectAddCategory("API")}>
                          <PowerSettingsNewOutlinedIcon fontSize="inherit"/>
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item sx={{color: theme.palette.text.secondary, pr: 1}}>
                      <Tooltip title="Aggiungi iframe" arrow>
                        <IconButton color="inherit" onClick={() => handleSelectAddCategory("IFRAME")}>
                          <CodeIcon fontSize="inherit"/>
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Grid item xs="auto" container alignItems="center">
                    <Grid item sx={{color: theme.palette.text.secondary, px: 1}}>
                      <Button color="inherit" sx={{textTransform: 'none'}}
                      >
                        Tema
                      </Button>
                    </Grid>
                    <Divider orientation="vertical" flexItem/>
                    <Grid item sx={{color: theme.palette.text.secondary, px: 1}}>
                      <IconButton color="inherit">
                        <SettingsOutlinedIcon fontSize="inherit"/>
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <Box
                  mt={2}
                  style={{
                    border: `1px dashed ${
                        theme.palette.mode === 'light'
                            ? lighten(theme.palette.text.secondary, 0.6)
                            : darken(theme.palette.text.secondary, 0.6)
                    }`,
                    borderRadius: 32,
                    padding: 16,
                  }}
              >
                <GridLayout
                    layout={layout}
                    editMode
                    onLayoutChange={(layout) => setLayout(layout)}
                    onDroppedItem={handleItemDrop}/>
              </Box>

            </>
          }
          baseChildren={
            <>
              <Box pb={1}>
                <Typography variant="body2" color="text.secondary">
                  {board?.description}
                </Typography>
              </Box>
              {layout.length > 0 ?
                  <GridLayout isResizable={false} isDraggable={false} layout={layout}/>
                  : <Box py={2}><NoContentIcon caption="Non ci sono elementi, modifica per aggiungere"/></Box>}
            </>
          }
      >

        <AddDialog
            title="Nuovo elemento"
            handleSubmit={(e) => handleAddItem(e, selectedItemCategory)}
            open={openAddDialog}
            setOpen={setOpenAddDialog}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Chip label={selectedItemCategory?.toString()}/>
            </Grid>
            {getAddDialogBody(selectedItemCategory)}
          </Grid>
        </AddDialog>
      </DetailsPage>
  );
}

const getAddDialogBody = (selectedEBoardItem: BoardItemCategory) => {
  switch (selectedEBoardItem) {
    case "TEXT":
      return (
          <>
            <Grid item xs={12}>
              <TextField
                  id="title"
                  name="title"
                  label="Titolo"
                  autoFocus
                  autoComplete="title"
                  fullWidth
                  required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  id="subtitle"
                  name="subtitle"
                  label="Sottotitolo"
                  autoComplete="subtitle"
                  fullWidth
              />
            </Grid>
          </>
      )
    case "IMAGE":
      return (
          <>
            <Grid item xs={12}>
              <TextField
                  id="title"
                  name="title"
                  label="Titolo"
                  autoFocus
                  autoComplete="title"
                  fullWidth
                  required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  id="url"
                  name="url"
                  label="URL"
                  autoComplete="url"
                  fullWidth
                  required
              />
            </Grid>
          </>
      )
    case "WEATHER":
      return (
          <Grid item xs={12}>
            <TextField
                id="title"
                name="title"
                label="Città"
                autoFocus
                autoComplete="title"
                fullWidth
                required
            />
          </Grid>
      )
    case "IFRAME":
      return (
          <Grid item xs={12}>
            <>
              <Grid item xs={12}>
                <TextField
                    id="title"
                    name="title"
                    label="Titolo"
                    autoFocus
                    autoComplete="title"
                    fullWidth
                    required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    id="url"
                    name="url"
                    label="URL"
                    autoComplete="url"
                    fullWidth
                    required
                />
              </Grid>
            </>
          </Grid>
      )
    default:
      return (
          <></>
      )
  }
}


