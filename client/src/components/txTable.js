import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FeedIcon from '@mui/icons-material/Feed';
import { IconButton } from '@mui/material';

// data
// 현재 토큰 소유량
// 거래 시간
// tx 구분 : 로그인 보상, 글 보상, 댓글 보상, 좋아요 보상, 기부(in/out)
// tx Address, etherscan Link
// 기부시 상대 거래자 username
// 거래 후 잔여 Token


function createData(txType, txAmount, balance, tradeWith, txInfo, time) {
  return { 
    txType, 
    txAmount, 
    balance, 
    tradeWith,
    txInfo, 
    time };
}

const rows = [
  createData('Login Reward', 2, 23, '', 'url', '2022/4/22/2:36'),
  createData('Talk Reward', 2, 23, '', 'url', '2022/4/22/2:36'),
  createData('Comment Reward', 2, 23, '', 'url', '2022/4/22/2:36'),
  createData('Got Donation', 2, 23, 'yooni', 'url', '2022/4/22/2:36'),
];

const TxTable = (props) => {
  return (
    <TableContainer component={Paper} sx={{padding: '20px', background: '#949494'}}>
      <Table size="small" sx={{ backgroundColor: "transparent", borderRadius: '5px'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontSize: '16px', border: 'none'}} align="center">Transaction Type</TableCell>
            <TableCell sx={{fontSize: '16px', border: 'none'}} align="center">Amount (NGT)</TableCell>
            <TableCell sx={{fontSize: '16px', border: 'none'}} align="center">Balance (NGT)</TableCell>
            <TableCell sx={{fontSize: '16px', border: 'none'}} align="center">With</TableCell>
            <TableCell sx={{fontSize: '16px', border: 'none'}} align="center">Tx Info</TableCell>
            <TableCell sx={{fontSize: '16px', border: 'none'}} align="center">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.txType}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{fontSize: '12px', border: 'none'}} align="center" component="th" scope="row">
                {row.txType}
              </TableCell>
              <TableCell sx={{fontSize: '12px', border: 'none'}} align="center">{row.txAmount}</TableCell>
              <TableCell sx={{fontSize: '12px', border: 'none'}} align="center">{row.balance}</TableCell>
              <TableCell sx={{fontSize: '12px', border: 'none'}} align="center">{row.tradeWith}</TableCell>
              <TableCell sx={{fontSize: '12px', border: 'none'}} align="center">
                <IconButton>
                  <FeedIcon aria-label="transaction info" />
                </IconButton>
              </TableCell>
              <TableCell sx={{fontSize: '12px', border: 'none'}} align="center">{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TxTable;