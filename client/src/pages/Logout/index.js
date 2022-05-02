import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/user';
import { useNavigate } from 'react-router-dom';

const Logout = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate('/home');
  }, []);

  return (
    <Container sx={{display: 'flex', justifyContent: 'center'}}>
    <Typography fontSize={'36px'} color="primary" sx={{mt: 15}}>
      Log Out...
    </Typography>
  </Container>
  )
}

export default Logout;