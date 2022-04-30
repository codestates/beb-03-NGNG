import { Button, Typography, Box, Modal } from '@mui/material';
import React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'primary.light',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const TradeNFT = (props) => {
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  const handleOK = () => {
    handleClose();
  }

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
        onClick={handleOpen}
      >
        Trade Now
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography component="h1" variant="h5">
            👤 Sorry!
          </Typography>
          <Typography sx={{mt: 2}}>
            The trade service is coming soon.
          </Typography>
          <Box noValidate sx={{ mt: 1, display: 'flex' }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleOK}
            >
              OK
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
    
  )
}

export default TradeNFT;