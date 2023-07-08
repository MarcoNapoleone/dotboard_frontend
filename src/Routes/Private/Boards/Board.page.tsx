import PageFrame from "../../../Components/PageFrame/PageFrame";
import {Responsive, WidthProvider} from "react-grid-layout";
import React, {ReactNode, useEffect, useMemo, useState} from "react";
import _ from "lodash";
import {Box, Card, Container, Grid, useMediaQuery} from "@mui/material";
import theme from "@mui/material/styles/defaultTheme"
import {useTheme} from "@mui/material/styles";
import {useAlert} from "../../../Components/Providers/Alert/Alert.provider";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../Components/Providers/Authorization/Authorization.provider";
import {getReasonAlert} from "../../../utils/requestAlertHandler";
import {defaultBoard, defaultBoards, getAllBoards} from "../../../services/boards.services";

export const BoardPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  return (
      <PageFrame>
        <Container maxWidth="xl" disableGutters={isMobile}>
          <Grid container justifyContent="center" direction="column" spacing={1} pt={10}>
            {/*<ResponsiveReactGridLayout
                className="layout"
                isResizable={false}
                breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                cols={{lg: 6, md: 6, sm: 2, xs: 2, xxs: 1}}
                useCSSTransforms
                preventCollision={false}
                onDragStart={(e) => console.log("drag start", e)}
                rowHeight={200}
            >
              {layout.map((item) => {
                return (
                    <Card key={item.i}>
                      <Box>{item.i}</Box>
                    </Card>
                );
              })}
            </ResponsiveReactGridLayout>*/}
          </Grid>
        </Container>
      </PageFrame>
  );
}
