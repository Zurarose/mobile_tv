import React from 'react';
import {AppBar, AppBarProps, Box, styled, Toolbar, Typography} from "@mui/material";
import bgImage from './assets/images/navBarBg.png';

interface PropTypes {
  children?: React.ReactNode
}

const NavBarMain = styled(AppBar)<AppBarProps>(() => ({
  position: 'fixed',
  backgroundImage: `url(${bgImage})`,
  flexGrow: 1,
  boxShadow: 'none',
  backgroundColor: 'white',
}));


const NavBar: React.FC<PropTypes> = ({children}) => {
  return (
    <>
      <Box>
        <NavBarMain>
          <Toolbar>
            <Typography variant='h6'>
              SUPER FILM
            </Typography>
          </Toolbar>
        </NavBarMain>
        <Toolbar/>
      </Box>
      {children}
    </>
  );
};

export default NavBar;