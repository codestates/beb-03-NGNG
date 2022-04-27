import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import Comment from './Comment';
import axios from 'axios';
import { useQuery } from 'react-query';

const Comments = ({postUuid}) => {
  const [comments, setComments] = useState([]);

  const {data} = useQuery(`getComments_${postUuid}`, () => {
    return axios.get(`/api/comment/getComments?postUuid=${postUuid}`)
    .then((res) => {
      setComments(res.data.data.comments);
    })
  })

  return (
      <Box sx={{display: 'flex'}}>
        {
          comments.length !== 0 &&
          <FontAwesomeIcon icon={faCaretRight} fontSize={'60px'} style={{padding: '14px', paddingRight: '20px', color: '#3E3E41'}} />
        }
      <Box sx={{flex:1, mt: 1}}>
        {
          comments.length !== 0 &&
          comments.map((comment) => {
            return <Comment key={comment.uuid} userId={comment.id} updatedAt={comment.updatedAt} content={comment.content} commentUuid={comment.uuid} anonymouseId={comment.annonymouseId} />
          })
        }
      </Box>
    </Box>
  )
}

export default Comments;