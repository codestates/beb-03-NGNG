import React, { useState, useNavigate } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = (props) => {
  const [isLogedIn, setIsLogedIn] = useState('false');

  return (
    <Box sx={{ flexGrow: 1, mb: 2}} >
      <AppBar position="static" sx={{
        height: '90px',
        display: 'flex',
        justifyContent: 'center',
        }}>
        <Toolbar>
          <Typography
            variant="h1"
            noWrap
            component="div"
            sx={{ 
                display: { xs: 'none', sm: 'block' },
                fontWeight: 'bold',
              }}
          >
            NGNG
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {isLogedIn ?
            <Box sx={{display: 'flex'}}>
              <LoginModal />
              <SignupModal />
            </Box> :
            <Button variant='contained' color="success">Log Out</Button>
            }
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;