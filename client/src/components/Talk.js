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
import DonateModal from './modals/DonateModal';
import { TextField } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import ReportModal from './modals/ReportModal';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Comments from './Comments';
import Tag from '../utils/tag';
import PostDeleteModal from './modals/PostDeleteModal';
import PostEditModal from './modals/PostEditModal';
import LikeItModal from './modals/LikeItModal';

const Talk = ({uuid}) => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const loginedUserId = useSelector((state) => state.user.userInfo.id);

  const commentRef = useRef();
  const passwordRef = useRef();

  const newCommentMutation = useMutation(((comment) => {
    return axios.post('/api/comment/sendMemberComment', comment, {
      headers: {
        "Authorization": `bearer ${accessToken}`
      }
    })
  }), {
    onSuccess: () => {
      alert('Comment Success!');
      commentRef.current.value = '';
    },
    onError: (error) => {
      alert('Something Wrong! Try again');
    }
  });

  const newAnonyCommentMutation = useMutation(((comment) => {
    return axios.post('/api/comment/sendNonMemberComment', comment);
  }), {
    onSuccess: () => {
      alert('Comment Success!');
      commentRef.current.value = '';
      passwordRef.current.value = '';
    },
    onError: (error) => {
      alert('Something Wrong! Try again');
    }
  });

  // 🔥 useQuery Key.... unique하게 작성하는거...!!!
  const {data, status} = useQuery(`getPost_${uuid}`, () => {
    return axios.get(`/api/post/getPost?postUuid=${uuid}`)
    .then((res) => {
      // console.log('🚨', res.data.data.post);
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

    if (accessToken) {
      const comment = {
        content: commentRef.current.value,
        postUuid: uuid
      }
      newCommentMutation.mutate(comment);
    } else {
      if (passwordRef.current.value === '') {
        alert('Please enter password');
        return;
      } else {
        const anonymousComment = {
          content: commentRef.current.value,
          postUuid: uuid,
          anonymouseId: 'anonymous user',
          password: passwordRef.current.value
        }
        newAnonyCommentMutation.mutate(anonymousComment);
      }
    }
  }


  return (
    <>
      <Card sx={{backgroundColor: '#949494'}}>
        <Box sx={{display:'flex', justifyContent: 'space-between'}}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" src={data.user.imageUri}>
              </Avatar>
            }
            title={data.user.id}
            subheader={data.updatedAt.slice(0, 16)}
          />
          {/* 이 아래의 박스는 로그인한 유저의 id(from redux)와 post 작성자 id(data.user.id)가 같아아만 보인다. */}
          {
            loginedUserId === data.user.id &&
            <Box sx={{width: '80px', mr: 2, display: 'flex', justifyContent: 'space-between',     alignItems: 'center'}}>
            <PostEditModal uuid={uuid} />
            <PostDeleteModal uuid={uuid} />            
          </Box>
          }
        </Box>
        <CardMedia
          component="img"
          image={data.imageUri}
        />
        <CardContent sx={{pb: 0}}>
          <Typography color="text.secondary" variant="h6">
            {data.content}
          </Typography>
          <Box sx={{mt: 3}}>
          {
            data.tag.map((tag, idx) => {
              return <Tag key={idx} keyword={tag} color={"default"} />
            })
          }
          </Box>

        </CardContent>
        <CardActions disableSpacing sx={{p: '14px',display: 'flex', justifyContent: 'space-between'}}>
          <Box sx={{width: '180px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <LikeItModal uuid={uuid} />
            <Typography>+3</Typography>
            <DonateModal />
            <ReportModal />            
          </Box>
          <Box sx={{display: 'flex', flex: 1, ml: '30px'}}>
            <TextField label="Comment Message..." size='small' sx={{mr: '10px', flex: accessToken ? 1 : 0.75}} inputRef={commentRef}></TextField>
            {
              accessToken === undefined &&
              <TextField type="password" label="Password" size='small' inputRef={passwordRef} sx={{width: '100px', mr: '10px', flex: 0.25}}></TextField>
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