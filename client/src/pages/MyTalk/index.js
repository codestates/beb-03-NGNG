import { Container } from '@mui/material';
import React from 'react';
import Talks from '../../components/Talks';

const MyTalk = (props) => {
  
  return (
    <Container>
      <Talks filter={true} />
    </Container>
  )
}

export default MyTalk;