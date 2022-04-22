import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const Profile = (props) => {
  return (
    <Box sx={{display: 'flex', alignItems: 'center', borderBottom: '0.5px solid grey', pb: '20px'}}>
      <Avatar
        src=""
        sx={{ width: 56, height: 56, mr: '20px' }}
      />
      <Box>
        <Typography sx={{ fontSize: '18px'}}>Username</Typography>
        <Typography sx={{ fontSize: '13px'}}>Token Amount</Typography>
      </Box>
    </Box>
  )
}

export default Profile;