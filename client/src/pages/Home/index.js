import { Container } from '@mui/material';
import React from 'react';
import HotTags from '../../components/HotTags';
import WriteTalk from '../../components/WriteTalk';
import Talks from '../../components/Talks';
import TalksInfinite from '../../components/TalksInfinite';

const Home = (props) => {

  return (
    <Container>
      <HotTags />
      <WriteTalk />
      <Talks filter={false} />
      {/* <TalksInfinite filter={false} /> */}
    </Container>
  )
}

export default Home;