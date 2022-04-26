import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Paper, List, ListItem, ListItemButton, ListItemText, Typography, Divider } from '@mui/material';
import TradeNFT from './TradeNFT';
import GetNFT from './GetNFT';

const RightBar = (props) => {
  return (
    <Paper elevation={4} sx={{ backgroundColor: '#606060', padding: '20px'}}>
      <Typography
        variant="h1"
        noWrap
        component="div"
        color="primary"
        sx={{ 
            display: { xs: 'none', sm: 'block' },
            fontWeight: 'bold',
            textAlign: 'center',
            paddingBottom: 2,
            fontSize: '44px'
          }}
      >
        NFT Zone
      </Typography>
      <Divider />
      <GetNFT />
      <Divider />
      <TradeNFT />
    </Paper>
  )
};

export default RightBar;