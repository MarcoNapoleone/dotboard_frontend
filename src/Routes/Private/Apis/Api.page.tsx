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
import {defaultBoards, getAllBoards} from "../../../services/boards.services";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../Components/Providers/Authorization/Authorization.provider";
import {getReasonAlert} from "../../../utils/requestAlertHandler";

export const ApiPage = () => {
  const [boards, setBoards] = useState(defaultBoards);
  const [loading, setLoading] = useState(true);
  const {setAlertEvent} = useAlert();
  const navigate = useNavigate();
  const {loggedUser, setLoggedUser} = useAuth();
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


  return (
      <MainPage
          title="Le tue board"
          onRefresh={handleRefresh}
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
                          <Grow in style={{transitionDelay: `50ms`}}>
                            <Grid key={index.toString()} item xs={12} md={4}>
                              <BoardCard isLoading/>
                            </Grid>
                          </Grow>
                      )
                  )}
                </>
                : <>
                  <Grow in style={{transitionDelay: `50ms`}}>
                    <Grid item xs={12} md={4}>
                      <AddCard onClick={() => {
                      }}/>
                    </Grid>
                  </Grow>
                  {boards.map((el, index) => (
                      <Grow key={index.toString()} in style={{transitionDelay: `${index * 50}ms`}}>
                        <Grid item xs={12} md={4}>
                          <BoardCard board={el}/>
                        </Grid>
                      </Grow>
                  ))}
                </>
            }
          </Grid>
        </Grid>
      </MainPage>
  );
}
