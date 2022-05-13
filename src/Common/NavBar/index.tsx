import React from 'react';
import {AppBar, AppBarProps, Box, styled, Toolbar, Typography, TypographyProps} from "@mui/material";
import bgImage from './assets/images/navBarBg.png';

interface PropTypes {
  children?: React.ReactNode
}

const NavBarTypography = styled(Typography)<TypographyProps>(() => ({
  textAlign: 'center',
  flexGrow: 1,
  fontSize: '18px',
  fontWeight: 500,
  color: 'black',
}));

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
            <NavBarTypography>
              SUPER FILM
            </NavBarTypography>
          </Toolbar>
        </NavBarMain>
        <Toolbar/>
      </Box>
      {children}
    </>
  );
};

export default NavBar;