import { Card, Typography, Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const BalanceCard = (props) => {
  const tokenBalance = useSelector((state) => state.user.userInfo.tokenBalance);

  return (
    <Card sx={{mb: 2, p: 2}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="body2" color="primary" fontSize={'28px'}>
          MY NGT
        </Typography>
        <Typography variant="body2" color="secondary" fontSize={'28px'}>
          {/* π° {tokenBalance} NGT */}
          π° {tokenBalance} NGT
        </Typography>
      </Box>
      {/* NFT λ°κΈ μ¬λΆ νμΈ λΆκ°λ₯ */}
      {/* <Box sx={{mt: 1, display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="body2" color="primary" fontSize={'28px'}>
          LEVEL NFT (ERC721)
        </Typography>
        <Typography variant="body2" color="secondary" fontSize={'28px'}>
          π nft info
        </Typography>
      </Box> */}
    </Card>
  )
}

export default BalanceCard;