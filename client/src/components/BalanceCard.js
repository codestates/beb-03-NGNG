import { Card, Typography } from '@mui/material';
import React from 'react';

const BalanceCard = (props) => {
  return (
    <Card sx={{mb: 2, p: 2, display: 'flex', justifyContent: 'space-between'}}>
    <Typography variant="body2" color="primary" fontSize={'28px'}>
      Balance of Your Account
    </Typography>
    <Typography variant="body2" color="secondary" fontSize={'28px'}>
      💰 73 NGT
    </Typography>
  </Card>
  )
}

export default BalanceCard;