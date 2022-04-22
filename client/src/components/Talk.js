import React, { useRef } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DonateModal from './DonateModal';
import { TextField } from '@mui/material';
import Comment from './Comment';
import Tooltip from '@mui/material/Tooltip';
import ReportModal from './ReportModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

const Talk = (props) => {
  const commentRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(commentRef.current.value);
    commentRef.current.value = '';
  }

  return (
    <>
      <Card sx={{backgroundColor: '#949494'}}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              
            </Avatar>
          }
          title="yooni"
          subheader="2022 / 04 / 21 (10:35 PM)"
        />
        <CardMedia
          component="img"
          src="latte.jpeg"
          alt="coffee"
        />
        <CardContent>
          <Typography color="text.secondary" variant="h6">
            This is my favorite latte.
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{p: '14px',display: 'flex', justifyContent: 'space-between'}}>
          <Box sx={{width: '180px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Tooltip title="Like ❣️" placement='top'>
              <IconButton aria-label="like">
                <ThumbUpIcon />
              </IconButton>
            </Tooltip>
            <Typography>+3</Typography>
            <DonateModal />
            <ReportModal />            
          </Box>
          <Box sx={{display: 'flex', flex: 1, ml: '60px'}}>
            <TextField label="Comment Message..." size='small' sx={{mr: '10px', flex: 1}} inputRef={commentRef}></TextField>
            <Button variant='contained' color='success' onClick={handleSubmit}>Comment</Button>
          </Box>
        </CardActions>
      </Card>
      <Box sx={{display: 'flex'}}>
        <FontAwesomeIcon icon={faCaretRight} fontSize={'60px'} style={{padding: '14px', paddingRight: '20px', color: '#3E3E41'}} />
        <Box sx={{flex:1, mt: 1}}>
          <Comment />
        </Box>
      </Box>
    </>
  )
}

export default Talk;