import {CssBaseline, ThemeProvider} from '@mui/material';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {UIContextProvider} from "../UIContext/";
import RootComponent from "../../Components/RootComponent";
import defaultTheme from "../MaterialTheme/theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CssBaseline/>
        <UIContextProvider>
          <RootComponent/>
        </UIContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
