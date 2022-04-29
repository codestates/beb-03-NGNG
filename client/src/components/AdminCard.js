import React from 'react';
import { Card, Typography, Box, Button } from '@mui/material';

const AdminCard = (props) => {
  return (
    <Card sx={{mb: 2, p: 2}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="body2" color="gray" fontSize={'24px'}>
          ⚙️ Admin Section
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ width: '200px' }}
        >
          Pay Token to Users
        </Button>
      </Box>
    </Card>
  )
}

export default AdminCard;