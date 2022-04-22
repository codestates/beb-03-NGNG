import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const Comment = (props) => {
  return (
    <Card sx={{backgroundColor: '#9F9C92', mb: 1, display: 'flex', alignItems: 'center'}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            
          </Avatar>
        }
        title="yooni"
        subheader="2022/4/22 (1:31AM)"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          How about Americano?
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Comment;