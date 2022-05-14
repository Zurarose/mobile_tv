import {createTheme} from '@mui/material';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
  },
  typography: {
    h3: {
      textAlign: 'center',
      fontWeight: 500,
    },
    h5: {
      textAlign: 'left',
      fontWeight: 200,
      fontSize: '14px',
    },
    h6: {
      textAlign: 'center',
      flexGrow: 1,
      fontSize: '18px',
      fontWeight: 500,
      color: 'black',
    },
    subtitle2: {
      fontSize: '12px'
    },
    subtitle1: {
      fontSize: '12px',
      textAlign: 'center',
    }
  },
});

export default defaultTheme;
