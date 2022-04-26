import React from 'react';
import Chip from '@mui/material/Chip';

const Tag = ({keyword}) => {
  return (
    <>
      <Chip label={keyword} component="a" clickable href="/" color="primary" variant='outlined'
        sx={{m:1}} />
    </>
  )
}

export default Tag;