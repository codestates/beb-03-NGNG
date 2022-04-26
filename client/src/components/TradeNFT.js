import { Button, Typography } from '@mui/material';
import React from 'react';

const TradeNFT = (props) => {
  return (
    <>
      <Typography color="primary" variant='h5' sx={{mt: 3, textAlign: 'center'}}>
        👤 Buy and Sell 👤
      </Typography>
      <Typography sx={{mt: 3}}>
        You can sell your NFT and also buy other's NFT freely.
      </Typography>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ mt: 3, mb: 3 }}
      >
        Trade Now
      </Button>
    </>
    
  )
}

export default TradeNFT;