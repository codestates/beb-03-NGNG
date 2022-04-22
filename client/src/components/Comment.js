import React, { useRef } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import SubComment from './SubComment';
import { TextField, Button } from '@mui/material';


const Comment = (props) => {
  const commentRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(commentRef.current.value);
    commentRef.current.value = '';
  }
  return (
    <>
      <Card sx={{backgroundColor: '#9F9C92', display: 'flex', flexDirection: 'column'}}>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe">
              </Avatar>
            }
            title="yooni"
            subheader="2022/4/22 (1:31AM)"
          />
          <CardContent sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
            <Typography variant="h6" color="text.secondary">
              How about Americano?
            </Typography>
            
          </CardContent>
        </Box>
        <Box sx={{display: 'flex', flex: 1, pb:2, pl: 2, pr: 2, ml: 22}}>
          <TextField label="Comment Message..." size='small' sx={{mr: '10px', flex: 1}} inputRef={commentRef}></TextField>
          <Button variant='contained' color="background" onClick={handleSubmit}>Comment</Button>
        </Box>
      </Card>
      <Box sx={{display: 'flex'}}>
        <FontAwesomeIcon icon={faCaretRight} fontSize={'60px'} style={{padding: '14px', paddingRight: '20px', color: '#3E3E41'}} />
        <Box sx={{flex:1, mt: 1}}>
          <SubComment />
          <SubComment />
        </Box>
      </Box>
    </>
  )
}

export default Comment;