import { Container } from '@mui/material';
import React from 'react';
import Tags from '../../components/Tags';
import Talk from '../../components/Talk';
import WriteTalk from '../../components/WriteTalk';

const Home = (props) => {
  return (
    <Container>
      <Tags />
      <WriteTalk />
      <Talk />
    </Container>
  )
}

export default Home;