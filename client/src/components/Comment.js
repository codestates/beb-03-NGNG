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
import { useMutation } from 'react-query';
import axios from 'axios';

function getTimeToString(inputTime)
{
      let date = new Date(inputTime);

			var dd = date.getDate();
			var mm = date.getMonth()+1; //January is 0!
		
			var yyyy = date.getFullYear();
			if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}
			
			yyyy = yyyy.toString();
			mm = mm.toString();
			dd = dd.toString();
			
			var m = date.getHours();
			var s = date.getMinutes();

			if(m<10){m='0'+m} if(s<10){s='0'+s}
			m = m.toString();
			s = s.toString();
		
			var s1 = `${yyyy}-${mm}-${dd} ${m}:${s}`;
			return s1;
}

const Comment = ({postUuid, userId, updatedAt, content, commentUuid, anonymouseId, deleted, imageUri, childComments}) => {
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
      alert('😄 The comment has been created successfully');
      commentRef.current.value = '';
    },
    onError: (error) => {
      alert(`
      ❗️ Something Wrong! Please try again

      (${error})
      `);
    }
  });

  const newAnonyCommentMutation = useMutation(((comment) => {
    return axios.post('/api/comment/sendNonMemberComment', comment);
  }), {
    onSuccess: () => {
      alert('😄 The comment has been created successfully');
      commentRef.current.value = '';
      passwordRef.current.value = '';
    },
    onError: (error) => {
      alert(`
      ❗️ Something Wrong! Please try again

      (${error})
      `);
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (commentRef.current.value === '') {
      alert('❗️ Please fill the field');
      return;
    }

    if (accessToken) {
      const comment = {
        content: commentRef.current.value,
        postUuid: postUuid,
        parentUuid: commentUuid,
      }
      newCommentMutation.mutate(comment);
    } else {
      if (passwordRef.current.value === '') {
        alert('❗️ Please enter a password');
        return;
      } else {
        const anonymousComment = {
          content: commentRef.current.value,
          postUuid: postUuid,
          parentUuid: commentUuid,
          anonymouseId: 'anonymous user',
          password: passwordRef.current.value
        }
        newAnonyCommentMutation.mutate(anonymousComment);
      }
    }
    
    commentRef.current.value = '';
  }
  return (
    <>
      <Card sx={{backgroundColor: '#9F9C92', display: 'flex', mb: 1}}>
        <Box>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" src={imageUri}>
              </Avatar>
            }
            title={userId === null ? 'anonymous' : userId}
            subheader={getTimeToString(updatedAt)}
            sx={{width: '210px'}}
          />
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', flex: 1}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <CardContent sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
              <Typography variant="h6" color="text.secondary">
                {content}
              </Typography>
            </CardContent>
            {
              (loginedUserId === userId && deleted !== 1) &&
              <CommentDeleteModal uuid={commentUuid} />
            }
            {
              (anonymouseId !== null && deleted !== 1) &&
              <AnonyCommentDeleteModal uuid={commentUuid} />
            }
          </Box>
          {/* 대댓글 작성 폼 */}
          <Box sx={{display: 'flex', flex: 1, pb:2, pl: 2, pr: 2}}>
            <TextField label="Comment Message..." size='small' sx={{mr: '10px', flex: accessToken ? 1 : 0.75}} inputRef={commentRef}></TextField>
            {
              accessToken === undefined &&
              <TextField type="password" label="Password" size='small' sx={{mr: '10px', flex: 0.25}} inputRef={passwordRef}></TextField>
            }
            <Button variant='contained' color="background" onClick={handleSubmit}>Comment</Button>
          </Box>
        </Box>
        
      </Card>
      {/* 대댓글 */}
      {
        childComments.length > 0 && (
          <Box sx={{display: 'flex'}}>
            <FontAwesomeIcon icon={faCaretRight} fontSize={'60px'} style={{padding: '14px', paddingRight: '20px', color: '#3E3E41'}} />
            <Box sx={{flex:1}}>
              {
                childComments.map((comment) => {
                  return <SubComment key={comment.uuid} uuid={comment.uuid} updatedAt={comment.updatedAt} content={comment.content} anonymouseId={comment.annonymouseId} userId={comment.id} deleted={comment.deleted} />
                })
              }
            </Box>
          </Box>
        )
      }
    </>
  )
}

export default Comment;