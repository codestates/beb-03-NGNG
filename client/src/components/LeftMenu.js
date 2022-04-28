import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Paper, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Profile from './Profile';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const LeftMenu = (props) => {

  return (
    <Paper elevation={4} sx={{ backgroundColor: '#606060', padding: '20px'}}>
      <Profile />
      <ThemeProvider
        theme={createTheme({
          palette: {
            primary: { main: '#FFFFFF' },
            background: { paper: '#FFFFFF' },
          },
          typography: {
            fontFamily: 'Montserrat',
          },
        })}
      >
      <nav aria-label="menu">
        <List sx={{mt: '20px'}}>
          <ListItem disablePadding>
            <ListItemButton 
              component="a" href="/">
                <HomeIcon sx={{mr: 1}} />
              <ListItemText primary="Home" primaryTypographyProps={{fontSize: '20px'}}/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component="a" href="/mytalk">
                <KeyboardVoiceIcon sx={{mr: 1}} />
            <ListItemText primary="My Talk" primaryTypographyProps={{fontSize: '20px'}}/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
            component="a" href="/mywallet">
              <AccountBalanceWalletIcon sx={{mr: 1}} />
            <ListItemText primary="My Wallet" primaryTypographyProps={{fontSize: '20px'}}/>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      </ThemeProvider>
    </Paper>
  )
};

export default LeftMenu;