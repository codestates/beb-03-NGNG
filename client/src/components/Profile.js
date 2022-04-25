import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Profile = (props) => {
  const isLogedIn = useSelector((state) => state.user.isLogedIn);
  const user = useSelector((state) => state.user.userInfo);

  return (
    <Box sx={{display: 'flex', alignItems: 'center', borderBottom: '0.5px solid grey', pb: '20px'}}>
      <Avatar
        src=""
        sx={{ width: 56, height: 56, mr: '20px' }}
      />
      {
        isLogedIn ?
        <Box>
          <Typography sx={{ fontSize: '18px'}}>{user.nickname}</Typography>
          <Typography sx={{ fontSize: '13px'}}>{user.tokenAmount}</Typography>
        </Box> :
        <Box>
          <Typography color="primary" sx={{ fontSize: '18px'}}>Please Login..</Typography>
        </Box>
      }
    </Box>
  )
}

export default Profile;