import { Container, Typography, Box } from '@mui/material';
import React from 'react';
import HotTags from '../../components/HotTags';
import TagedTalks from '../../components/TagedTalks';
import { useLocation } from 'react-router-dom';

const TagSelected = (props) => {
  // store에서 selectedTag값 가져오기
  // const selectedTag = useSelector((state) => state.selectedTag.tag);
  
  const location = useLocation();
  const tag = location.state;

  return (
    <Container>
      <HotTags />
      {/* <Box sx={{display:'flex', mt: 3, mb: 2, alignItems: 'center'}}>
        <Typography variant='h1' color='primary' sx={{fontSize: '36px'}}>Talks about </Typography>
        <Typography variant='h1' color='secondary' sx={{ml: 3, fontSize: '50px'}}>#{tag}</Typography>
      </Box> */}
      <TagedTalks tag={tag} />
    </Container>
  )
}

export default TagSelected;