import PageFrame from "../../../Components/PageFrame/PageFrame";
import {Responsive, WidthProvider} from "react-grid-layout";
import React, {ReactNode, useContext, useEffect, useMemo, useState} from "react";
import _ from "lodash";
import {Box, Card, Container, Grid, Grow, useMediaQuery} from "@mui/material";
import theme from "@mui/material/styles/defaultTheme"
import {useTheme} from "@mui/material/styles";
import {getUpdatedTime} from "../../../utils/dateHandler";
import {useAlert, useAlertContext} from "../../../Components/Providers/Alert/Alert.provider";
import {useConfirmation} from "../../../Components/Providers/ConfirmDialog/ConfirmDialog.provider";
import MainPage from "../../../Components/MainPage/MainPage";
import AddCard from "../../../Components/AddCard/AddCard";
import BoardCard from "../../../Components/BoardCard/BoardCard";
import {createBoard, defaultBoards, getAllBoards} from "../../../services/boards.services";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../Components/Providers/Authorization/Authorization.provider";
import {getReasonAlert} from "../../../utils/requestAlertHandler";
import AddDialog from "../../../Components/AddDialog/AddDialog";
import TextField from "@mui/material/TextField";
import DialogFormLabel from "../../../Components/DialogFormLabel/DialoFormLabel";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";

export const BoardsPage = () => {
  const [boards, setBoards] = useState(defaultBoards);
  const [loading, setLoading] = useState(true);
  const {setAlertEvent} = useAlert();
  const navigate = useNavigate();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [updatedTime, setUpdatedTime] = useState(getUpdatedTime());

  useEffect(() => {
    handleRefresh()
  }, []);

  const fetchData = async () => {
    const res = await getAllBoards()
    setBoards(res);
  }

  const handleRefresh = async () => {
    setLoading(true)
    fetchData()
        .then(() => setLoading(false))
        .catch((err) => {
          setAlertEvent(getReasonAlert(err));
          setLoading(false)
        })
  }

  const handleSubmitCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newBoard = {
      name: data.get('name') as string,
      description: data.get('description') as string
    }

    await createBoard(newBoard)
        .then(() => {
          setOpenAddDialog(false);
          handleRefresh();
        })
        .catch((err) => {
          setAlertEvent(getReasonAlert(err));
        })
  };

  return (
      <MainPage
          title="Le tue board"
          onRefresh={handleRefresh}
          icon={<DashboardCustomizeOutlinedIcon/>}
          updatedTime={updatedTime}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} container spacing={2}>
            {loading
                ? <>
                  <Grid item xs={12} md={4}>
                    <AddCard disabled/>
                  </Grid>
                  {[...Array(5)].map((el, index) => (
                          <Grow in key={index.toString()} style={{transitionDelay: `50ms`}}>
                            <Grid  item xs={12} md={4}>
                              <BoardCard isLoading/>
                            </Grid>
                          </Grow>
                      )
                  )}
                </>
                : <>
                  <Grow in style={{transitionDelay: `50ms`}}>
                    <Grid item xs={12} md={4}>
                      <AddCard onClick={() => setOpenAddDialog(true)}/>
                    </Grid>
                  </Grow>
                  {boards.map((el, index) => (
                      <Grow key={index.toString()} in style={{transitionDelay: `${index * 50}ms`}}>
                        <Grid item xs={12} md={4}>
                          <BoardCard board={el} onClick={() => navigate(`${el.id}`)}/>
                        </Grid>
                      </Grow>
                  ))}
                </>
            }
          </Grid>
        </Grid>
        <AddDialog
            title={"Crea una nuova board"}
            open={openAddDialog}
            setOpen={setOpenAddDialog}
            submitButtonText={"Crea"}
            handleSubmit={handleSubmitCreate}
        >
          <Grid container direction="column" spacing={1}>
            <Grid item container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                    id="name"
                    name="name"
                    label="Nome"
                    autoFocus
                    autoComplete="name"
                    fullWidth
                    required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    id="description"
                    name="description"
                    label="Descrizione"
                    autoComplete="description"
                    multiline
                    fullWidth
                    required
                />
              </Grid>
            </Grid>
          </Grid>
        </AddDialog>
      </MainPage>
  );
}
