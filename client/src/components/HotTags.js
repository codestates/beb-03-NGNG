import { Card, Typography } from '@mui/material';
import React from 'react';
import Tag from '../utils/tag';

const HotTags = (props) => {
  return (
    <Card sx={{mb: 2, p: 2}}>
      <Typography variant="body2" color="primary" fontSize={'28px'}>
        🔥 Hot Tags Now!
      </Typography>
      <Tag color="primary" keyword="Hamburgers" />
      <Tag color="primary" keyword="Sweet Americano" />
      <Tag color="primary" keyword="My Childhood" />
    </Card>
  )
}

export default HotTags;