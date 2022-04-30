import { Container, Box, Typography } from '@mui/material';
import React from 'react';
import AdminCard from '../../components/AdminCard';
import BalanceCard from '../../components/BalanceCard';
import TxTable from '../../components/txTable';
import { useSelector } from 'react-redux';

const MyWallet = (props) => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const role = useSelector((state) => state.user.userInfo.role);

  if (!accessToken) {
    return (
      <Container sx={{display: 'flex', justifyContent: 'center'}}>
        <Typography fontSize={'36px'} color="primary" sx={{mt: 15}}>
          Please Log in.. 😵
        </Typography>
      </Container>
    )
  }

  return (
    <Container>
      <Box sx={{display:'flex', mt: 2, mb: 3, alignItems: 'center'}}>
        <Typography variant='h1' color='primary' sx={{fontSize: '40px'}}>
          My Wallet Info
        </Typography>
      </Box>
      <Box>
        {
          role === 'admin' &&
          <AdminCard />
        }
        <BalanceCard />
        <TxTable />
      </Box>
    </Container>
  );
};

export default MyWallet;