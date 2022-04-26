import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Talk from './Talk';

const Talks = (props) => {
  const [posts, setPosts] = useState([]);

  const { data, status, error } = useQuery('getPosts', () => {
    return axios.get('http://localhost:5001/api/post/getPosts')
    .then((res) => {
      return res.data.data.posts;
    })
  })

  if (status === 'loading') {
    return <h1>Loading...</h1>
  }

  if (status === 'error') {
    return <h1>Error...</h1>
  }

  return (
    <>
      {
        // posts.length !== 0 &&
        data.map((post) => {
          return <Talk key={post.post_uuid} uuid={post.post_uuid} />
        })
      }
    </>
  )
}

export default Talks;