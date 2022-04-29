import { Container, Box, Typography } from '@mui/material';
import React from 'react';
import AdminCard from '../../components/AdminCard';
import BalanceCard from '../../components/BalanceCard';
import TxTable from '../../components/txTable';

const MyWallet = (props) => {
  return (
    <Container>
      <Box sx={{display:'flex', mt: 2, mb: 3, alignItems: 'center'}}>
        <Typography variant='h1' color='primary' sx={{fontSize: '40px'}}>
          My Wallet Info
        </Typography>
      </Box>
      <AdminCard />
      <BalanceCard />
      <TxTable />
    </Container>
  );
};

export default MyWallet;