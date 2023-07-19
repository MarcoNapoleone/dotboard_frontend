import {
  alpha,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade
} from '@mui/material';
import React, {createContext, useCallback, useState} from 'react';
import {useTheme} from "@mui/material/styles";

interface ConfirmationProviderProps {
  children: React.ReactNode;
}

interface ConfirmationContextType {
  confirm: (params: {
    onConfirm: () => void,
    onCancel?: () => void,
    title?: string,
    message?: string
  }) => void;
}

export const ConfirmationContext = createContext<ConfirmationContextType>({
  confirm: (params: {}) => {
  },
});

export const ConfirmationProvider: React.FC<ConfirmationProviderProps> = ({children}) => {

  const theme = useTheme();
  const [confirmation, setConfirmation] = useState<{
    onConfirm: () => void;
    onCancel?: () => void;
    title?: string;
    message?: string;
  } | null>(null);


  const confirm = useCallback(
    (params: {
      onConfirm: () => void,
      onCancel?: () => void,
      title?: string,
      message?: string
    }) => {
      setConfirmation(params);
    }, []);

  const handleConfirm = useCallback(() => {
    if (confirmation) {
      confirmation.onConfirm();
      setConfirmation(null);
    }
  }, [confirmation]);

  const handleCancel = useCallback(() => {
    if (confirmation && confirmation.onCancel) {
      confirmation.onCancel();
    }
    setConfirmation(null);
  }, [confirmation]);

  return (
    <ConfirmationContext.Provider value={{confirm}}>
      {children}
      {confirmation && (
        <Dialog
          open={true}
          onClose={handleCancel}
          PaperProps={{
            sx: {
              boxShadow: 0,
              borderRadius: '32px',
            }
          }}
          TransitionComponent={Fade}
          maxWidth="xl"
        >
          <DialogTitle>{!!confirmation.title ? confirmation.title : "Delete confirmation"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-slide-description">
              {"Stai per eliminare un elemento. Sei sicuro di voler procedere?"}
            </DialogContentText>
          </DialogContent>
          <Box pr={2} pb={2}>
            <DialogActions>
              <Button color="inherit" onClick={handleCancel}>
                <Box mx={2}>
                  Annulla
                </Box>
              </Button>
              <Button
                color="error"
                sx={{
                  backgroundColor: alpha(theme.palette.error.main, 0.2),
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.error.main, 0.25),
                  },
                }}
                onClick={handleConfirm}
              >
                <Box mx={2}>
                  Elimina
                </Box>
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      )}
    </ConfirmationContext.Provider>
  );
};


export const useConfirmation = () => {
  return React.useContext(ConfirmationContext);
}