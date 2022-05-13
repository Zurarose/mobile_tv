import {createTheme} from '@mui/material';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
  },
  typography: {
    h6: {
      textAlign: 'left',
      fontWeight: 200,
      fontSize: '14px',
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
