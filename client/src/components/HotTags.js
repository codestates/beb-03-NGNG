import { Card, Typography } from '@mui/material';
import React, {useState} from 'react';
import Tag from '../utils/tag';
import axios from 'axios';
import { useQuery } from 'react-query';

const HotTags = (props) => {

  const {data} = useQuery('getHotTags', () => {
    return axios.get('/api/hashtag/topHashtag')
    .then((res) => {
      return res.data.data.hashTag;
    })
  })
  
  return (
    <Card sx={{mb: 2, p: 2}}>
      <Typography variant="body2" color="primary" fontSize={'28px'}>
        🔥 Hot Tags Now!
      </Typography>
      {
        data &&
        data.map((tag, idx) => <Tag color="primary" keyword={tag.tag} key={idx} />)
      }
    </Card>
  )
}

export default HotTags;