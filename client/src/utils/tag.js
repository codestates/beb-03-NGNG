import React from 'react';
import Chip from '@mui/material/Chip';

const Tag = ({keyword, color}) => {
  return (
    <>
      <Chip label={keyword} component="a" clickable href="/" color={color} variant='outlined'
        sx={{m:1}} />
    </>
  )
}

export default Tag;