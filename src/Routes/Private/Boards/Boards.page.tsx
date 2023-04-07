import PageFrame from "../../../Components/PageFrame/PageFrame";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import React from "react";
import {Box, Card, Container, Grid, useMediaQuery} from "@mui/material";
import theme from "@mui/material/styles/defaultTheme"

export const BoardsPage = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const layout = [
    { i: "a", x: 0, y: 0, w: 2, h: 2, static: true },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 }
  ];
  return (
   <PageFrame>
     <Container maxWidth="xl" disableGutters={isMobile}>
       <Grid container justifyContent="center" direction="column" spacing={1} pt={10}>
     <ResponsiveGridLayout
       className="layout"
       breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
       layouts={layout}
       cols={{ lg: 6, md: 6, sm: 3, xs: 2, xxs: 2 }}
       rowHeight={30}
       width={1200}
     >
       <Card key="a" ><Box p={2}>a</Box></Card>
       <Card key="b" ><Box p={2}>b</Box></Card>
       <Card key="c" ><Box p={2}>c</Box></Card>
     </ResponsiveGridLayout>
       </Grid>
     </Container>
   </PageFrame>
  );
}
