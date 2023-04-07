import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import {Alert, Slide, Snackbar} from "@mui/material";
import {AlertColor} from "@mui/material/Alert/Alert";

export function useFirstRender() {
  const firstRender = useRef(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return firstRender.current;
}

export type AlertEvent = {
  message?: string,
  severity?: AlertColor,
}

export const useAlertContext = createContext({
  alertEvent: {
    open: false,
    message: '',
    severity: "info",
  } as AlertEvent,
  setAlertEvent: (allertEvent: AlertEvent) => {
  },
});

export function AlertProvider(props: { children: React.ReactNode }) {
  const firstRender = useFirstRender();
  const [alertEvent, setAlertEvent] = useState<AlertEvent>();
  const [alertOpen, setAlertOpen] = useState(false);
  const alertValue = {alertEvent, setAlertEvent};

  useEffect(() => {
    if (!firstRender) setAlertOpen(true)
  }, [alertEvent])

  return (
    <useAlertContext.Provider value={alertValue}>
      <Snackbar
        key={alertEvent?.message}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        TransitionComponent={Slide}
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertEvent?.severity}
          sx={{width: '100%'}}
        >
          {alertEvent?.message}
        </Alert>
      </Snackbar>
      {props.children}
    </useAlertContext.Provider>
  );
}

export const useAlert = () => useContext(useAlertContext);

