import React, { useEffect, useRef, useState } from 'react';
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
import Tooltip from '@mui/material/Tooltip';
import ReportModal from './ReportModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faPooStorm } from '@fortawesome/free-solid-svg-icons';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Comments from './Comments';

const Talk = ({uuid}) => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const commentRef = useRef();
  const passwordRef = useRef();
  const [post, setPost] = useState(undefined);

  const newCommentMutation = useMutation(((newComment) => {
    if (accessToken) {
      return axios.post('http://localhost:5001/api/comment/sendMemberComment', newComment, {
        headers: {
          "Authorization": `bearer ${accessToken}`
        }
      })
    } else {
      // 익명 댓글 : 비밀번호까지 필요하다.
      const anonymousComment = {
        content: newComment.content,
        postUuid: newComment.postUuid,
        anonymouseId: 'anonymous user',
        password: passwordRef.current.value
      }
      return axios.post('http://localhost:5001/api/comment/sendNonMemberComment', anonymousComment)
    }
  }), {
  onSuccess: (data) => {
    alert('Comment Success!');
    commentRef.current.value = '';
  },
  onError: (error) => {
    alert('Something Wrong! Try again');
  }
});

  // 🔥 useQuery Key.... unique하게 작성하는거...!!!
  const {data, status} = useQuery(`getPost_${uuid}`, () => {
    console.log('🌸', uuid);
    return axios.get(`http://localhost:5001/api/post/getPost?postUuid=${uuid}`)
    .then((res) => {
      console.log('🚨', res.data.data.post);
      return res.data.data.post;
    })
  })

  if (status === "loading") {
    return <h1>Loading...</h1>
  }

  if (status === 'error') {
    return <h1>Error...</h1>
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (commentRef.current.value.length === 0) {
      alert('Please fill the field');
      return;
    }

    const comment = {
      content: commentRef.current.value,
      postUuid: uuid
    }

    newCommentMutation.mutate(comment);
  }

  return (
    <>
      <Card sx={{backgroundColor: '#949494'}}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
            </Avatar>
          }
          title={data.user.id}
          subheader={data.updatedAt.slice(0, 16)}
        />
        {/* <CardMedia
          component="img"
          src="latte.jpeg"
          alt="coffee"
        /> */}
        <CardContent>
          <Typography color="text.secondary" variant="h6">
            {data.content}
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
          <Box sx={{display: 'flex', flex: 1, ml: '30px'}}>
            <TextField label="Comment Message..." size='small' sx={{mr: '10px', flex: accessToken ? 1 : 0.75}} inputRef={commentRef}></TextField>
            {
              accessToken === undefined &&
              <TextField label="Password" size='small' inputRef={passwordRef} sx={{width: '100px', mr: '10px', flex: 0.25}}></TextField>
            }
            <Button variant='contained' color='success' onClick={handleSubmit}>Comment</Button>
          </Box>
        </CardActions>
      </Card>
      <Comments postUuid={uuid} />
    </>
  )
}

export default Talk;