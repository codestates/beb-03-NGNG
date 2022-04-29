import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import CommentDeleteModal from './modals/CommentDeleteModal';
import AnonyCommentDeleteModal from './modals/AnonyCommentDeleteModal';

const SubComment = ({ uuid, updatedAt, content, anonymouseId, userId, deleted }) => {
  const loginedUserId = useSelector((state) => state.user.userInfo.id);

  return (
    <Card sx={{backgroundColor: '#9F9C92', mb: 1, display: 'flex', alignItems: 'center'}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" sx={{display: 'none'}}>
          </Avatar>
        }
        title={userId === null ? 'anonymous' : userId}
        subheader={`${updatedAt.slice(0, 10)} ${updatedAt.slice(11,16)}`}
        sx={{width: '300px'}}
      />
      <CardContent sx={{width: '100%'}}>
        <Typography variant="h6" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      {
        (loginedUserId === userId && deleted !== 1) &&
        <CommentDeleteModal uuid={uuid} />
      }
      {
        (anonymouseId !== null && deleted !== 1) &&
        <AnonyCommentDeleteModal uuid={uuid} />
      }
    </Card>
  )
}

export default SubComment;