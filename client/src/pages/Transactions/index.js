import { Container } from '@mui/material';
import React from 'react';
import BalanceCard from '../../components/BalanceCard';
import TxTable from '../../components/txTable';

const Transactions = (props) => {
  return (
    <Container>
      <BalanceCard />
      <TxTable />
    </Container>
  );
};

export default Transactions;