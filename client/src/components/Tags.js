import { Card, Typography } from '@mui/material';
import React from 'react';
import Tag from '../utils/tag';

const Tags = (props) => {
  return (
    <Card sx={{mb: 2, p: 2}}>
      <Typography variant="body2" color="primary" fontSize={'28px'}>
        🔥 Hot 10 Tags Now!
      </Typography>
      <Tag keyword="Hamburgers" />
      <Tag keyword="Sweet Americano" />
      <Tag keyword="My Childhood" />
      <Tag keyword="Cats and Dogs" />
      <Tag keyword="Tomboy" />
      <Tag keyword="Lovely day" />
      <Tag keyword="Beautiful songs" />
      <Tag keyword="Spring" />
      <Tag keyword="Waffles" />
      <Tag keyword="Cakes" />
    </Card>
  )
}

export default Tags;