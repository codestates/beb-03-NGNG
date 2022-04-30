import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FeedIcon from '@mui/icons-material/Feed';
import { IconButton, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';

function createData(txType, txHash, time) {
  return { 
    txType,
    txHash, 
    time };
}

// const rows = [
//   createData('Login Reward', 2, 23, '', 'url', '2022/4/22/2:36'),
//   createData('Talk Reward', 2, 23, '', 'url', '2022/4/22/2:36'),
//   createData('Comment Reward', 2, 23, '', 'url', '2022/4/22/2:36'),
//   createData('Got Donation', 2, 23, 'yooni', 'url', '2022/4/22/2:36'),
// ];

const TxTable = (props) => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const [transactions, setTransactions] = useState([]);

  // 🔥 useQuery Key.... unique하게 작성하는거...!!!
  const { data } = useQuery('getTransactions', () => {
    return axios.get('/api/tx/getTransactions', {
      headers: {
        "Authorization": `bearer ${accessToken}`
      }
    })
    .then((res) => {
      //console.log('🚨', res.data.data.txData);
      setTransactions(res.data.data.txData);
      return res.data.data.txData;
    })
  })

  const rows = transactions.map((tx) => {
    return createData(tx.transactions_input.method, tx.transactions_hash, 'time');
  })
  

  return (
    <TableContainer component={Paper} sx={{padding: '20px', background: '#949494'}}>
      <Table size="small" sx={{ backgroundColor: "transparent", borderRadius: '5px'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontSize: '20px', border: 'none'}} align="center">Tx Type</TableCell>
            <TableCell sx={{fontSize: '20px', border: 'none'}} align="center">Tx Hash</TableCell>
            <TableCell sx={{fontSize: '20px', border: 'none'}} align="center">Tx Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.txHash}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{fontSize: '14px', border: 'none'}} align="center" component="th" scope="row">
                {row.txType}
              </TableCell>
              <TableCell sx={{fontSize: '14px', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center'}} align="center">
                <Typography sx={{fontSize: '14px'}}>
                  {row.txHash.slice(0, 8)} ... {row.txHash.slice(62,)}
                </Typography>
                <IconButton href={`https://rinkeby.etherscan.io/tx/${row.txHash}`} target={'_blank'}>
                  <FeedIcon aria-label="transaction info" />
                </IconButton>
              </TableCell>
              <TableCell sx={{fontSize: '14px', border: 'none'}} align="center">{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TxTable;