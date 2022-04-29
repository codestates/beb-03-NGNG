import { Container, Box, Typography } from '@mui/material';
import React from 'react';
import Talks from '../../components/Talks';
import { useSelector } from 'react-redux';

const MyTalk = (props) => {
  const accessToken = useSelector((state) => state.user.accessToken);

  if (!accessToken) {
    return (
      <Container sx={{display: 'flex', justifyContent: 'center'}}>
        <Typography fontSize={'36px'} color="primary" sx={{mt: 15}}>
          Please Log in.. 😵
        </Typography>
      </Container>
    )
  }
  
  return (
    <Container>
      <Box sx={{display:'flex', mt: 2, mb: 3, alignItems: 'center'}}>
        <Typography variant='h1' color='primary' sx={{fontSize: '40px'}}>What I Said..</Typography>
      </Box>
      <Talks filter={true} />
    </Container>
  )
}

export default MyTalk;