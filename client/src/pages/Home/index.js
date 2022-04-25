import { Container } from '@mui/material';
import React from 'react';
import Tags from '../../components/Tags';
import WriteTalk from '../../components/WriteTalk';
import Talks from '../../components/Talks';

const Home = (props) => {

  return (
    <Container>
      <Tags />
      <WriteTalk />
      <Talks />
    </Container>
  )
}

export default Home;