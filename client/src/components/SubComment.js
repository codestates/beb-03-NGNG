import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const SubComment = (props) => {
  return (
    <Card sx={{backgroundColor: '#9F9C92', mb: 1, display: 'flex', alignItems: 'center'}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            
          </Avatar>
        }
        title="Heetaku"
        subheader="2022/4/23 (4:03AM)"
      />
      <CardContent sx={{width: '100%'}}>
        <Typography variant="body1" color="text.secondary">
          Absolutely!
        </Typography>
      </CardContent>
    </Card>
  )
}

export default SubComment;