import { Button, Typography } from '@mui/material';
import React from 'react';

const GetNFT = (props) => {
  return (
    <>
      <Typography color="primary" variant='h5' sx={{mt: 3, textAlign: 'center'}}>
        Get First NFT 🔖
      </Typography>
      <Typography sx={{mt: 3}}>
        You can get your first NFT to enter the NGNG level system for 50 NGT.
        You will get a random level of NFT 1 ~ 100.
      </Typography>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ mt: 3, mb: 3 }}
      >
        Get Now
      </Button>
    </>
    
  )
}

export default GetNFT;