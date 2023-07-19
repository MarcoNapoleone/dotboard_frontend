// @ts-ignore
import React, {FC, useContext, useState} from 'react';
import {useParams} from "react-router-dom";
import {
  alpha,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  DialogActions,
  Fab,
  Fade,
  Grid,
  Grow,
  IconButton,
  Link,
  ListItemButton,
  ListSubheader,
  Skeleton,
  Slide,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  Zoom
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {useTheme} from "@mui/material/styles";
import PageTitle from "../PageTitle/PageTitle";
import SyncButton from "../SyncButton/SyncButton";
import DetailsLoading from "../DetailsLoading/DetailsLoading";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import DeleteDialog from "../DeleteDialog/DeleteDialog";
import GridLayout from "../GridLayout/GridLayout";

interface modifyConfig {
  edit: boolean;
  delete: boolean;
}

interface Anchor {
  title: string;
  id: string;
}

type PageParamsType = {
  pagePath: string;
  id: string;
};

interface DetailsPageProps {
  icon?: React.ReactNode,
  title: string,
  updatedTime?: string,
  loading?: boolean,
  onRefresh?: () => void,
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void,
  onDelete?: () => void,
  onEditMode?: () => void,
  onCancelEdit?: () => void,
  editChildren?: React.ReactNode,
  baseChildren?: React.ReactNode,
  chips?: React.ReactNode,
  noEditElement?: React.ReactNode,
  allowModify?: modifyConfig,
  cardChildren?: boolean,
  breadcrumbs?: JSX.Element[],
  baseChildrenLoadingRows?: number,
  baseChildrenLoadingColumns?: number,
  anchors?: Anchor[],
  children?: React.ReactNode,
}

const DetailsPage: FC<DetailsPageProps> = (
  {
    icon,
    title,
    updatedTime,
    loading,
    onRefresh,
    onSubmit,
    allowModify,
    cardChildren = true,
    noEditElement,
    onDelete,
    breadcrumbs,
    chips,
    onEditMode,
    onCancelEdit,
    editChildren,
    baseChildren,
    children,
    anchors,
    baseChildrenLoadingRows,
    baseChildrenLoadingColumns,
  }
) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [editMode, setEditMode] = useState(false);
  const {pagePath} = useParams<PageParamsType>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const hasAnchors = !loading
    && !editMode
    && isLargeScreen
    && anchors?.length > 0;

  const usedBreadcrumbs = Boolean(breadcrumbs) ? breadcrumbs : [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/app/dashboard/"
    >
      App
    </Link>,
    <Typography
      key="3" color="text.primary"
    >
      {loading
        ? <Skeleton animation="wave" width="30px"/>
        : title?.charAt(0).toUpperCase() + title?.slice(1)
      }
    </Typography>,
  ];

  const handleCancelEdit = () => {
    setEditMode(false);
    if (onCancelEdit) onCancelEdit();
  }
  const handleEditMode = () => {
    setEditMode(!editMode);
    if (onEditMode && !editMode) onEditMode();
  }

  return (
    <Box
      component="form"
      noValidate
      id="editForm"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        onSubmit(event);
        setEditMode(false);
      }}
      sx={{
        display: 'grid',
        gridTemplateColumns: `1fr ${hasAnchors ? '242px' : 0}`
      }}
    >
      <Grid item container direction="column" spacing={1} px={4} pt={10}>
        <Grid item>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small"/>}
          >
            {usedBreadcrumbs}
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <PageTitle title={title} icon={!isMobile && icon ? icon : null} loading={loading}>
            {!isMobile
              ? !editMode && <Grow in key={2}>
              <Stack direction="row" spacing={1}>
                {allowModify.edit && <Tooltip title="Modifica" arrow TransitionComponent={Zoom}>
                  <IconButton
                    id="3"
                    color="primary"
                    children={<ModeEditOutlineOutlinedIcon/>}
                    onClick={handleEditMode}
                  />
                </Tooltip>}
                {allowModify.delete && <Tooltip title="Elimina" arrow TransitionComponent={Zoom}>
                  <IconButton
                    id="4"
                    onClick={() => setOpenDeleteDialog(true)}
                    children={<DeleteIcon/>}
                  />
                </Tooltip>}
              </Stack>
            </Grow>
              : !loading && !allowModify && noEditElement
              /*<Grow in key={1}>
              <Stack direction="row" spacing={1}>
                <Tooltip title="Salva modifiche" arrow TransitionComponent={Zoom}>
                  <IconButton
                    color="primary"
                    id="1"
                    form="editForm"
                    children={<SaveOutlinedIcon/>}
                    type="submit"
                  />
                </Tooltip>
                <Tooltip title="Annulla modifiche" arrow TransitionComponent={Zoom}>
                  <IconButton
                    id="2"
                    children={<CloseIcon/>}
                    onClick={() => setEditMode(false)}
                  />
                </Tooltip>
              </Stack>
            </Grow>*/}
          </PageTitle>
        </Grid>
        <Grid item container spacing={1}>
          {updatedTime
            && <Grid item>
              <SyncButton updatedTime={updatedTime} onClick={onRefresh}/>
            </Grid>}
          {chips
            && <Grid item>
              {!loading && chips}
            </Grid>
          }
        </Grid>
        <Grid item mt={3}>
          {loading
            ? <Card variant="outlined">
                <DetailsLoading rows={baseChildrenLoadingRows} columns={baseChildrenLoadingColumns}/>
              </Card>
            : editMode
              ? <Fade in key={1}>
                <div>
                  {cardChildren
                    ? <Card variant="outlined">
                      <CardContent>
                        <Box py={1}>
                          {editChildren}
                        </Box>
                        <DialogActions>
                          <Button color="inherit"
                                  onClick={handleCancelEdit}
                          >
                            <Box mx={2}>annulla</Box>
                          </Button>
                          <Button
                            color="primary"
                            id="1"
                            form="editForm"
                            type="submit"
                            sx={{
                              backgroundColor: alpha(theme.palette.primary.main, 0.2),
                              "&:hover": {
                                backgroundColor: alpha(theme.palette.primary.main, 0.25),
                              },
                            }}>
                            <Box mx={2}>
                              salva
                            </Box>
                          </Button>
                        </DialogActions>
                      </CardContent>
                    </Card>
                    : <div>
                      <Box py={1}>
                        {editChildren}
                      </Box>
                      <DialogActions>
                        <Button color="inherit"
                                onClick={handleCancelEdit}
                        >
                          <Box mx={2}>annulla</Box>
                        </Button>
                        <Button
                          color="primary"
                          id="1"
                          form="editForm"
                          type="submit"
                          sx={{
                            backgroundColor: alpha(theme.palette.primary.main, 0.2),
                            "&:hover": {
                              backgroundColor: alpha(theme.palette.primary.main, 0.25),
                            },
                          }}>
                          <Box mx={2}>
                            salva
                          </Box>
                        </Button>
                      </DialogActions>
                    </div>
                  }
                  <Box pt={1}>
                    {children}
                  </Box>
                </div>
              </Fade>
              : <Fade in={Boolean(baseChildren)} key={2}>
                <div>
                  {cardChildren ? <Card variant="outlined">
                      <CardContent>
                        {baseChildren}
                      </CardContent>
                    </Card>
                    : <div>{baseChildren}</div>
                  }
                  <Box pt={2}>
                    {children}
                  </Box>
                </div>
              </Fade>
          }
        </Grid>
      </Grid>
      {anchors?.length > 0 && !isMobile
        && <Box
          pt={updatedTime ? 23 : 19}
          pr={2}
          sx={{
            top: '0px',
            position: 'sticky',
            height: '100vh',
            overflowY: 'auto',
          }}
        >
          <Slide in={hasAnchors} direction="left" unmountOnExit mountOnEnter>
            <List
              dense
              sx={{
                width: '100%',
                bgcolor: 'background.default',
              }}
              component="nav"
              subheader={
                <ListSubheader
                  sx={{
                    width: '100%',
                    bgcolor: 'background.default',
                    fontWeight: 800
                  }}
                >
                  Contents
                </ListSubheader>
              }
            >
              {[{title: "Details", id: ""}].concat(anchors)?.map((anchor, key) =>
                <ListItemButton
                  key={key}
                  sx={{
                    transition: 'all 0.5s ease',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.15),
                      color: theme.palette.primary.main
                    }
                  }}
                  href={`#${anchor?.id}`}
                >
                  <ListItemText primary={anchor?.title}/>
                </ListItemButton>
              )}
            </List>
          </Slide>
        </Box>
      }
      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        handleDelete={onDelete}
        title={title}
      />
      <Zoom
        in={!loading && isMobile && allowModify && !editMode}
        style={{transitionDelay: '200ms'}}
        unmountOnExit
        mountOnEnter
      >
        <Fab
          sx={{
            margin: 0,
            top: 'auto',
            right: 16,
            bottom: 16,
            left: 'auto',
            position: 'fixed',
          }}
          onClick={handleEditMode}
        >
          <ModeEditOutlineOutlinedIcon/>
        </Fab>
      </Zoom>
    </Box>
  );
}

export default DetailsPage;

