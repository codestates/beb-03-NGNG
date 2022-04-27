import { Container, Box, Typography } from '@mui/material';
import React from 'react';
import Talks from '../../components/Talks';

const MyTalk = (props) => {
  
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