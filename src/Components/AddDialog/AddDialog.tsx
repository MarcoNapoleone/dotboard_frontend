import React, {FC, useEffect} from "react";
import {useTheme} from "@mui/material/styles";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  LinearProgress,
  Typography,
  useMediaQuery
} from "@mui/material";

type AddDialogProps = {
  title: string,
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  open: boolean,
  setOpen: (state: boolean) => void;
  loading?: boolean,
  onClose?: () => void,
  onDialogRender?: () => void,
  submitButtonText?: string,
  children?: React.ReactNode,
}

const AddDialog: FC<AddDialogProps> = (
  {
    title,
    handleSubmit,
    open,
    setOpen,
    loading,
    children,
    onClose,
    onDialogRender,
    submitButtonText,
  }) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpen(false)
    if (onClose) onClose();
  }

  useEffect(() => {
    if (onDialogRender) onDialogRender();
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
        <Typography variant="h6">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Box component="form" id={title} noValidate onSubmit={handleSubmit}>
            {children}
          </Box>
        </DialogContentText>
      </DialogContent>
      <Box pr={2} pb={2}>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            <Box mx={2}>cancel</Box>
          </Button>
          <Button
            color="primary"
            type="submit"
            form={title}
          >
            <Box mx={2}>
              {Boolean(submitButtonText) ? submitButtonText : 'Add'}
            </Box>
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default AddDialog;