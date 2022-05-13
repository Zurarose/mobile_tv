import {Alert, Snackbar} from "@mui/material";
import React, {createContext, useState} from "react";

export const UIContext = createContext<UIContextProps>({} as UIContextProps)

interface UIContextProps {
  setAlert: React.Dispatch<React.SetStateAction<UIContextType>>;
}

type AlertColor = 'success' | 'info' | 'warning' | 'error';

interface UIContextType {
  show: boolean;
  severity?: AlertColor;
  message?: string;
}

interface PropTypes {
  children?: React.ReactNode
}

export const UIContextProvider: React.FC<PropTypes> = ({children}) => {
  const [alert, setAlert] = useState<UIContextType>({
    show: false,
    severity: 'info',
    message: '',
  });
  const handleClose = () =>
    setAlert({
      show: false,
    });

  return (
    <UIContext.Provider value={{setAlert}}>
      {children}
      <Snackbar
        open={alert.show}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert elevation={6} variant="filled" severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </UIContext.Provider>
  );
};
