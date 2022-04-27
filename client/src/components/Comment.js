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
import { useSelector } from 'react-redux';
import CommentDeleteModal from './modals/CommentDeleteModal';
import AnonyCommentDeleteModal from './modals/AnonyCommentDeleteModal';


const Comment = ({userId, updatedAt, content, commentUuid, anonymouseId}) => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const loginedUserId = useSelector((state) => state.user.userInfo.id);
  const commentRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(commentRef.current.value);
    commentRef.current.value = '';
  }
  return (
    <>
      <Card sx={{backgroundColor: '#9F9C92', display: 'flex', flexDirection: 'column', mb: 1}}>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe">
              </Avatar>
            }
            title={userId === null ? 'anonymous' : userId}
            subheader={updatedAt.slice(5,10)}
          />
          <CardContent sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
            <Typography variant="h6" color="text.secondary">
              {content}
            </Typography>
          </CardContent>
          {
            loginedUserId === userId &&
            <CommentDeleteModal uuid={commentUuid} />
          }
          {
            anonymouseId !== null &&
            <AnonyCommentDeleteModal uuid={commentUuid} />
          }
        </Box>
        
        {/* 대댓글 작성 폼 */}
        {/* <Box sx={{display: 'flex', flex: 1, pb:2, pl: 2, pr: 2, ml: 22}}>
          <TextField label="Comment Message..." size='small' sx={{mr: '10px', flex: accessToken ? 1 : 0.75}} inputRef={commentRef}></TextField>
          {
            accessToken === undefined &&
            <TextField label="Password" size='small' sx={{mr: '10px', flex: 0.25}} inputRef={commentRef}></TextField>
          }
          <Button variant='contained' color="background" onClick={handleSubmit}>Comment</Button>
        </Box> */}
      </Card>
      {/* 대댓글 */}
      {/* <Box sx={{display: 'flex'}}>
        <FontAwesomeIcon icon={faCaretRight} fontSize={'60px'} style={{padding: '14px', paddingRight: '20px', color: '#3E3E41'}} />
        <Box sx={{flex:1, mt: 1}}>
          <SubComment />
          <SubComment />
        </Box>
      </Box> */}
    </>
  )
}

export default Comment;