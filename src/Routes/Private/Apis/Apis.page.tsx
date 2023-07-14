import React, {useEffect, useState} from "react";
import {alpha, Chip, Grid, IconButton, Typography} from "@mui/material";
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
import {API, getAllAPIs} from "../../../services/apis.services";
import {useTheme} from "@mui/material/styles";
import Link from "@mui/material/Link";
import DataObjectOutlinedIcon from "@mui/icons-material/DataObjectOutlined";

export const ApisPage = () => {
  const theme = useTheme();
  const [apis, setApis] = useState(defaultBoards);
  const [loading, setLoading] = useState(true);
  const {confirm} = useConfirmation();
  const {setAlertEvent} = useAlert();
  const navigate = useNavigate();
  const [updatedTime, setUpdatedTime] = useState(getUpdatedTime());
  const [openAddDialog, setOpenAddDialog] = useState(false);


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

  const handleMoreInfoClick = (e: any) => {
    navigate(`/app`);
  };
  const RenderMoreButton = (e: any) => {

    return (
        <IconButton
            onClick={() => handleMoreInfoClick(e)}

        >
          <OpenInNewOutlinedIcon/>
        </IconButton>
    );
  }

  const RenderDeleteButton = (e: any) => {
    const handleDeleteClick = async () => {
      setLoading(true);
      confirm(
          {
            title: "Delete HR",
            onConfirm: async () => {

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
  };

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
      headerName: 'More',
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
            title={"Add HR"}
            open={openAddDialog}
            setOpen={setOpenAddDialog}
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
              <Grid item xs={12} sm={6}>
                <TextField
                    id="surname"
                    name="surname"
                    label="Surname"
                    autoComplete="surname"
                    fullWidth
                    required
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                  id="fiscalCode"
                  name="fiscalCode"
                  label="Fiscal Code"
                  autoComplete="fiscalCode"
                  fullWidth
                  required
              />
            </Grid>
            <Grid item>
              <DialogFormLabel title="Info"/>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                    id="birthPlace"
                    name="birthPlace"
                    label="Birth Place"
                    autoComplete="birthPlace"
                    fullWidth
                    required
                />
              </Grid>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                    id="address"
                    name="address"
                    label="Address"
                    autoComplete="address"
                    fullWidth
                    required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    id="municipality"
                    name="municipality"
                    label="Municipality"
                    autoComplete="municipality"
                    fullWidth
                    required
                />
              </Grid>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                    id="postalCode"
                    name="postalCode"
                    label="Postal code"
                    autoComplete="postalCode"
                    fullWidth
                    required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    id="province"
                    name="province"
                    label="Province"
                    autoComplete="province"
                    fullWidth
                    required
                />
              </Grid>
            </Grid>
            <Grid item>
              <DialogFormLabel title="Contacts"/>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                    id="phone"
                    name="phone"
                    label="Phone"
                    autoComplete="phone"
                    fullWidth
                    required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    id="email"
                    name="email"
                    label="Email"
                    autoComplete="email"
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
