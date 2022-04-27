import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Talk from './Talk';
import { Typography, Box } from '@mui/material';

const TagedTalks = ({ tag }) => {

  const { data, status, error } = useQuery(`getPosts_${tag}`, () => {
      return axios.get(`/api/post/getHashTagPosts?tag=${tag}`)
      .then((res => {
        return res.data.data.hashTag;
      }))
  })

  if (status === 'loading') {
    return <h1>Loading...</h1>
  }

  if (status === 'error') {
    return <h1>Error...</h1>
  }

  return (
    <>
      {
        data.length === 0 ?
        <Box sx={{display:'flex', mt: 3, mb: 2, alignItems: 'center'}}>
          <Typography variant='h1' color='primary' sx={{fontSize: '36px'}}>No result about </Typography>
          <Typography variant='h1' color='secondary' sx={{ml: 3, fontSize: '50px', whiteSpace: 'normal'}}>#{tag}</Typography>
        </Box>
        :
        <Box sx={{display:'flex', mt: 3, mb: 2, alignItems: 'center'}}>
          <Typography variant='h1' color='primary' sx={{fontSize: '36px'}}>Talks about </Typography>
          <Typography variant='h1' color='secondary' sx={{ml: 3, fontSize: '50px'}}>#{tag}</Typography>
        </Box>
      }
      
      {
        data.map((post) => {
          return <Talk key={post.post_uuid} uuid={post.post_uuid} />
        })
      }
    </>
  )
}

export default TagedTalks;