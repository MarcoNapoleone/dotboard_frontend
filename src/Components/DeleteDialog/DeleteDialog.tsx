import React from "react";
import {
  alpha,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {LoadingButton} from "@mui/lab";

type DeleteDialogProps = {
  title: string,
  open: boolean,
  setOpen: (state: boolean) => void;
  handleDelete: (e: any) => void,
  loading?: boolean,
}
const DeleteDialog: React.FC<DeleteDialogProps> = (
  {
    title,
    open,
    setOpen,
    handleDelete,
    loading = false,
  }
) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        sx: {
          boxShadow: 0,
          borderRadius: '32px',
        }
      }}
      TransitionComponent={Fade}
      maxWidth="xl"
    >
      <DialogTitle>{"Elimina " + title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-slide-description">
          Stai per eliminare "{title}". Sei sicuro di voler procedere?
        </DialogContentText>
      </DialogContent>
      <Box pr={2} pb={2}>
        <DialogActions>
          <Button color="inherit" onClick={() => setOpen(false)}>
            <Box mx={2}>
              Cancella
            </Box>
          </Button>
          <LoadingButton
            color="error"
            loading={loading}
            sx={{
              backgroundColor: alpha(theme.palette.error.main, 0.2),
              "&:hover": {
                backgroundColor: alpha(theme.palette.error.main, 0.25),
              },
            }}
            onClick={handleDelete}
          >
            <Box mx={2}>
              Elimina
            </Box>
          </LoadingButton>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default DeleteDialog;