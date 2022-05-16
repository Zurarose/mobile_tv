import {Alert, Box, CardMedia, Modal, Snackbar} from "@mui/material";
import React, {createContext, useState} from "react";

export const UIContextAlert = createContext<UIContextPropsAlert>({} as UIContextPropsAlert);
export const UIContextModal = createContext<UIContextPropsModal>({} as UIContextPropsModal);

type AlertColor = 'success' | 'info' | 'warning' | 'error';

interface UIContextTypeAlert {
  show: boolean;
  severity?: AlertColor;
  message?: string;
}

interface UIContextPropsAlert {
  setAlert: React.Dispatch<React.SetStateAction<UIContextTypeAlert>>;
}

interface UIContextTypeModal {
  open: boolean;
  image?: string;
}

interface UIContextPropsModal {
  setModal: React.Dispatch<React.SetStateAction<UIContextTypeModal>>;
}

interface PropTypes {
  children?: React.ReactNode
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '0px solid #000',
};

export const UIContextProvider: React.FC<PropTypes> = ({children}) => {
  const [modal, setModal] = React.useState<UIContextTypeModal>({
    open: false,
    image: '',
  });
  const handleCloseModal = () => {
    setModal({open: false})
  };

  const [alert, setAlert] = useState<UIContextTypeAlert>({
    show: false,
    severity: 'info',
    message: '',
  });
  const handleCloseAlert = () =>
    setAlert({
      show: false,
    });

  return (
    <UIContextAlert.Provider value={{setAlert}}>
      <UIContextModal.Provider value={{setModal}}>
        {children}
        <Snackbar
          open={alert.show}
          autoHideDuration={4000}
          onClose={handleCloseAlert}
        >
          <Alert elevation={6} variant="filled" severity={alert.severity}>
            {alert.message}
          </Alert>
        </Snackbar>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modal.open}
          onClose={handleCloseModal}
        >
          <Box sx={style}>
            <CardMedia
              sx={{height: '100%', objectFit: 'contain'}}
              component="img"
              loading="eager"
              src={modal.image}
            />
          </Box>
        </Modal>
      </UIContextModal.Provider>
    </UIContextAlert.Provider>
  );
};
