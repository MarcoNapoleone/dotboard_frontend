import React, {useEffect, useState} from "react";
import {
  alpha, Box,
  Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Fade,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  Select,
  Typography, useMediaQuery
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {useAlert} from "../../../Components/Providers/Alert/Alert.provider";
import {useNavigate} from "react-router-dom";
import {getReasonAlert} from "../../../utils/requestAlertHandler";
import {defaultBoards, getAllBoards} from "../../../services/boards.services";
import MainPage from "../../../Components/MainPage/MainPage";
import {getUpdatedTime} from "../../../utils/dateHandler";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import {useConfirmation} from "../../../Components/Providers/ConfirmDialog/ConfirmDialog.provider";
import DatagridTable from "../../../Components/DatagridComponents/DatagridTable";
import AddDialog from "../../../Components/AddDialog/AddDialog";
import DialogFormLabel from "../../../Components/DialogFormLabel/DialoFormLabel";
import TextField from "@mui/material/TextField";
import {
  API,
  createAPI,
  defaultAPI,
  defaultAPIs,
  deleteAPI,
  getAllAPIs,
  updateAPI
} from "../../../services/apis.services";
import {useTheme} from "@mui/material/styles";
import Link from "@mui/material/Link";
import DataObjectOutlinedIcon from "@mui/icons-material/DataObjectOutlined";
import {Method} from "../../../utils/methods";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from '@mui/icons-material/Edit';
import {LoadingButton} from "@mui/lab";
import Button from "@mui/material/Button";
export const ApisPage = () => {
  const theme = useTheme();
  const [apis, setApis] = useState(defaultAPIs);
  const [loading, setLoading] = useState(true);
  const {confirm} = useConfirmation();
  const {setAlertEvent} = useAlert();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [updatedTime, setUpdatedTime] = useState(getUpdatedTime());
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedMethod, setSelectedMethod]: [Method, (selectedMethod: Method) => void] = useState();
  const [selectedAPI, setSelectedAPI] = useState(defaultAPI);

  useEffect(() => {
    handleRefresh()
  }, []);

  const fetchData = async () => {
    const res = await getAllAPIs()
    setApis(res);
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

  const handleCloseDialogs = () => {
    setOpenAddDialog(false)
    setOpenEditDialog(false)
    setSelectedAPI(null)
    setSelectedMethod(null)
  }

  const handleMoreInfoClick = (e: any) => {
    setOpenEditDialog(true)
    setSelectedAPI(apis.find((api) => api.id === e.row.id) as API)
  };
  const RenderMoreButton = (e: any) => {

    return (
      <IconButton
        onClick={() => handleMoreInfoClick(e)}
      >
        <EditIcon/>
      </IconButton>
    );
  }

  const RenderDeleteButton = (e: any) => {
    const handleDeleteClick = async () => {
      setLoading(true);
      confirm(
        {
          title: "Elimina API",
          onConfirm: async () => {
            await deleteAPI(e.row.id)
              .then(() => {
                handleRefresh();
              })
              .catch((err) => {
                setAlertEvent(getReasonAlert(err));
              })
          }
        }
      )
    };
    return (

      <IconButton
        onClick={handleDeleteClick}
      >
        <DeleteIcon/>
      </IconButton>
    );
  }

  const handleSubmitCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const newAPI = {
      name: data.get('name') as string,
      url: data.get('url') as string,
      method: selectedMethod,
    }
    createAPI(newAPI)
      .then(() => {
        setOpenAddDialog(false);
        handleRefresh();
      })
      .catch((err) => {
        setAlertEvent(getReasonAlert(err));
      })
  };

  const handleSubmitEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const newAPI: API = {
      id: selectedAPI.id,
      name: data.get('name') as string,
      url: data.get('url') as string,
      method: selectedMethod,
    }
    updateAPI(selectedAPI?.id, newAPI)
      .then(() => {
        setOpenEditDialog(false);
        handleRefresh();
      })
      .catch((err) => {
        setAlertEvent(getReasonAlert(err));
      })
  }

  const rows = apis.map((api: API) => {
    return {
      id: api.id,
      name: api.name,
      url: api.url,
      method: api.method,
    }
  })
  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      width: 90,
      align: 'center',
      editable: false,
      headerAlign: 'center',
    },
    {
      field: 'name',
      headerName: 'Nome',
      minWidth: 150,
      editable: false,
    },
    {
      field: 'url',
      headerName: 'Url',
      minWidth: 150,
      editable: false,
      renderCell: (e: any) => {
        return (
          <Link
            href={e.row.url}
            underline="always"
            color="inherit"
          >
            {e.row.url}
          </Link>
        )
      },
      flex: 1,
    },
    {
      field: 'method',
      headerName: 'Method',
      minWidth: 150,
      editable: false,
      renderCell: (e: any) => {
        return (
          <Chip
            size="small"
            sx={{
              color: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
            }}
            label={e.row.method}
            color="primary"
          />
        )
      }
    },
    {
      field: 'more',
      headerName: 'Modifica',
      description: 'Details',
      align: 'center',
      renderCell: RenderMoreButton,
      width: 90,
      editable: false,
      sortable: false,
      headerAlign: 'center',
    },
    {
      field: 'delete',
      headerName: 'Elimina',
      description: 'Delete',
      align: 'center',
      renderCell: RenderDeleteButton,
      width: 110,
      editable: false,
      sortable: false,
      headerAlign: 'center',
    }
  ];

  return (
    <MainPage
      title="APIs"
      onRefresh={handleRefresh}
      icon={<DataObjectOutlinedIcon/>}
      updatedTime={updatedTime}
    >
      <DatagridTable
        rows={rows}
        allowAdd
        onAdd={() => setOpenAddDialog(true)}
        columns={columns}
        loading={loading}
        onRowDoubleClick={handleMoreInfoClick}
      />
      <AddDialog
        title={"Aggiungi API"}
        open={openAddDialog}
        setOpen={setOpenAddDialog}
        handleSubmit={handleSubmitCreate}
      >
        <Grid container direction="column" spacing={1}>
          <Grid item xs={12}>
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
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Method</InputLabel>
              <Select
                labelId="labelSelectMethod"
                id="mehod"
                value={selectedMethod}
                label="Method"
                onChange={(e) => setSelectedMethod(e.target.value as Method)}
              >
                <MenuItem value={'GET'}><Chip label="GET"/></MenuItem>
                <MenuItem value={'POST'}><Chip label="POST"/></MenuItem>
                <MenuItem value={'PUT'}><Chip label="PUT"/></MenuItem>
                <MenuItem value={'DELETE'}><Chip label="DELETE"/></MenuItem>
              </Select>
            </FormControl>
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
        </Grid>
      </AddDialog>
      <Dialog
        open={openEditDialog}
        onClose={handleCloseDialogs}
        fullWidth
        disableEscapeKeyDown
        PaperProps={{
          sx: {
            boxShadow: 0,
            borderRadius: !isMobile && theme.spacing(4),
          }
        }}
        scroll="paper"
        TransitionComponent={Fade}
        fullScreen={isMobile}
      >
        {loading && <LinearProgress color="primary"/>}
        <DialogTitle>
          <Typography variant="h6">Modifica elemento</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box component="form" id="editItemDilog" noValidate onSubmit={()=>{}}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="name"
                    name="name"
                    label="Nome"
                    autoFocus
                    defaultValue={selectedAPI?.name }
                    autoComplete="name"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Method</InputLabel>
                    <Select
                      labelId="labelSelectMethod"
                      id="mehod"
                      value={selectedMethod}
                      label="Method"
                      onChange={(e) => setSelectedMethod(e.target.value as Method)}
                    >
                      <MenuItem value={'GET'}><Chip label="GET"/></MenuItem>
                      <MenuItem value={'POST'}><Chip label="POST"/></MenuItem>
                      <MenuItem value={'PUT'}><Chip label="PUT"/></MenuItem>
                      <MenuItem value={'DELETE'}><Chip label="DELETE"/></MenuItem>
                    </Select>
                  </FormControl>
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
              </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
        <Box pr={2} pb={2}>
          <DialogActions>
            <Button color="inherit" onClick={handleCloseDialogs}>
              <Box mx={2}>Cancella</Box>
            </Button>
            <Button
              color="primary"
              type="submit"
              form="editItemDilog"
            >
              <Box mx={2}>
                Salva
              </Box>
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </MainPage>
  );
}
